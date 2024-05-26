import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}
let {status} = await readBody(event)
try {
    let harare_id = await prisma.location.findFirst({
        where: {
                location_name: "Harare" || "HARARE"
        }
    })
    let gweru_id = await prisma.location.findFirst({
        where: {
                location_name: "Gweru" || "GWERU"
        }
    })
    let bulawayo_id = await prisma.location.findFirst({
        where: {
                location_name: "Bulawayo" || "BULAWAYO"
        }
    })
    let harare_total = await prisma.property.count({
        where: {
            location: {
                location_name: "Harare" || "HARARE"
            }
        }
    })
    let bulawayo_total = await prisma.property.count({
        where: {
            location: {
                location_name: "Bulawayo" || "BULAWAYO"
            }
        }
    })
    let gweru_total = await prisma.property.count({
        where: {
            location: {
                location_name: "Gweru" || "GWERU"
            }
        }
    })
    let suburbsWithProperties = await prisma.location.findMany({
        include: {
            suburbs: true,
            properties: {
                where: {
                    status: "LISTED"
                }
            }
        }
    });
    response['properties'] = suburbsWithProperties,
    response['harare']= {"total":harare_total,"id":harare_id?.id},
    response['bulawayo'] = {"total":bulawayo_total,"id":bulawayo_id?.id},
    response['gweru'] = {"total":gweru_total,"id":gweru_id?.id},
    response['success'] = true

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})