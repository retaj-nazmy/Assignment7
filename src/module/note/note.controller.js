import {Router} from "express"
import { createNote, deleteAll, deleteNote, getByContent, getById, getNotesAggregated, getWithUser, pagination, replaceNote,  updateAll,  updateNote } from "./note.service.js"

const router = Router()

router.post('/',async(req,res)=>{
  let data = await createNote(req.query , req.body)
  res.json(data)
})

router.patch('/:noteId',async(req,res)=>{
  let data = await updateNote(req.params,req.query , req.body)
  res.json(data)
})

router.put('/replace/:noteId',async(req,res)=>{
  let data = await replaceNote(req.params,req.query , req.body)
  res.json(data)
})
router.put('/all',async(req,res)=>{
  let data = await updateAll(req.body, req.query)
  res.json(data)
})

router.delete("/:noteId",async(req,res)=>{
  let data = await deleteNote(req.params, req.query) 
  res.json(data)
})

router.get("/paginate-sort",async(req,res)=>{
    let data = await pagination( req.query) 
  res.json(data)
})
router.get("/note-by-content",async(req,res)=>{
    let data = await getByContent(  req.query) 
  res.json(data)
})
router.get("/note-with-user",async(req,res)=>{
    let data = await getWithUser(req.query) 
  res.json(data)
})
router.get("/aggregate",async(req,res)=>{
    let data = await getNotesAggregated(req.query) 
  res.json(data)
})

router.delete("/",async(req,res)=>{
    let data = await deleteAll(req.query) 
  res.json(data)
})


export default router