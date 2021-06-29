//import middleware
const router = require('express').Router();

//import models
const Note = require('../models/Note')

//@POST - /api/notes/ - create new note - Public
router.post("/", async(req, res)=>{
    try {
    const {author,title,content,priority,date} = req.body;

    const newNote = new Note({
        author,title,content,priority,date
    });

    newNote.save()

    res.json({messages:'New Note saved Successfully'})        
    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
})

//@GET - /api/notes/ - get all notes - public
router.get("/", async(req, res)=>{
    try {
        const notes = await Note.find();
        res.json({notes:notes});
    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
})

//@GET - /api/notes/:id - get note by ID - Public
router.get("/:id", async(req, res)=>{
    try {
        const note = await Note.findById(req.params.id);
        res.json({note:note});
    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
})

//@PUT - /api/notes/:id - update note by ID - Public
router.put("/:id", async(req, res)=>{
    try {
        const {author,title,content,priority,date} = req.body;
        await Note.findByIdAndUpdate(req.params.id,{
            author,title,content,priority,date
        })
        res.status(200).json({message:'Note updated successfully'})        
    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
})

//@DELETE - /api/notes/:id - delete note by ID - Public
router.delete("/:id", async(req, res)=>{
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json('Note deleted successfully')
    } catch (error) {
        return res.status(500).json({
            error: "Server Error"
        })
    }
})

module.exports = router;