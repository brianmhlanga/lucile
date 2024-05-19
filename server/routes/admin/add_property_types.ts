import { checkAppJwtToken } from "~/vendors/jwt";
import { prisma } from "~/prisma/db";
import { z } from "zod";

export default defineEventHandler(async (event) => {
    let response:any = {}
    try {
       
        const data = await readBody(event);

        // Validate input
        const bodySchema = z.object({ 
            name: z.string(),
            token: z.string()
        });
        // Destruct body
        const { name, token } = data

        const validateBody = bodySchema.safeParse(data);
        
        //Get env variables
        const JWT_APP_TOKEN_SECRET:any = process.env.NUXT_PUBLIC_JWT_APP_TOKEN_SECRET;
        const validateToken = await checkAppJwtToken(token, JWT_APP_TOKEN_SECRET);

        if(!validateBody.success) return { data: {}, message: 'Input is in the wrong format', success: false }

        if(!validateToken.success) return { data: {}, message: 'Session is invalid', success: false }

        // Check if this user has access to this endpoint

        const addedType = await prisma.propertyType.create({
            data: {
                name: name
            }
        });

       response['type'] = addedType
       response['success'] = true

        
    } catch (error) {
        console.error(error);
        setResponseStatus(event, 500);

        response['message'] = error
        response['success'] = false
    }
    return response
});