const permission_list = [
    {
        code: "owner",
        description: "Allowed to use all the features"
    },
    {
        code: "product_create",
        label: "Create",
        group: "products",
        description: "Allowed to create products"
    },
    {
        code: "product_edit",
        label: "Edit",
        group: "products",
        description: "Allowed to edit products"
    },
    {
        code: "product_delete",
        label: "Delete",
        group: "products",
        description: "Allowed to delete products"
    },
    {
        code: "product_export",
        label: "Export",
        group: "products",
        description: "Allowed to export products"
    },
    {
        code: "customer_create",
        label: "Create",
        group: "customers",
        description: "Allowed to create customers"
    },
    {
        code: "customer_edit",
        label: "Edit",
        group: "customers",
        description: "Allowed to edit customers"
    },
    {
        code: "customer_delete",
        label: "Delete",
        group: "customers",
        description: "Allowed to delete customers"
    },
    {
        code: "customer_export",
        label: "Export",
        group: "customers",
        description: "Allowed to export customers"
    },
    {
        code: "invoice_create",
        label: "Create",
        group: "invoices",
        description: "Allowed to create invoices"
    },
    {
        code: "invoice_edit",
        label: "Edit",
        group: "invoices",
        description: "Allowed to edit invoices"
    },
    {
        code: "invoice_delete",
        label: "Delete",
        group: "invoices",
        description: "Allowed to delete invoices"
    },
    {
        code: "quotation_create",
        label: "Create",
        group: "quotations",
        description: "Allowed to create quotations"
    },
    {
        code: "quotation_edit",
        label: "Edit",
        group: "quotations",
        description: "Allowed to edit quotations"
    },
    {
        code: "quotation_delete",
        label: "Delete",
        group: "quotations",
        description: "Allowed to delete quotations"
    },
    {
        code: "stock_alert_create",
        label: "Create",
        group: "stock_alert",
        description: "Allowed to create stock alerts"
    },
    {
        code: "stock_alert_edit",
        label: "Edit",
        group: "stock_alert",
        description: "Allowed to edit stock alerts"
    },
    {
        code: "stock_alert_delete",
        label: "Delete",
        group: "stock_alert",
        description: "Allowed to delete stock alerts"
    },
    {
        code: "currency_create",
        label: "Create",
        group: "currency",
        description: "Allowed to create currency"
    },
    {
        code: "currency_edit",
        label: "Edit",
        group: "currency",
        description: "Allowed to edit currency"
    },
    {
        code: "currency_delete",
        label: "Delete",
        group: "currency",
        description: "Allowed to delete currency"
    },
    {
        code: "sale_create",
        label: "Create",
        group: "sales",
        description: "Allowed to create sales"
    },
    {
        code: "sale_edit",
        label: "Edit",
        group: "sales",
        description: "Allowed to edit sales"
    },
    {
        code: "sale_delete",
        label: "Delete",
        group: "sales",
        description: "Allowed to delete sales"
    },
    {
        code: "sale_export",
        label: "Export",
        group: "sales",
        description: "Allowed to export sales"
    },
    {
        code: "cash_flow_create",
        label: "Create",
        group: "cash_flow",
        description: "Allowed to create Income/Expense"
    },
    {
        code: "cash_flow_edit",
        label: "Edit",
        group: "cash_flow",
        description: "Allowed to edit Income/Expense"
    },
    {
        code: "cash_flow_delete",
        label: "Delete",
        group: "cash_flow",
        description: "Allowed to delete Income/Expense"
    },
    {
        code: "cash_flow_export",
        label: "Export",
        group: "cash_flow",
        description: "Allowed to export Income/Expense"
    },
    {
        code: "view_report",
        label: "View Reports",
        group: "reports",
        description: "Allowed to view reports"
    },
    {
        code: "invite_collaborator",
        label: "Invite Users",
        group: "invitations",
        description: "Allowed to invite collaborators"
    },
    {
        code: "view_logs",
        label: "View Logs",
        group: "logs",
        description: "Allowed to view logs"
    },
    {
        code: "billing",
        label: "Access Billing",
        group: "Billing",
        description: "Allowed to access billing"
    }
]

module.exports = { permission_list: permission_list };