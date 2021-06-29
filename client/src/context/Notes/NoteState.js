import React,{useReducer} from 'react';
import NoteContext from './NoteContext';
import NoteReducer from './NoteReducer';
import axios from 'axios';

import {GET_NOTES,GET_NOTE,EDITING} from '../types';

const NoteState = (props)=>{
    
    const initialState = {
        notes:[],
        selectedNote:null,
        editing:false
    }

    const [state, dispatch] = useReducer(NoteReducer, initialState);

    const getNotes = async()=>{
        const res = await axios.get('/api/notes');
        dispatch({type:GET_NOTES,payload:res.data.notes})
    }

    const idNoteSelected = async (id)=>{
        console.log(id);
        dispatch({type:GET_NOTE,payload:id})
    }

    const editingState = (value)=>{
        console.log(value);
        dispatch({type:EDITING,payload:value})
    }

    return(
        <NoteContext.Provider
            value={{
                notes:state.notes,
                selectedNote:state.selectedNote,
                editing:state.editing,
                getNotes,
                idNoteSelected,
                editingState
            }}>
                {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;