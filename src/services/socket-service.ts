import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../utils/logger';

export interface SocketUser {
    userId: string;
    socketId: string;
    role: string;
}

class SocketService {
    private io: SocketIOServer | null = null;
    private connectedUsers: Map<string, SocketUser> = new Map();

    initialize(server: HTTPServer) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.io.use(async (socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                if (!token) {
                    return next(new Error('Authentication error'));
                }

                const decoded = jwt.verify(token, config.get<string>('JWT_SECRET')) as any;
                socket.data.user = decoded;
                next();
            } catch (error) {
                next(new Error('Authentication error'));
            }
        });

        this.io.on('connection', (socket) => {
            this.handleConnection(socket);
        });

        logger.info('Socket.IO server initialized');
    }

    private handleConnection(socket: any) {
        const user = socket.data.user;
        const socketUser: SocketUser = {
            userId: user.userId,
            socketId: socket.id,
            role: user.role
        };

        this.connectedUsers.set(user.userId, socketUser);

        socket.join(`user_${user.userId}`);
        socket.join(`role_${user.role}`);

        socket.on('disconnect', () => {
            this.connectedUsers.delete(user.userId);
        });
    }

    //Notify manager when admin creates a project and assigns it
    notifyProjectMembers(projectData: any, assignedUserIds: string[]) {
        if (!this.io) return;

        assignedUserIds.forEach(userId => {
            const user = this.connectedUsers.get(userId);
            if (user) {
                this.io!.to(user.socketId).emit('project_assigned', {
                    type: 'project_assigned',
                    message: `You have been assigned to project: ${projectData.projectTitle}`,
                    project: projectData,
                    timestamp: new Date()
                });
            }
        });
    }

    getConnectedUsersCount(): number {
        return this.connectedUsers.size;
    }

    getUserById(userId: string): SocketUser | undefined {
        return this.connectedUsers.get(userId);
    }

    isUserOnline(userId: string): boolean {
        return this.connectedUsers.has(userId);
    }
}

export default new SocketService();
