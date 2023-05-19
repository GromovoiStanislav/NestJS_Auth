import {DataSource} from "typeorm"
import 'dotenv/config'
import {join} from "node:path"


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [__dirname+"/migration/*.{ts,js}"],
    subscribers: [],
})

export default AppDataSource
