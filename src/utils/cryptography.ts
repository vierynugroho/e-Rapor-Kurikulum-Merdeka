import * as argon from 'argon2';

export class Argon {
    static async encrypt(plainText: string) {
        return await argon.hash(plainText);
    }

    static async verify(encriptedText: string, plainText: string) {
        return await argon.verify(encriptedText, plainText);
    }
}
