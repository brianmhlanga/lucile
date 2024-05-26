import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
    let response: any = {};
    const convertStringToFloat = async (str:any) => {
      // Remove "$" and commas from the string
      const numberString = str.replace(/\$|,/g, '');
  
      // Parse the number string to a float
      const number = parseFloat(numberString);
  
      return number;
    }
    const convertStringToInt = async (str: string) => {
      // Remove any non-numeric characters from the string
      const numericStr = str.replace(/\D/g, '');
      // Parse the integer value
      const intValue = parseInt(numericStr, 10);
      return intValue;
    }
    let { status, sort, first, last, types, reference_code, locations, min_beds, min_baths, min_amount, max_amount } = await readBody(event);
    try {

        let prop_count = await prisma.property.count({
            where: {
                listing_status: status
            }
        });

        let whereClause: any = {
            listing_status: status
        };

        if (locations && locations.length > 0) {
            whereClause = {
                ...whereClause,
                OR: [
                    { location_id: { in: locations } },
                    { suburb_id: { in: locations } }
                ]
            };
        }

        if (types && types.length > 0) {
            whereClause = {
                ...whereClause,
                type_id: { in: types }
            };
        }

        if (reference_code) {
            whereClause = {
                ...whereClause,
                refrence_code: reference_code
            };
        }

        if (min_amount && max_amount) {
            whereClause = {
                ...whereClause,
                AND: [
                    { amount: { gte: await convertStringToFloat(min_amount) } },
                    { amount: { lte: await convertStringToFloat(max_amount) } }
                ]
            };
        } else if (min_amount) {
            whereClause = {
                ...whereClause,
                amount: { gte: await convertStringToFloat(min_amount) }
            };
        } else if (max_amount) {
            whereClause = {
                ...whereClause,
                amount: { lte: await convertStringToFloat(max_amount) }
            };
        }
        if (min_beds) {
            whereClause = {
                ...whereClause,
                features: { 
                  some: {
                    name: "Bedrooms",
                    total: {gte: await convertStringToInt(min_beds)}
                  }
                }
            };
        }

        if (min_baths) {
            whereClause = {
                ...whereClause,
                features: { 
                  some: {
                    name: "Bathrooms",
                    total: {gte: await convertStringToInt(min_baths)}
                  }
                }
            };
        }

        const searched_properties = await prisma.property.findMany({
            where: whereClause,
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
        });

        response['properties'] = searched_properties;
        response['total'] = prop_count;
        response['success'] = true;

    } catch (error: any) {
        response['message'] = error;
        response['success'] = false;
    }

    return response;
});
