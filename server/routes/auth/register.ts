import { createOTPJwtToken } from "~/vendors/jwt";
import { prisma } from "~/prisma/db";
import { z } from "zod";
import argon2 from "argon2";

export default defineEventHandler(async (event)=>{
    try {
        const data = await readBody(event);
        console.log("data", data?.data);
        //Get env variables
        const JWT_OTP_TOKEN_SECRET:any = process.env.NUXT_PUBLIC_JWT_OTP_TOKEN_SECRET;

        //Validate input
        const bodySchema = z.object({
            username: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            role: z.string(),
            whatsapp: z.string(),
            is_send_credentials: z.boolean(),
            email: z.string().email(),
            phone: z.string(),
            password: z.string()
        });
        const to_validate = data?.data
        const validateBody = bodySchema.safeParse(to_validate);
        console.log("validated body",validateBody)
        if(!validateBody.success) {
            return {
                data: {},
                message: 'Input is in the wrong format',
                token: "",
                open_two_factor_auth: false,
                success: false
            }
        }

        //Desctruct body
        let { email,username,first_name,last_name,role,whatsapp,is_send_credentials,phone,password } = data?.data;

   

        //Check if the user exists
        let users = await prisma.user.findMany({
            where: {
                email
            }
        })
        .catch(error => {
            console.error(error)

            return []
        });
  
        if(users.length == 0){
            // Create a JWT token
            let password2 = await argon2.hash(password);
            const min = 100000; // minimum value (inclusive)
            const max = 999999; // maximum value (inclusive)
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            if(argon2.needsRehash(password2)) password2 = await argon2.hash(password2);
            const token = await createOTPJwtToken(JWT_OTP_TOKEN_SECRET);
            let register = await prisma.user.create({
                data: {
                    first_name,
                    surname:last_name,
                    role,
                    whatsapp_number: whatsapp,
                    phone_number:phone,
                    username,
                    password: password2,
                    email
                }
            })
            return { 
                data: {},
                message: "",
                register,
                token,
                open_two_factor_auth: true,
                success: true
            }  
        }else {
            return { 
                data: {},
                message: 'A user with this email already exists',
                token: "",
                open_two_factor_auth: false,
                password: null,
                success: false
            }  
        }
    } catch (error) {
        console.error(error);
        setResponseStatus(event, 500);

        return { 
            data: {},
            message: 'Server error. Please try again later',
            token: "",
            open_two_factor_auth: false,
            password: null,
            success: false
        }  
    }
});

