import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}
let {status} = await readBody(event)
try {

    let properties = await prisma.property.findMany({
        where: {
            listing_status: status
        },
        include: {
            features: true,
            agent: true,
            location: true,
            suburb: true,
            prop_type: true
        }
    })
    response['properties'] = properties
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})