import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}
let {status} = await readBody(event)
try {

    let suburbsWithProperties = await prisma.suburbs.findMany({
        include: {
            location: true,
            property: {
                where: {
                    listing_status: status
                }
            }
        }
    });
    response['properties'] = suburbsWithProperties
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})