import dotenv from "dotenv"
import path from "node:path"

dotenv.config({path : path.resolve('./.env.dev')})

let port = process.env.PORT
let databaseURI = process.env.DATABASE_URI
let salt = process.env.SALT_ROUNDS

export const env = {
    port,
    databaseURI,
    salt
}