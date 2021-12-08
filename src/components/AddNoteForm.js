import React from 'react';

const AddNoteForm = ({ handleOnSubmit, handleOnChange, newNote }) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <input value={newNote} onChange={handleOnChange} />
            <button>Save</button>
        </form>
    )
}

export default AddNoteForm