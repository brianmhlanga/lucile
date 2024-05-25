import {prisma } from "~/prisma/db"


export default defineEventHandler( async (event) => {
let response:any = {}
let {status,sort,first,last} = await readBody(event)
let today = new Date();
try {
    let prop_count = await prisma.property.count({
        where: {
            on_show: true,
            showDate: {
                gte: today
            }
        }
    })
    if (sort === 'DEFAULT') {
        
        let properties = await prisma.property.findMany({
            where: {
                on_show: true,
                showDate: {
                    gte: today
                }
            },
            include: {
                features: true,
                agent: true,
                location: true,
                suburb: true,
                prop_type: true
            },
            orderBy: {
                created_at: 'desc',
            },
            skip: first,
            take: 10
        })
        response['properties'] = properties
        response['total'] = prop_count
        response['success'] = true
    } 
    if (sort === 'HIGHEST PRICE') {
        let properties = await prisma.property.findMany({
            where: {
                on_show: true,
                showDate: {
                    gte: today
                }
            },
            include: {
                features: true,
                agent: true,
                location: true,
                suburb: true,
                prop_type: true
            },
            orderBy: {
                amount: 'desc'
            },
            skip: first,
            take: 10
        })
        response['properties'] = properties
        response['total'] = prop_count
        response['success'] = true
    }
    if (sort === 'LOWEST PRICE') {
        let properties = await prisma.property.findMany({
            where: {
                on_show: true,
                showDate: {
                    gte: today
                }
            },
            include: {
                features: true,
                agent: true,
                location: true,
                suburb: true,
                prop_type: true
            },
            orderBy: {
                amount: 'asc',
            },
            skip: first,
            take: 10
        })
        response['properties'] = properties
        response['total'] = prop_count
        response['success'] = true
    }
    if (sort === 'MOST RECENT') {
        let properties = await prisma.property.findMany({
            where: {
                on_show: true,
                showDate: {
                    gte: today
                }
            },
            include: {
                features: true,
                agent: true,
                location: true,
                suburb: true,
                prop_type: true
            },
            orderBy: {
                created_at: 'desc',
            },
            skip: first,
            take: 10
        })
        response['properties'] = properties
        response['total'] = prop_count
        response['success'] = true
    }
    

} catch (error:any) {
    response['message'] = error
    response['success'] = false
}

return response
})