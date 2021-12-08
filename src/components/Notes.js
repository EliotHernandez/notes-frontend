import React from 'react';
import Note from './Note';

const Notes = ({ notes, showAll, toggleImportance }) => {

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <ul>
            {notesToShow.map(note => (
                <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
            ))}
        </ul>
    )
}

export default Notes