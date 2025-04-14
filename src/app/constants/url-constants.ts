export const API_BASE_URL: string = "https://localhost:7099/api";
export const SIGNALR_BASE_URL: string = "https://localhost:7099";
export const TOKEN_KEY: string = "access_token";


// -----------------------------Endpoints-----------------------------------------

// Auth
export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;
export const AUTH_LOGIN_BY_COMPANY:string = "/auth/login-by-company";
export const AUTH_CHANGE_COMPANY:string = "/auth/change-company";

// Users
export const USERS_ENDPOINT: string = "/users";

// Companıes
export const COMPANIES_ENDPOINT: string = "/companies";
export const COMPANIES_USER_COMPANIES: string = "/companies/user-companies";
export const COMPANIES_MIGRATEALL_ENDPOINT: string = "/companies/migrateAll";

// Invoices
export const INVOICES_ENDPOINT: string = "/invoices";


//#region  Cash Register Full
// Cash Registers
export const CASH_REGISTERS_ENDPOINT: string = "/cashRegisters";

// Cash Register Details
export const CASH_REGISTER_DETAILS_ENDPOINT: string = "/cashRegisterDetails";
//#endregion

//#region Bank Full
// Banks
export const BANKS_ENDPOINT: string = "/banks";

// Bank Details
export const BANK_DETAILS_ENDPOINT: string = "/bankDetails";
//#endregion

//#region Customer Full
// Customers
export const CUSTOMERS_ENDPOINT: string = "/customers";

// Customer Details
export const CUSTOMER_DETAILS_ENDPOINT: string = "/customerDetails";
//#endregion

//#region Product Full
// Products
export const PRODUCTS_ENDPOINT: string = "/products";

// Product Details
export const PRODUCT_DETAILS_ENDPOINT: string = "/productDetails";
//#endregion

//#region Report Full
// PRODUCT PROFITABILITY REPORTS
export const PRODUCT_PROFITABILITY_REPORTS_ENDPOINT: string = "/reports/product-profitability-reports"

// PURCHASE REPORTS
export const PURCHASE_REPORTS_ENDPOINT: string = "/reports/purchase-reports";
//#endregion
