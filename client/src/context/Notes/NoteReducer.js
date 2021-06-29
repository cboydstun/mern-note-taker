import {GET_NOTES,
        GET_NOTE,
        EDITING} from '../types';

const NoteReducer = (state,action)=>{

    const {payload,type} = action;
    
    switch(type){
        case GET_NOTES:
            return{
                ...state,
                notes:payload
            };
        case GET_NOTE:
            return{
                ...state,
                selectedNote:payload
            };
        case EDITING:
            return{
                ...state,
                editing:payload
            }
        default:
            return state;
    }
}

export default NoteReducer;