import { prisma } from "@/lib/prisma";

export async function getRecommendedGifts(userAge: number, userHobbies: string[]) {
  return await prisma.gift.findMany({
    where: {
      // 1. Filtro de Idade: O presente precisa aceitar a idade do usuário
      minAge: { lte: userAge },
      maxAge: { gte: userAge },
      
      // 2. Filtro de Hobbies: Presentes que tenham pelo menos UM dos hobbies do usuário
      categories: {
        some: {
          name: { in: userHobbies }
        }
      }
    },
    include: {
      categories: true // Para mostrar as tags de hobby no card do presente
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}