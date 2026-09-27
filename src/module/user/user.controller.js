import {Router} from "express";
import { deleteUser, getById, login, signup, update } from "./user.service.js";

const router = Router()

 router.post('/signup' , async (req,res)=>{
  let data = await signup(req.body);
  res.json(data);
 })

 router.post('/login' ,async (req,res)=>{
    let data = await login(req.body)
    res.json(data);
 })

 router.patch("/:id" , async (req,res)=>{
    let data = await update(req.params , req.body)
    res.json(data);
 })

 router.delete('/', async (req,res)=>{
    let data = await deleteUser(req.query)
    res.json(data);
 })
 

 router.get("/", async (req,res)=>{
    let data = await getById(req.query)
    res.json(data)
 })

export default router;