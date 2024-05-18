import Dexie, { type Table } from 'dexie';
import { type Product, type Customer, type Sale, type Company, type Profile  } from '@prisma/client';

export interface Permission {
    id: string,
    company_id: string;
    code: string;
}

export class MySubClassedDexie extends Dexie {
    // Define the types of the tables
    permission!: Table<Permission>;
    product!: Table<Product>;
    customer!: Table<Customer>;
    sale!: Table<Sale>;
    company!: Table<Company>;
    profile!: Table<Profile>;

    constructor() {
        super('panier-app');

        // Permission
        this.version(1).stores({
            permission: 'id, code, company_id'
        });

        // Product
        this.version(2).stores({
            product: 'id, name, description, sku, buying_price, selling_price, quantity, company_id, status, updated_at, created_at'
        });

        // Customer
        this.version(1).stores({
            customer: 'id, name, contact_person, phone, email, address, company_id, status, updated_at, created_at'
        });
        
        // Sale
        this.version(1).stores({
            sale: 'id, receipt_number, customer_id, phone, email, company_id, currency, products, total, discount, tax_added, status, created_by, updated_at, created_at'
        })

        // Company 
        this.version(1).stores({
            company: 'id, name, email, phone, country_code, address, city, state_province, country, base_currency, user_id, industry, type_of_industry, registration_number, tax_number, website, logo_url, status, is_expired, updated_at, created_at'
        });

        // Profile
        this.version(1).stores({
            profile: 'id, company_id, user_id, status, created_at'
        });
    }
}

export const offline_db = new MySubClassedDexie();