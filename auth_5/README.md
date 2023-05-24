## NestJS Authentication with JWT (+Prisma)

```
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/jwt
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
npm i bcrypt
npm i -D @types/bcrypt
```

## Prisma

```
npm i prisma -D
npm i @prisma/client
npx prisma init --datasource-provider sqlite
npx prisma migrate dev
npx prisma migrate dev --name init
```