import * as bcrypt from 'bcrypt';

export class Cryptography {
    private static readonly SALT_ROUNDS = 10;

    static async encrypt(plainText: string): Promise<string> {
        return await bcrypt.hash(plainText, this.SALT_ROUNDS);
    }

    static async verify(
        encryptedText: string,
        plainText: string,
    ): Promise<boolean> {
        return await bcrypt.compare(plainText, encryptedText);
    }
}
