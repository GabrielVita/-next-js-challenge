'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function checkUsername(username: string) {
  if (username.length < 3) return { available: true };

  const user = await prisma.user.findUnique({
    where: { id: username.toLowerCase() },
    select: { id: true }
  });

  if (user) {
    // Se existir, geramos 3 sugestões simples
    const suggestions = [
      `${username}${Math.floor(Math.random() * 99)}`,
      `${username}_`,
      `the_${username}`
    ];
    return { available: false, suggestions };
  }

  return { available: true };
}

export async function registerUser(lang: string, formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const age = Number(formData.get("age"));
  const gender = formData.get("gender") as string;
  const hobbiesString = formData.get("hobbies") as string;

  // Transforma a string de hobbies em array
  const hobbies = hobbiesString ? hobbiesString.split(",").map(h => h.trim()) : [];

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        id,
        name,
        password: hashedPassword,
        age,
        gender,
        hobbies,
      },
    });
  } catch (error) {
    return { error: "Este nome de usuário já está em uso." };
  }

  const targetPath = `/${lang}`; 
  console.log("Redirecionando para:", targetPath); // Debug para ver no terminal
  
  redirect(targetPath);
}