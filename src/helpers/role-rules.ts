const defaultRoleList = [
    {
        roleTitle: "Admin",
        roleType: "admin",
        active: true,
        permissions: [
            "add_role",
            "edit_role",
            "view_role",
            "add_user",
            "edit_user",
            "view_user",
            "add_project",
            "edit_project",
            "view_project",
            "add_board_section",
            "edit_board_section",
            "view_board_section",
            "add_task",
            "edit_task",
            "edit_task_status",
            "view_task",
            "add_notification",
            "view_notification",
        ]
    },
    {
        roleTitle: "Manager",
        roleType: "manager",
        active: true,
        permissions: [
            "view_role",
            "add_user",
            "edit_user",
            "view_user",
            "edit_project",
            "view_project",
            "add_board_section",
            "edit_board_section",
            "view_board_section",
            "add_task",
            "edit_task",
            "edit_task_status",
            "view_task",
            "add_notification",
            "view_notification",
        ]
    },
    {
        roleTitle: "Member",
        roleType: "member",
        active: true,
        permissions: [
            "view_role",
            "edit_user",
            "view_user",
            "view_project",
            "view_board_section",
            "edit_task",
            "edit_task_status",
            "view_task",
            "add_notification",
            "view_notification",
        ]
    }
];

export const getStaticRoleList = async () => {
    return defaultRoleList;
};