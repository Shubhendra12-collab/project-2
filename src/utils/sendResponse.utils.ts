import  { Response } from "express";

interface IResponseData <T>{
    message: string;
    data?: T;
    statusCode:number;
}

export const sendResponse = <T>(res: Response, { message, data, statusCode }: IResponseData<T>) => {
    res.status(statusCode).json({
        status: statusCode >= 200 && statusCode < 300 ? "success" : "fail",
        success: statusCode >= 200 && statusCode < 300, 
        message,
        data,
        
    });
}