## NestJS JWT API (TypeORM)

In this we create a DatabaseModule based on the TypeORM

```
npm i @nestjs/passport passport-local
npm i @types/passport-local -D
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt -D
npm i bcrypt
npm i -D @types/bcrypt
```

## TypeORM

```
npm run migration:generate
npx typeorm migration:create src/migration/insert-roles or npm run migration:create
npm run typeorm migration:run
```
