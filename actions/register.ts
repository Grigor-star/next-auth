"use server";
import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";

import * as z from "zod";

import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Something went wrong!" };

  const { username, email, password } = validatedFields.data;

  const exsitingUser = await db.user.findUnique({ where: { email: email } });

  if (exsitingUser) return { error: "User with this email already exists." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: { email, name: username, id: uuidv4(), password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "E-mail sent!" };
};
