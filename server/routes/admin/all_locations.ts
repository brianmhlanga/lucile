import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let locations = await prisma.location.findMany({
        include: {
            suburbs: true
        }
    })
    response['locations'] = locations
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})