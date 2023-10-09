-- CreateTable
CREATE TABLE "niveis" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "niveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desenvolvedores" (
    "id" SERIAL NOT NULL,
    "nivel_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,

    CONSTRAINT "desenvolvedores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "desenvolvedores" ADD CONSTRAINT "desenvolvedores_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "niveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
