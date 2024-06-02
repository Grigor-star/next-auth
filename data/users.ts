"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) =>
  await db.user.findUnique({ where: { email } });
export const getUserById = async (id: string | undefined) =>
  await db.user.findUnique({ where: { id } });
