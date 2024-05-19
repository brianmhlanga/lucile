import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let properties = await prisma.property.findMany()
    response['properties'] = properties
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})