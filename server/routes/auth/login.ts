import { createAppJwtToken, createOTPJwtToken } from "~/vendors/jwt";
import { prisma } from "~/prisma/db";
import { z } from "zod";
import argon2 from "argon2";

export default defineEventHandler(async (event)=>{
   try {
      const data = await readBody(event);

      //Get env variables
      const JWT_APP_TOKEN_SECRET:any = process.env.NUXT_PUBLIC_JWT_APP_TOKEN_SECRET;
      const JWT_OTP_TOKEN_SECRET:any = process.env.NUXT_PUBLIC_JWT_OTP_TOKEN_SECRET;

      //Validate input
      const bodySchema = z.object({
         email: z.string().email(),
         password: z.string()
      });
      const to_validate = data?.data
      const validateBody = bodySchema.safeParse(to_validate);

      if(!validateBody.success) {
         return {
            data: {},
            message: 'Input is in the wrong format',
            token: "",
            open_two_factor_auth: false,
            go_straight_to_dashboard: false,
            success: false
         }
      }

      //Desctruct body
      const { email, password } = to_validate;


      //Check if the user is inactive
      let inactive_users = await prisma.user.findMany({
         where: {
            AND: [
               {
                  email
               },
               {
                  status: false
               }
            ]
         }
      });

      if(inactive_users.length > 0) {
         return {
            data: {},
            message: 'Sorry but unfortunately this user is inactive. Please contact support for more details.',
            token: "",
            open_two_factor_auth: false,
            go_straight_to_dashboard: false,
            success: false
         }
      }

      //Check if the user exists
      let users = await prisma.user.findMany({
         where: {
            email
         }
      });
  
      if(users.length > 0){
         let user:any = users.at(0);
         const match = await argon2.verify(user.password, password);
      
            if(match){
               //Successfully login
               //Create a JWT token
               const token = await createAppJwtToken(JWT_APP_TOKEN_SECRET);
      
               setCookie(event, "token", token);
      
              const updateUser:any = await prisma.user.update({
                  where: {
                     email
                  }, 
                  data: {
                    status: true
                  }
               }); 
         
               delete updateUser.password;
         
               //Store user data in cookie
               setCookie(event, "user", JSON.stringify(updateUser));

      
               return {
                  data: updateUser,
                  message: "",
                  token: "",
                  open_two_factor_auth: false,
                  go_straight_to_dashboard: true,
                  success: true
               }
            }else{
               return {
                  data: {},
                  message: 'Either the email or the password or both are incorrect',
                  token: "",
                  open_two_factor_auth: false,
                  go_straight_to_dashboard: false,
                  success: false
               }
            }
      }else{
         return { 
            data: {},
            message: 'Either the email or the password or both are incorrect',
            token: "",
            open_two_factor_auth: false,
            go_straight_to_dashboard: false,
            password: null,
            success: false
         }  
      }
   } catch (error) {
      console.error(error);
      setResponseStatus(event, 500);

      return { 
         data: {},
         message: 'A server error has occurred',
         token: "",
         open_two_factor_auth: false,
         go_straight_to_dashboard: false,
         password: null,
         success: false
      }  
   }
});

