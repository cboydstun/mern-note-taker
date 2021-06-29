const Note = require('../models/Note');
const notesCtrl = {}

notesCtrl.getNotes = async (req,res)=>{
    const notes = await Note.find();
    res.json({notes:notes});
}

notesCtrl.getNote = async (req,res)=>{
    const note = await Note.findById(req.params.id);
    res.json({note:note});
}

notesCtrl.createNote = async (req,res)=>{
    const {author,title,content,priority} = req.body;
    const newNote = new Note({
        author,title,content,priority
    });
    newNote.save()
    res.json({messages:'New Note saved Successfully'})
}

notesCtrl.deleteNote = async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    res.status(200).json('Note deleted successfully')
}

notesCtrl.updateNote = async(req,res)=>{
    const {author,title,content,priority} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{
        author,title,content,priority
    })
    res.status(200).json({message:'Note updated successfully'})
}

module.exports = notesCtrl;