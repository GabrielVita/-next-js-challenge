'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth"; // Adicionamos o 'auth' aqui
import { AuthError } from "next-auth";

// --- FUNÇÕES DE LOGIN E CADASTRO ---

export async function loginUser(lang: string, formData: FormData) {
  try {
    await signIn("credentials", {
      id: formData.get("id"),
      password: formData.get("password"),
      redirectTo: `/${lang}/dashboard`, 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciais inválidas." };
    }
    throw error;
  }
}

export async function checkUsername(username: string) {
  if (username.length < 3) return { available: true };
  const user = await prisma.user.findUnique({
    where: { id: username.toLowerCase() },
    select: { id: true }
  });
  if (user) {
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
  const id = (formData.get("id") as string).toLowerCase();
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const age = Number(formData.get("age"));
  const gender = formData.get("gender") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        id,
        name,
        password: hashedPassword,
        age,
        gender,
        // Agora o campo hobbies não recebe strings, ele começa vazio
        // O usuário preencherá no Onboarding
      },
    });
  } catch (error) {
    return { error: "Este nome de usuário já está em uso." };
  }

  // Opcional: Logar automaticamente após registrar ou mandar para o login
  redirect(`/${lang}/login`);
}

// --- NOVAS FUNÇÕES PARA O ONBOARDING (TABELA HOBBY) ---

/**
 * Busca todos os hobbies pré-cadastrados para mostrar na tela de seleção
 */
export async function getAvailableHobbies() {
  try {
    return await prisma.hobby.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Erro ao buscar hobbies:", error);
    return [];
  }
}

/**
 * Salva a seleção de hobbies do usuário logado
 */
export async function saveUserHobbies(hobbyIds: string[]) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Não autenticado" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        hobbies: {
          set: [],
          connect: hobbyIds.map(id => ({ id }))
        }
      }
    });
    return { success: true }; // Apenas retorne sucesso
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return { error: "Erro ao salvar no banco" };
  }
}