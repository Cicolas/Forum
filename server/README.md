# Forum Server

## Configuração

### Pré-requisitos

- Inicie uma conexão com o MySQL
- Instale o Maven CLI

### ORM com Hibernate

- Defina a configuração do JPA ao substituir `persistence.example.xml` por `persistence.xml` em `resources/META-INF/`
  e alterar as propriedades da conexão – _url_, _user_ e _password_.

### Migrations com Flyway

- Substitua `flyway.example.conf` por `flyway.conf` na raiz do projeto preenchendo os mesmos dados da conexão.
- Execute `mvn flyway:migrate` com o terminal no diretório `server/`, para obter o estado atual do banco de dados.
- Insira o primeiro administrador manualmente, criando uma conta `member` e associando à função `admin`.

### Variáveis ​​ambiente

- Substitua `.env.example` em `main/java/` por `.env`.
- Defina um chave para a geração de tokens JWT.

## Estrutura

O servidor está organizado da seguinte forma:

```text
forum/
├─── endpoints/
├─── entities/
├─── exceptions/
├─── features/
├─── http/
├─── repositories/
├─── security/
├─── utils/
├─── views/
└─── Main.java
```

O núcleo do projeto é composto por entidades - `entities/` e funcionalidades - `features/`.
Cada funcionalidade do sistema é modularizada em um pacote, onde há casos de uso e controladores,
além de interfaces e injeções de dependência.

O acesso ao banco de dados é intermediada por repositórios - `repositories/`,
interfaces que abstraem uma unidade de persistência. A partir delas, implementa-se
uma conexão com o MySQL pelo uso do Hibernate como ORM.

## Endpoints

> Em rotas restritas, o cliente deve fornecer um token de autenticação.

| Endpoint                               | Required roles |
| -------------------------------------- | -------------- |
| Users                                  |                |
| `GET /users`                           |                |
| `POST /members`                        |                |
| `POST /admins`                         | `admin`        |
| `POST /login`                          |                |
| `PUT /users/:userId`                   | `member`       |
| `DELETE /users/:userId`                | `member`       |
| Categories                             |                |
| `GET /categories`                      |                |
| `POST /categories`                     | `admin`        |
| `PUT /categories/:categoryName`        | `admin`        |
| `DELETE /categories/:categoryName`     | `admin`        |
| Posts                                  |                |
| `GET /posts`                           |                |
| `GET /posts/:postId`                   |                |
| `POST /posts`                          | `member`       |
| `PUT /posts/:postId`                   | `member`       |
| `DELETE /posts/:postId`                | `member`       |
| Comments                               |                |
| `POST /comments`                       | `member`       |
| `PUT /comments/:commentId`             | `member`       |
| `DELETE /comments/:commentId`          | `member`       |
| Rankings                               |                |
| `PUT /ranking/:contributionId/:action` | `member`       |
| Permissions                            |                |
| `GET /permissions`                     | `admin`        |
| `POST /permissions`                    | `admin`        |
| `DELETE /permissions/:permissionName`  | `admin`        |
| Roles                                  |                |
| `GET /roles`                           | `admin`        |
| `POST /roles`                          | `admin`        |
| `DELETE /roles/:roleName`              | `admin`        |
