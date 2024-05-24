import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let properties = await prisma.property.findMany({
        where: {
            status: "LISTED"
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