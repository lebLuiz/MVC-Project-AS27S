## Projeto
Esse projeto é para a disciplina de Arquitetura de Software da Faculdade, no momento encontra-se incompleto, contendo alguns problemas e bugs.

## Atenção
Nos projetos `api`, `app` e `email-service` utilizei o node `v20.*`, então recomendo que faça o mesmo.

## Configurações iniciais - Siga passo a passo.
Instale o CLI do [Nest](https://docs.nestjs.com) na sua máquina:
- `npm i -g @nestjs/cli`

No projeto `api`, crie um arquivo `.env` na raiz do projeto, copie o conteúdo contido em `.env.example` e cole em `.env` e configure as variáveis de ambiente para o seu caso de teste local.

No projeto `app`, crie um arquivo `.env` na raiz do projeto, copie o conteúdo contido em `.env.example` e cole em `.env`

No projeto `email-service`, crie um arquivo `.env` na raiz do projeto, copie o conteúdo contido em `.env.example` e cole em `.env`.
Altere as informações necessárias, principalmente na variável `EMAIL_USER` e `EMAIL_PASS`.

Acesse os projetos `api`, `app` e `email-service`, e execute `npm install`.

Eu utilizei o **Docker** para executar o **PostgreSQL** e o **RabbitMQ**, então recomendo que utilize-o também.
Para "subir" os serviços no docker, na raiz desse projeto execute: `docker compose up -d`

---
## Api (Back-End)
No projeto `api`, execute: `npm run db:init` para gerar as tabelas do banco de acordo com o que está contido em `schema.prisma`.
Após isso, execute `npm run start:dev` e a principio o projeto já é para ser executado tranquilamente.

## App (Front-End)
No projeto `app`, execute `npm run dev` e a principio o projeto já é para ser executado tranquilamente.

## EmailService (Consumidor RabbitMQ)
No projeto `email-service`, execute `npm run start` e a principio o projeto já é para ser executado tranquilamente.