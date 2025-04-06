// Auth
export const LOGIN_SUCCESSFUL : string = "Login Successful";


// COMPANIES - MIGRATIONALL
export const DATABASE_DELETE_CONFIRMATION_TITLE:string = "Delete Company?";
export const DATABASE_DELETE_CONFIRMATION_MESSAGE = (companyName: string): string => {
  return `Do you want to delete the company ${companyName}?`
}

export const DATABASE_UPDATE_CONFIRMATION_TITLE: string = "Database Update?";
export const DATABASE_UPDATE_CONFIRMATION_MESSAGE: string = "You are about to update the databases of all companies. Should you continue?";



// ERROR
export const UNEXPECTED_ERROR: string = "An unexpected error occurred";

