-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('YES', 'NOT');

-- CreateEnum
CREATE TYPE "TRADE_OFFER_STATUS" AS ENUM ('OPEN', 'ACCEPTED', 'REFUSED');

-- CreateEnum
CREATE TYPE "TRADE_ACTION" AS ENUM ('FROM', 'TO');

-- CreateTable
CREATE TABLE "Clients" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ClientStatus" NOT NULL DEFAULT 'YES',

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "LogRequests" (
    "uuid" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "body" TEXT,
    "params" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsUuid" TEXT,

    CONSTRAINT "LogRequests_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ClientsCards" (
    "uuid" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,
    "clientsUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientsCards_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "TradeOffer" (
    "uuid" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "reciever" TEXT NOT NULL,
    "status" "TRADE_OFFER_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeOffer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "TradeOfferCards" (
    "uuid" TEXT NOT NULL,
    "action" "TRADE_ACTION" NOT NULL,
    "card" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tradeOfferUuid" TEXT,

    CONSTRAINT "TradeOfferCards_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_username_key" ON "Clients"("username");

-- AddForeignKey
ALTER TABLE "LogRequests" ADD CONSTRAINT "LogRequests_clientsUuid_fkey" FOREIGN KEY ("clientsUuid") REFERENCES "Clients"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsCards" ADD CONSTRAINT "ClientsCards_clientsUuid_fkey" FOREIGN KEY ("clientsUuid") REFERENCES "Clients"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOffer" ADD CONSTRAINT "TradeOffer_sender_fkey" FOREIGN KEY ("sender") REFERENCES "Clients"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOffer" ADD CONSTRAINT "TradeOffer_reciever_fkey" FOREIGN KEY ("reciever") REFERENCES "Clients"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeOfferCards" ADD CONSTRAINT "TradeOfferCards_tradeOfferUuid_fkey" FOREIGN KEY ("tradeOfferUuid") REFERENCES "TradeOffer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
