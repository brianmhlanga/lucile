import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}

try {

    let users = await prisma.user.findMany()
    response['users'] = users
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})