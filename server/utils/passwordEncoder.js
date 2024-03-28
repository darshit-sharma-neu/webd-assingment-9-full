import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default async function encode(plainText){
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plainText,salt);
} 

export async function compare(token1, token2){
    return bcrypt.compare(token2, token1);
}