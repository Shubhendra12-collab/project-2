import { TResponseCode } from "../types/global.types";

class AppError extends Error  {
    public status: "error" | "fail" | "success";
    public success: boolean;
        constructor(public message: string, public statusCode: number,public code?:TResponseCode, public details?:any[],)
    {
        super(message);
        this.statusCode = statusCode;
        //this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.success = false;
        this.details = details;
        Error.captureStackTrace(this, AppError);
    } 
}

export default AppError;