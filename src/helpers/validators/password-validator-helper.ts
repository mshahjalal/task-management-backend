const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,30}$/;

export const isPasswordValid = async (password: string) => {
    
    if (passwordRegex.test(password)) return true;
    else throw new Error("Your password is weak. Password must contains at least one character and one digit.");
    
};