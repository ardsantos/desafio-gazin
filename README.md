# Developer Management App

Este projeto é uma ferramenta de gerenciamento de Desenvolvedores e Níveis de Senioridade. Confeccionado como desafio técnico fullstack para Gazin Tech.

# Tabela de conteúdos

<!--ts-->

- [Features](#Features)
- [Pré-Requisitos](#pre-requisitos)
- [Rodando o Projeto (API)](<#rodando-o-projeto-(api)>)
- [Rodando o Projeto (WEB)](<#rodando-o-projeto-(web)>)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Considerações](#consideracoes)
- [Autor](#autor)
<!--te-->

### Features

- [x] CRUD de Níveis
- [x] CRUD de Desenvolvedores

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

### Rodando o Projeto (API)

1. Clone este repositório

```sh
git clone https://github.com/ardsantos/desafio-gazin.git
```

2. Acesse a pasta do projeto no terminal/cmd

```sh
cd desafio-gazin
```

3. Instale as dependências da api

```sh
cd api
yarn
```

4. Suba localmente o docker do banco de dados

```sh
cd docker
docker-compose up -d
```

5. Aplique todas as migrations

```sh
cd ..
yarn prisma migrate dev
```

6. Execute a aplicação em modo de desenvolvimento

```sh
yarn start:dev
```

### Rodando o Projeto (WEB)

Considerando que o projeto já tenha sido clonado na etapa anterior, abra outro terminal simultaneamente e acesse novamente o diretório raiz do projeto. Após isso, siga os passos abaixo:

1. Instale as dependências do frontend

```sh
cd web
yarn
```

2. Execute a aplicação em modo de desenvolvimento

```sh
yarn dev
```

O servidor inciará na porta 5173 - acesse <http://localhost:5173/>

### Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Vite](https://vitejs.dev/)
- [React](https://pt-br.reactjs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

### Considerações

- Para o requisito "Impedir que um nível seja removido quando houver um (ou mais) desenvolvedor(es) associado a este", foi utilizado o código 400 (Bad Request) por enquadrar-se melhor ao requisito.

### Autor

Antônio Roberto dos Santos

[![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/ardsan/)](https://www.linkedin.com/in/ardsan/)
