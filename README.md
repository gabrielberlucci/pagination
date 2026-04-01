# Cursor-Based Pagination API

Uma API RESTful desenvolvida para leitura e processamento eficiente de logs extensos de banco de dados, utilizando o padrão de **Paginação por Cursores (Cursor-Based Pagination)**.

Este projeto foi construído para resolver o problema clássico de degradação de performance do `OFFSET` tradicional em tabelas com milhões de registros, garantindo consultas rápidas e consistentes.

## Tecnologias Utilizadas

O ecossistema do projeto foi escolhido focando em performance, tipagem estrita e manutenibilidade:

- **[Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)**: Construção do servidor e roteamento.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática rigorosa para maior previsibilidade de erros em tempo de desenvolvimento.
- **[Prisma ORM](https://www.prisma.io/)**: Modelagem do banco de dados, migrações e consultas tipadas e seguras.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional robusto para armazenamento dos logs.

## Arquitetura do Projeto

- `/server`: Back-end.
- `/web`: Front-end.

## Como Rodar Localmente

Certifique-se de ter o **Node.js** e o **PostgreSQL** instalados na sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/gabrielberlucci/pagination](https://github.com/gabrielberlucci/pagination)
   cd pagination
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure as Variáveis de Ambiente:**
   ```json
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
   PORT=3000
   ```
4. **Prisma Migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o servidor(web/server):**
   ```bash
   pnpm run dev
   ```

## Exemplo de Uso

GET /logs
Retorna uma lista paginada de logs.

Query Parameters:

- id (opcional): Quantidade de itens por página (Padrão: 50).

Requisição (Primeira Página):
GET http://localhost:3000/logs?limit=5

**Resposta de Sucesso (200 OK):**

```json
{
  "logsMessage": [
    "lastCursor": 50,
    {
      "id": 1,
      "timestamp": "2026-03-01T18:56:19.042Z",
      "level": "INFO",
      "userID": 1253353431,
      "ipAddress": "192.177.228.92",
      "method": "PATCH",
      "endpoint": "DELETE",
      "message": "GET /api/user - 404 NOT FOUND"
    },
    {
      "id": 2,
      "timestamp": "2026-06-02T20:01:25.985Z",
      "level": "WARN",
      "userID": 425846182,
      "ipAddress": "92.65.54.75",
      "method": "PATCH",
      "endpoint": "PUT",
      "message": "POST /api/login - 403 UNAUTHORIZED"
    }
    // ... até 50 itens
  ],

}
```
