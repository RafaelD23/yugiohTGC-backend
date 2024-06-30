import { PrismaClient } from "@prisma/client";
import { generateHash } from "./utils/crypto.js";

const prisma = new PrismaClient();

// Função para popular o banco de dados
const populateDatabase = async () => {
  try {
    // Criar dois usuários com senhas hashadas
    await prisma.Clients.createMany({
      data: [
        {
          name: "TESTE DEV FURIOSO",
          username: "devfurioso",
          password: generateHash("123"),
        },
        {
          name: "TESTE DEV",
          username: "dev",
          password: generateHash("123"),
        },
      ],
    });

    // Adiciona cartas para esses usuários
    const clients = await prisma.Clients.findMany({
      where: {
        OR: [{ username: "devfurioso" }, { username: "dev" }],
      },
    });

    for (const client of clients) {
      const { uuid } = client;
      const cardSet = [86988864, 6983839, 34541863, 73262676, 90861137];
      const formattedArray = cardSet.map((id) => ({
        cardId: id,
        clientsUuid: uuid,
      }));
      await prisma.ClientsCards.createMany({
        data: formattedArray,
      });
    }

    console.log("Usuários criados com sucesso!", clients);
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute a função para popular o banco de dados ao chamar o script
populateDatabase()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
