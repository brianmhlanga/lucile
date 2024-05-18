import * as jose from 'jose';
import crypto from 'crypto';

export const jwt_regex = /^(?:[\w-]*\.){2}[\w-]*$/;

export const createAppJwtToken = async (jwt_secret: string)=>{
    const secret = new TextEncoder().encode(jwt_secret);
    
    const alg = 'HS256';
      
    const token = await new jose.SignJWT({ success: true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('iss.panier.app')
        .setAudience('aud.panier.app')
        .setExpirationTime('2w')
        .sign(secret);
    
    return token
}

export const checkAppJwtToken = async (token: string, jwt_secret: string)=>{
    try{
        const secret = new TextEncoder().encode(jwt_secret);
      
        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: 'iss.panier.app',
            audience: 'aud.panier.app',
        });

        return payload;
    }
    catch(error){
        return { success: false }
    }
}

export const createOTPJwtToken = async (jwt_secret: string)=>{
    const secret = new TextEncoder().encode(jwt_secret);
    
    const alg = 'HS256';
      
    const token = await new jose.SignJWT({ success: true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('iss.panier.app')
        .setAudience('aud.panier.app')
        .setExpirationTime('30m')
        .sign(secret);
    
    return token
}

export const checkOTPJwtToken = async (token: string, jwt_secret: string)=>{
    try{
        const secret = new TextEncoder().encode(jwt_secret);
      
        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: 'iss.panier.app',
            audience: 'aud.panier.app',
        });

        return payload;
    }
    catch(error){
        return { success: false }
    }
}

export const createDummyJwtToken = async ()=>{
    const jwt_secret = crypto.randomBytes(256).toString('base64')
    const secret = new TextEncoder().encode(jwt_secret);
    
    const alg = 'HS256';
      
    const token = await new jose.SignJWT({ success: true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('iss.panier.app')
        .setAudience('aud.panier.app')
        .setExpirationTime('30m')
        .sign(secret);
    
    return token
}