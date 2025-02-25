import { JWTPayload } from '@/types/jwt';
import { CustomError } from '@/utils/error';
import * as jose from 'jose';

export const jwtService = {
    createToken: async (payload: JWTPayload): Promise<string> => {
        const secret = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_AUTH_SECRET,
        );

        if (!secret) throw new CustomError(401, 'Missing token or secret');

        const token = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        return token;
    },

    verifyToken: async (token: string): Promise<JWTPayload> => {
        const secret = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_AUTH_SECRET,
        );

        if (!secret) throw new CustomError(401, 'Missing token or secret');

        const { payload } = await jose.jwtVerify(token, secret);

        return payload as JWTPayload;
    },
};
