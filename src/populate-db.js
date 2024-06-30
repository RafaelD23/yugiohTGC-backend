import { PrismaClient } from "@prisma/client";
import { generateHash } from "./utils/crypto.js";

const prisma = new PrismaClient();

const generateRandomUsername = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  for (let i = 0; i < 8; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return username;
};

// Função para popular o banco de dados
const populateDatabase = async () => {
  try {
    // Criar dois usuários com senhas hashadas
    await prisma.Clients.createMany({
      data: [
        {
          name: "TESTE - João da Silva",
          username: generateRandomUsername(),
          password: generateHash("123"),
        },
        {
          name: "TESTE - Maria Oliveira",
          username: generateRandomUsername(),
          password: generateHash("123"),
        },
      ],
    });

    console.log("Usuários criados com sucesso!");
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
