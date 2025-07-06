## Projeto
Esse projeto é para a disciplina de Arquitetura de Software da Faculdade, no momento encontra-se incompleto, contendo alguns problemas e bugs.

## Atenção
Tanto para o projeto `api` quanto para o `app` utilizei o node `v20.*`, então recomendo que faça o mesmo.

## Configurações iniciais - Siga passo a passo.
Instale o CLI do [Nest](https://docs.nestjs.com) na sua máquina:
- `npm i -g @nestjs/cli`

No projeto `api`, crie um arquivo `.env` na raiz do projeto, copie o conteúdo contido em `.env.example` e cole em `.env` e configure as variáveis de ambiente para o seu caso de teste local.

No projeto `app`, crie um arquivo `.env` na raiz do projeto, copie o conteúdo contido em `.env.example` e cole em `.env`

Tanto no projeto `api` quanto no `app`, execute `npm install`.

---
## Api (Back-End)
No projeto `api`, execute: `npm run db:init` para gerar as tabelas do banco de acordo com o que está contido em `schema.prisma`.
Após isso, execute `npm run start:dev` e a principio o projeto já é para ser executado tranquilamente.

## App (Front-End)
No projeto `app`, execute `npm run dev` e a principio o projeto já é para ser executado tranquilamente.