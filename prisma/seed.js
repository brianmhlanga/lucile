import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

const load = async () => {
    try {
        //Hash password
        const password = "Bm19962019@";
        const hash = await argon2.hash(password);
        await prisma.user.upsert({
            where: {
                email: "admin@lucilerealestate.co.zw"
            },
            create: {
                username: "Brian",
                first_name: "Brian",
                surname: "Mhlanga",
                email: "admin@lucilerealestate.co.zw",
                status: true,
                phone_number: "07796695858",
                whatsapp_number: "263779698568",
                role: "ADMIN",
                password: hash
            },
            update: {
                first_name: "Brian",
                surname: "Mhlanga",
                email: "admin@lucilerealestate.co.zw",
                status: true,
                phone_number: "07796695858",
                whatsapp_number: "263779698568",
                role: "ADMIN",
                password: hash
            }
        });

        console.log("Added user data");

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}

load(); 
