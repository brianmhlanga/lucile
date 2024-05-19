import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let locations = await prisma.location.findMany()
    response['locations'] = locations
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})