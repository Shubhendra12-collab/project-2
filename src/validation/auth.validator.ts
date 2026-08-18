import * as z from "zod";

export const loginValidator = z.object({
    //body
    body:z.object({
        email:z.email(),
        password:z.string().min(6,"password must be at least 6 characters")
        .regex(/[A-Z]/,"password must contain at least one uppercase letter"),
    }),
    //params
    //query
});