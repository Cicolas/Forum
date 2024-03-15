# Forum Server

## Config

### Prerequisites

- Connect to MySQL database
- Install Maven CLI

### Environment Variables

- Replace `.env.example` in `main/java/` by `.env`.
- Set a JWT generation secret.

### ORM with Hibernate

- Using JPA standard, you must replace `persistence.example.xml` in `resources/META-INF/`
  by removing .example extension and changing connection properties – url, user and password – to your own.

### Migrations with Flyway

- Replace `flyway.example.conf` in root using the same process listed in the previous section.
- To get the current state of the database, run `mvn flyway:migrate` on terminal in `server` directory.
- Insert the first administrator manually, by creating a `member` account and associating it with the `admin` role.

## Endpoints

> On restricted routes, which require roles, the client must enter a JWT in bearer authentication.

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
