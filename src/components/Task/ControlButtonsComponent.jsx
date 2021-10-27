import React from 'react';

import './Task.css';

const ControlButtonsComponent = ({
                                     setCheckedAsCompleted,
                                     setCheckedAsActive,
                                     removeChecked,
                                     checked,
                                     activeTasks,
                                     completedTasks
}) => {
    return (
        <div className='fixedButtons'>
            <button
                className='btn btn-success col'
                onClick={() => setCheckedAsCompleted(activeTasks)}
            >
                Check All
            </button>
            <button
                className='btn btn-outline-success col'
                onClick={() => setCheckedAsCompleted(checked)}
            >
                Check selected
            </button>
            <button
                className='btn btn-primary col'
                onClick={() => setCheckedAsActive(completedTasks)}
            >
                Uncheck All
            </button>
            <button
                className='btn btn-outline-primary col'
                onClick={() => setCheckedAsActive(checked)}
            >
                Uncheck selected
            </button>
            <button
                className='btn btn-danger col'
                onClick={() => removeChecked(checked)}
            >
                Delete marked
            </button>
        </div>
    );
};

export default ControlButtonsComponent;
