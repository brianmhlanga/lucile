import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

let {status,sort,first,last,types,reference_code,locations} = await readBody(event)
try {
    let prop_count = await prisma.property.count({
        where: {
            listing_status: status
        }
    })
    const searched_properties = await prisma.property.findMany({
        where: {
          OR: [
            { location_id: { in: locations } },
            { suburb_id: { in: locations } },
            
          ],
          listing_status: status,
          type_id: { in: types }, // Filter by selected property types
          refrence_code: { 
            equals: reference_code.trim()
          } 
        }, 
        include: {
                features: true,
                agent: true,
                location: true,
                suburb: true,
                prop_type: true
            },
            orderBy: {
                created_at: 'desc',
            },
            skip: first,
            take: 10
      });
      
        response['properties'] = searched_properties
        response['total'] = prop_count
        response['success'] = true
    
   
    response['success'] = true
    

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})