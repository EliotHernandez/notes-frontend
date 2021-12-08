import React from 'react';

const ToggleShowNotes = ({ handleOnClick, showAll }) => {
    return (
        <div>
            <button onClick={handleOnClick} >
                show {showAll ? 'important' : 'all'}
            </button>
        </div>
    )
}

export default ToggleShowNotes