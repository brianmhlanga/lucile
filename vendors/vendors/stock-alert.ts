import { prisma } from "~/prisma/db";
import { sendStockAlertEmail } from "./sendgrid";

export const checkProductStockAlert = async (product_id: string) => {
    try {
        const [{ name, quantity, stock_alert, company }] = await prisma.product.findMany({
            where: {
                AND: [
                    {
                        id: product_id,
                    },
                    {
                        status: true
                    }
                ]
                
            },
            include: {
                stock_alert: true,
                company: true
            }
        });
    
        stock_alert.map(async (value) => {
            if(quantity < value.quantity && value.is_sent === false){
                // Send an email to the recipients
                await sendStockAlertEmail(name, value.quantity, value.recipients, company.name, company.logo_url)
                .then(async () => {
                    await prisma.stockAlert.update({
                        where: {
                            id: value.id
                        },
                        data: {
                            is_sent: true
                        }
                    });
                });
            }
            else if(quantity >= value.quantity && value.is_sent === true){
                await prisma.stockAlert.update({
                    where: {
                        id: value.id
                    },
                    data: {
                        is_sent: false
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}