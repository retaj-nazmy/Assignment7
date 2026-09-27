import express,{json} from "express"
import { env } from "./config/env.service.js"
import { databaseConnection } from "./database/connection.js"
import userRouter from "./module/user/user.controller.js"
import noteRouter from "./module/note/note.controller.js"
const app = express()
app.use(json())

databaseConnection()
app.use('/users' , userRouter)
app.use('/notes',noteRouter)


app.listen(env.port , ()=>{
    console.log(`server is running on port ${env.port} `)
})