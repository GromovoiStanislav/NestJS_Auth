## NestJS Authentication with JWT access token and refresh token (+Prisma, tests)

```
npm install --save @nestjs/passport @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
npm i argon2
```

## Prisma

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma init --datasource-provider sqlite
npx prisma migrate dev
npx prisma migrate dev --name init
```