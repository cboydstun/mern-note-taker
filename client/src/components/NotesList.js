import React,{useEffect,useContext} from 'react';
import NoteContext from '../context/Notes/NoteContext';
import {format} from 'timeago.js'
import axios from 'axios';

const NotesList =()=>{

    const {notes,getNotes,idNoteSelected,editingState} = useContext(NoteContext);

    useEffect(()=>{
        getNotes();
    },[]);

    const deleteNote = async (id)=>{
        await axios.delete('/api/notes/'+id);
        getNotes();
    }

    const editNote=(id)=>{
        editingState(true);
        idNoteSelected(id);
    }

    return(
        <div className="row">
            {
                notes.map(note=>(
                    <div className="col-md-4 p-2" key={note._id}>
                        <div className="card rounded border-info shadow-lg">
                                <div className="card-header border-info">
                                    <div className="d-flex justify-content-between">
                                        <h4>Note</h4>
                                        <div>
                                            <a onClick={()=>editNote(note._id)}><i className="fas fa-edit ml-2"></i></a>
                                            <a onClick={()=>deleteNote(note._id)}><i className="fas fa-trash ml-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h2>{note.title}</h2>
                                    <p className="font-italic">{note.content}</p>
                                    {
                                        note.priority==='Medium'?
                                        <p className="font-weight-bold text-warning">priority: {note.priority}</p>
                                        :(note.priority==='Low'?
                                            <p className="font-weight-bold text-info">priority: {note.priority}</p>
                                        :<p className="font-weight-bold text-danger">priority: {note.priority}</p>)
                                    }
                                    <h6>by: {note.author}</h6>
                                </div>
                                <div className="card-footer">
                                    <p>{format(note.date)}</p>
                                </div>
                            </div>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default NotesList;