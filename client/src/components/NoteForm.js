import React, {useContext,useEffect,useState} from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import NoteContext from '../context/Notes/NoteContext';
import 'react-datepicker/dist/react-datepicker.css';

const NoteForm =()=>{

    const {selectedNote,editing} = useContext(NoteContext);

    const state={
        title:'',
        author:'',
        content:'',
        priority:'',
        date:new Date(),
    }

    const [values, setValues] = useState(state)

    const handleInputChange =(e)=>{
        setValues({
            ...values,[e.target.name]:e.target.value
        })
        e.preventDefault();
    }

    const onChangeDate = (date)=>{
        setValues({...values,date})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newNote = {
            author:values.author,
            title:values.title,
            content:values.content,
            priority:values.priority,
            date:new Date(values.date)
        }
        console.log(newNote);
        if(editing){
            console.log('/api/notes/'+selectedNote);
            await axios.put('/api/notes/'+selectedNote,newNote);
        }else{
            await axios.post('/api/notes',newNote)
        }
        window.location.href='/'
    }

    const getNote= async(id)=>{
        const res = await axios.get('/api/notes/'+id)
        console.log(res);
        setValues({
            title:res.data.note.title,
            author:res.data.note.author,
            content:res.data.note.content,
            priority:res.data.note.priority,
            date:new Date(res.data.note.date)
        })
    }

    useEffect(()=>{
        if(editing){
            getNote(selectedNote)
        }
        else{
            setValues({...state})
        }
    },[editing,selectedNote])

    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <img src={logo} alt="App-logo" className="App-logo"/>
                <div className="form-group">
                        <input type="text" 
                            name="author"
                            value={values.author}
                            placeholder="Author"
                            onChange={e=>handleInputChange(e)}
                            className="form-control"
                            autoFocus/>
                </div>
                <div className="form-group">
                    <input type="text" 
                        name="title"
                        value={values.title}
                        placeholder="Title"
                        onChange={e=>handleInputChange(e)}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                    <textarea 
                            name="content" 
                            rows="5"
                            value={values.content}
                            onChange={e=>handleInputChange(e)}
                            className="form-control"
                            placeholder="Description"></textarea>
                </div>
                <div className="form-group">
                    <select name="priority"
                            value={values.priority}
                            onChange={e=>handleInputChange(e)}
                            className="form-control">
                        <option value="">Select Priority</option>                                
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="form-group">
                    <DatePicker
                        selected={values.date}
                        onChange={onChangeDate}
                        className="form-control"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <button type="submit"
                        className="btn btn-primary btn-block">{editing?'Update':'Save'}</button>
                </form>
            </div>
        </div>
    )
}

export default NoteForm;