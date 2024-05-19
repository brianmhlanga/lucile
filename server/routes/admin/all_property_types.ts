import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let propertyTypes = await prisma.propertyType.findMany()
    response['types'] = propertyTypes
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})