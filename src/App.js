import React, { useState, useEffect } from 'react';
import AddNoteForm from './components/AddNoteForm';
import Footer from './components/Footer';
import Notes from './components/Notes';
import Notification from './components/Notification';
import ToggleShowNotes from './components/ToggleShowNotes';
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }

    useEffect(hook, [])

    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        noteService.create(noteObject)
            .then(createNote => {
                setNotes(notes.concat(createNote))
                setNewNote('')
            })
    }

    const handleNoteChange = event => {
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote)
            .then(updateNote => {
                setNotes(notes.map(n => n.id !== id ? n : updateNote))
            }).catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <ToggleShowNotes handleOnClick={() => setShowAll(!showAll)} showAll={showAll} />
            <Notes showAll={showAll} notes={notes} toggleImportance={toggleImportanceOf} />
            <AddNoteForm handleOnSubmit={addNote} handleOnChange={handleNoteChange} value={newNote}/>
            <Footer />
        </div>
    )
}

export default App