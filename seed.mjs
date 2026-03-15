import { PrismaClient } from '@prisma/client'

// No Prisma 7, para scripts externos, precisamos ser bem diretos
const prisma = new PrismaClient({
  __internal: {
    configOverride: {
      datasourceUrl: process.env.DATABASE_URL,
    },
  },
})

async function main() {
  const list = [
    'Tecnologia', 'Games', 'Esportes', 'Cozinha', 
    'Leitura', 'Moda', 'Música', 'Viagem', 
    'Arte', 'Fitness', 'Decoração', 'Beleza'
  ]

  console.log('🌱 Semeando hobbies no banco...')

  for (const item of list) {
    try {
      await prisma.hobby.upsert({
        where: { name: item },
        update: {},
        create: { name: item },
      })
      console.log(`✅ Adicionado: ${item}`)
    } catch (err) {
      console.error(`❌ Erro ao adicionar ${item}:`, err.message)
    }
  }

  console.log('✨ Processo de seed finalizado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })