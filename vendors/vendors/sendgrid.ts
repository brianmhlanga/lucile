import sgMail from "@sendgrid/mail";
import moment from "moment";
import { type PaymentMethod } from "@prisma/client";

const SENDGRID_API_KEY = "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";
const SENDGRID_FROM_EMAIL = "noreply@panier.app";
const SUPPORT_EMAIL = "support@panier.app"

export const host = process.env.NODE_ENV === 'production' ? `https://${ process.env.NUXT_PUBLIC_PANIER_ENV === 'development' ? 'dev.' : '' }panier.app` : "http://localhost:3000";

export const sendInviteEmail = async (to: string, company_name: string, company_logo_url: string, url: string) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: company_name
        }, 
        templateId: 'd-82463c6624db4971984b44f0b92d14ed',
        subject: 'Invitation Email',
        dynamicTemplateData: { 
            company_name, url, 
            image_data: `${ host }/images/${ company_logo_url }`
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendOTPEmail = async (otp: string, to: string) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: 'Panier'
        }, 
        templateId: 'd-c241ef9acb1a4683addbf3b29e0ff82c',
        subject: 'One Time Pin',
        dynamicTemplateData: {
            otp
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendStockAlertEmail = async (product: any, quantity: number, to: any, company_name: string, company_logo_url: string) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: company_name
        }, 
        templateId: 'd-d014278e8345426dafe09dd293fb8f9a',
        subject: 'Stock Alert',
        dynamicTemplateData: {
            image_data: `${ host }/images/${ company_logo_url }`,
            product,
            quantity
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendInvoicePDFEmail = async (to: string, company_name: string, invoice_number: string, currency_symbol: string, total: number, company_id: string, company_logo_url: string, payment_due: string, invoice_id: string, user_id: string, token: string) => {
    const pdf: any = await $fetch('/export/invoice', {
        method: 'POST',
        responseType: 'arrayBuffer',
        body: {
            company_id, invoice_id, user_id, token
        }
    });

    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to,
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: company_name
        },
        subject: `Invoice #${ invoice_number }`,
        templateId: 'd-1bcd5422cf7e426eb74dc6b85ff23a35',
        dynamicTemplateData: {
            company: company_name,
            image_data: `${ host }/images/${ company_logo_url }`,
            currency_symbol,
            amount: total.toFixed(2),
            due_date: moment(payment_due).format('D MMMM Y')
        },
        attachments: [
            {
                content: toBuffer(pdf).toString('base64'),
                filename: `invoice-${ performance.now() }.pdf`,
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: `Invoice #${ invoice_number }`,
            }
        ],
    };

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendSalePDFEmail = async (to: string, company_name: string, receipt_number: string, currency_symbol: string, total: number, company_id: string, company_logo_url: string, sale_id: string, user_id: string, token: string) => {
    const pdf: any = await $fetch('/export/sale', {
        method: 'POST',
        responseType: 'arrayBuffer',
        body: {
            company_id, sale_id, user_id, token
        }
    });

    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to,
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: company_name
        },
        subject: `Sale Receipt #${ receipt_number }`,
        templateId: 'd-e941b08f4e1b459c8801207d2a576099',
        dynamicTemplateData: {
            image_data: `${ host }/images/${ company_logo_url }`,
            company: company_name,
            currency_symbol,
            amount: total.toFixed(2),
            date: moment().format('D MMMM Y')
        },
        attachments: [
            {
                content: toBuffer(pdf).toString('base64'),
                filename: `receipt-${ performance.now() }.pdf`,
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: `Sale Receipt #${ receipt_number }`,
            }
        ],
    };

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendBulkInvoicePDFEmail = async (scheduled, user_id, token) => {
    let pdf_array: any = await Promise.all([ ...scheduled.map(({ id, company }) => {
        return $fetch('/export/invoice', {
            method: 'POST',
            responseType: 'arrayBuffer',
            body: {
                company_id: company.id, 
                invoice_id: id, 
                user_id, 
                token
            }
        });
    }) ]);

    sgMail.setApiKey(SENDGRID_API_KEY)

    await Promise.all([
        ...scheduled.map(({ id, number, company, payment_due, currency, recipients, total, recursive_invoice_schedule }, k) => {
            const msg = {
                to: recipients,
                from: {
                    email: SENDGRID_FROM_EMAIL,
                    name: company.name
                },
                subject: `Invoice #${ number }`,
                templateId: 'd-1bcd5422cf7e426eb74dc6b85ff23a35',
                dynamicTemplateData: {
                    company: company.name,
                    image_data: `${ host }/images/${ company.logo_url }`,
                    currency_symbol: currency.symbol,
                    amount: total.toFixed(2),
                    due_date: moment(payment_due).format('D MMMM Y')
                },
                attachments: [
                    {
                        content: toBuffer(pdf_array[k]).toString('base64'),
                        filename: `invoice-${ performance.now() }.pdf`,
                        type: 'application/pdf',
                        disposition: 'attachment',
                        content_id: `Invoice #${ number }`,
                    }
                ],
            };
        
            sgMail
                .send(msg)
                .then(async () => {
                    // Mark all schedules as sent
                    await Promise.all([
                        ...recursive_invoice_schedule.map(({ id }) => {
                            return prisma.recursiveInvoiceSchedule.update({
                                where: {
                                    id
                                },
                                data: {
                                    is_sent: "SUCCESS"
                                }
                            })
                        })
                    ])
                })
                .catch(async (error) => {
                    console.error(error);
                    // Mark all schedules as failed
                    await Promise.all([
                        ...recursive_invoice_schedule.map(({ id }) => {
                            return prisma.recursiveInvoiceSchedule.update({
                                where: {
                                    id
                                },
                                data: {
                                    is_sent: "FAILED"
                                }
                            })
                        })
                    ])
                });
        })
    ])
}

export const sendQuotationPDFEmail = async (to: string, company_name: string, quotation_number: string, currency_symbol: string, total: number, company_id: string, company_logo_url: string, payment_due: string, quotation_id: string, user_id: string, token: string) => {
    const pdf: any = await $fetch('/export/quotation', {
        method: 'POST',
        responseType: 'arrayBuffer',
        body: {
            company_id, quotation_id, user_id, token
        }
    });

    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to,
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: company_name
        },
        subject: `Quotation #${ quotation_number }`,
        templateId: 'd-e9984e7f414f4c42b13dab275a9bff77',
        dynamicTemplateData: {
            image_data: `${ host }/images/${ company_logo_url }`,
            company: company_name,
            currency_symbol,
            amount: total.toFixed(2),
            due_date: moment(payment_due).format('D MMMM Y')
        },
        attachments: [
            {
                content: toBuffer(pdf).toString('base64'),
                filename: `quotation-${ performance.now() }.pdf`,
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: `Quotation #${ quotation_number }`,
            }
        ],
    };

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

const toBuffer = (arrayBuffer: ArrayBuffer) => {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
}

export const sendBulkSubscriptionAboutToExpirationEmail = async (subscription, days_before_expiration_date) => {
    await Promise.all([
        ...subscription.map(({ user, company }) => {
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: user.email, 
                from: {
                    email: SENDGRID_FROM_EMAIL,
                    name: 'Panier'
                }, 
                templateId: 'd-425bc7a727e94f4596fa65f2a1be089b',
                dynamicTemplateData: {
                    image_data: `${ host }/images/${ company?.logo_url }`,
                    text: `Your subscription ${ company?.name != null ? '(' + company?.name + ')' : '' } will expire in ${ days_before_expiration_date } day${ days_before_expiration_date > 1 ? 's' : '' }. Please visit our billing area to top up your subscription (https://panier.app/billing).`
                }
            }

            return sgMail
                .send(msg)
                .catch((error) => {
                    console.error(error)
                });
        })
    ])
}

export const sendBulkSubscriptionHasExpiredEmail = async (subscription) => {
    await Promise.all([
        ...subscription.map(({ user, company }) => {
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: user.email,
                from: {
                    email: SENDGRID_FROM_EMAIL,
                    name: 'Panier'
                }, 
                templateId: 'd-425bc7a727e94f4596fa65f2a1be089b',
                dynamicTemplateData: {
                    image_data: `${ host }/images/${ company?.logo_url }`,
                    text: `Your subscription ${ company?.name != null ? '(' + company?.name + ')' : '' } has expired. To reactivate and regain access to your subscription, please visit our billing area and top up your subscription (https://panier.app/billing).`
                }
            }

            return sgMail
                .send(msg)
                .catch((error) => {
                    console.error(error)
                });
        })
    ])
}

export const sendContactUsEmail = async (name: any, email: any, company: any, message: any) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to: SUPPORT_EMAIL, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: 'Panier'
        }, 
        cc: email,
        templateId: 'd-fb0469f327c14a279a369b02c1a20070',
        subject: 'Support Message',
        dynamicTemplateData: {
            name,
            email,
            company,
            message
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendBulkInvoiceOverdueEmails = async (invoices) => {
    await Promise.all([
        ...invoices.map(({ company, customer, number, currency, total }) => {
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: company.user.email, 
                from: {
                    email: SENDGRID_FROM_EMAIL,
                    name: company.name
                }, 
                templateId: 'd-99c146bccf35485e8802341d98165924',
                dynamicTemplateData: {
                    image_data: `${ host }/images/${ company.logo_url }`,
                    text: `Your invoice (#${ number }) of ${ currency.symbol }${ total } for ${ customer.name } is now overdue.`
                }
            }

            return sgMail
                .send(msg)
                .catch((error) => {
                    console.error(error)
                });
        })
    ])
}

export const sendWelcomeMessage = async (name: string, to: string) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: 'Panier'
        }, 
        templateId: 'd-16f6714405844c168c3803c191912acf',
        dynamicTemplateData: {
            name
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}

export const sendPaymentSuccessfulEmail = async (name: string, type: 'Topup' | 'Subscription', payment_method: PaymentMethod, amount: number, months: number, receipt_number: string, subscription_id: string, valid_from: string, expiry_date: string, to: string) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to, 
        from: {
            email: SENDGRID_FROM_EMAIL,
            name: 'Panier'
        }, 
        templateId: 'd-bdb8a678ef1c4fbc88d64fe69a1b6fb5',
        dynamicTemplateData: {
            name, type, payment_method, amount, months, receipt_number, subscription_id, valid_from, expiry_date
        }
    }

    await sgMail
        .send(msg)
        .catch((error) => {
            console.error(error)
        });
}