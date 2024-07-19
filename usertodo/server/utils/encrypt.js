import bcrypt from "bcrypt"

export async function encryptData(data) {
    try {
        const salt = 10;
        const encrypted_data = await bcrypt.hash(data, salt);
        return encrypted_data
    }catch(err) {
        throw err;
    }
}

export async function compareData(data, encrypted_data) {
    try {
        const match = await bcrypt.compare(data, encrypted_data);
        return match;
    }catch(err) {
        throw err;
    }
}