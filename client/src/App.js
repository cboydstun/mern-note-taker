import React from 'react'

//import Components
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

//import context
import NoteState from './context/Notes/NoteState';

//import stylesheet
import './App.css'

export default function App() {
  return (
    <div className="container mt-4">
      <NoteState>
        <div className="row">
          <div className="col-md-4">
            <NoteForm/>
          </div>
          <div className="col-md-8">
            <NotesList/>
          </div>
        </div>
      </NoteState>
    </div>
  );
}