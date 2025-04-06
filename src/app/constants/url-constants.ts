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
