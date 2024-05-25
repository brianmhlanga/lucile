import { checkAppJwtToken } from "~/vendors/jwt";
import { prisma } from "~/prisma/db";
import { z } from "zod";

export default defineEventHandler(async (event) => {
    let response:any = {}
    try {
       
        const data = await readBody(event);

        // Validate input
       
       
        // const bodySchema = z.object({ 
        //     name: z.string(),
        //     token: z.string()
        // });
        // Destruct body
        const { property_name,listing_types,agent,show_start_time,show_end_time,description,address,owner_email,owner_name,owner_phone,suburb,location,type,amount,ammenities,other_ammenities,uploaded_images,is_available_on_show,showdate, token } = data

        // const validateBody = bodySchema.safeParse(data);
        //Get env variables
        const JWT_APP_TOKEN_SECRET:any = process.env.NUXT_PUBLIC_JWT_APP_TOKEN_SECRET;
        const validateToken = await checkAppJwtToken(token, JWT_APP_TOKEN_SECRET);
        const referenceGenerator = async () => {
            let num = await prisma.property.count()+1
            let refnum = `LRE${num}`
            return refnum
        }
        // if(!validateBody.success) return { data: {}, message: 'Input is in the wrong format', success: false }

        if(!validateToken.success) return { data: {}, message: 'Session is invalid', success: false }

        // Check if this user has access to this endpoint

        const addedProperty = await prisma.property.create({
            data: {
                name: property_name,
                description: description,
                address,
                owner_email,
                owner_name,
                owner_phone,
                refrence_code: await referenceGenerator(),
                listing_status: listing_types,
                location_id: location,
                suburb_id: suburb,
                type_id: type,
                agent_id: agent,
                amount: Number(amount),
                images: uploaded_images,
                other_features: other_ammenities,
                on_show: is_available_on_show,
                showDate: showdate,
                showStartTime: show_start_time,
                showEndTime: show_end_time
            }
        });
        const addIdToObjectArray = (arr: any[], propertyId: string) => {
            return arr.map((obj: any) => {
                console.log('ammenities',ammenities)
                console.log("total",obj.total)
                const totalNumber = parseFloat(obj.total);
                return { ...obj, property_id: propertyId, total: totalNumber };
            });
        };
    if (ammenities.length > 0) {
        let created_ammenities = await prisma.features.createMany({
            data: addIdToObjectArray(ammenities, addedProperty?.id)
        });
        response['ammenities'] = created_ammenities
    }
    

       response['type'] = addedProperty
       response['success'] = true

        
    } catch (error) {
        console.error(error);
        setResponseStatus(event, 500);

        response['message'] = error
        response['success'] = false
    }
    return response
});