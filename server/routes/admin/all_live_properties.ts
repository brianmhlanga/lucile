import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}
let {status,sort,first,last} = await readBody(event)
try {
    let prop_count = await prisma.property.count({
        where: {
            status: "LISTED"
        }
    })

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
        },
        orderBy: {
            created_at: "desc"
        },
         skip: first,
         take: 4

    })
    response['properties'] = properties
    response['total'] = prop_count
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})