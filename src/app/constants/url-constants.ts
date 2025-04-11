export const API_BASE_URL: string = "https://localhost:7099/api";

export const TOKEN_KEY: string = "access_token";



// -----------------------------Endpoints-----------------------------------------

// Auth
export const AUTH_ENDPOINT = `${API_BASE_URL}/Auth`;
export const AUTH_LOGIN_BY_COMPANY:string = "/Auth/login-by-company";
export const AUTH_CHANGE_COMPANY:string = "/Auth/change-company";

// Users
export const USERS_ENDPOINT: string = "/Users";

// Companıes
export const COMPANIES_ENDPOINT: string = "/Companies";
export const COMPANIES_USER_COMPANIES: string = "/Companies/user-companies";
export const COMPANIES_MIGRATEALL_ENDPOINT: string = "/Companies/migrateAll";

// Cash Registers
export const CASH_REGISTERS_ENDPOINT: string = "/CashRegisters";

// Cash Register Details
export const CASH_REGISTER_DETAILS_ENDPOINT: string = "/CashRegisterDetails";

// Banks
export const BANKS_ENDPOINT: string = "/Banks";

// Bank Details
export const BANK_DETAILS_ENDPOINT: string = "/BankDetails";

// Customers
export const CUSTOMERS_ENDPOINT: string = "/Customers";

// Customer Details
export const CUSTOMER_DETAILS_ENDPOINT: string = "/CustomerDetails";

// Products
export const PRODUCTS_ENDPOINT: string = "/Products";

// Product Details
export const PRODUCT_DETAILS_ENDPOINT: string = "/ProductDetails";

// Invoices
export const INVOICES_ENDPOINT: string = "/Invoices";
