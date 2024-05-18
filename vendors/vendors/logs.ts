import { prisma } from "~/prisma/db";


export const createLogs = async (company_id: string, user_id: string, action: string, table: string ) => {
    try {
        // Get profile id
        const [ { id } ] = await prisma.profile.findMany({
            where: {
                user_id
            }
        });

        // Store log
        await prisma.logs.create({
            data: {
                action,
                table,
                profile_id: id
            } 
        });

        // Update last seen
        await prisma.user.update({
            where: {
                id: user_id
            },
            data: {
                last_seen_at: new Date()
            }
        });
    
    } catch (error) {
        console.log(error);
    }

}