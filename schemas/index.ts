import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1, { message: "Password is required!" }),
});

export const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password is required!" }),
});
