import React, { useState } from 'react';
import { Redirect, useLocation} from 'react-router-dom';

import { patchById, remove } from '../../api/task.api';

import { setTaskPriorityStyle } from '../../helpers/taskPriorityStyle';

export const TaskComponent = () => {
    const location = useLocation();
    const { task, edit } = location.state;

    const [editMode, setEditMode] = useState(edit ? true : false);
    const [taskForm, setTaskForm] = useState({ ...task, dueDate: new Date(task.dueDate)});
    const [redirectStatus, setRedirectStatus] = useState(false);

    async function handleSaveChanges(e) {
        try {
            e.preventDefault();

            const response = await patchById(taskForm);

            if (!response) {
                return 0;
            }

            setTaskForm(response);
            setEditMode(false);
        } catch (e) {
            alert(e.message);
        }
    }

    function enterEditMode() {
        setEditMode(true);
    }

    function dateToYMD(date) {
        const onDate = new Date(date);
        const d = onDate.getDate();
        const m = onDate.getMonth() + 1; //Month from 0 to 11
        const y = onDate.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    async function handleRemove(taskId) {
        try {
            const response = await remove(taskId);

            if(response && response._id) {
                alert('success');
                setRedirectStatus(true);
            }
        } catch (e) {
            alert(e.message);
        }
    }

    return redirectStatus?
        <Redirect to='/main' /> :
        editMode ?
        <div className='container'>
            <form className='taskEditContainer' style={setTaskPriorityStyle(task)}>
                <div className="mb-3">
                    <label htmlFor="editFormTitle" className="form-label">Title</label>
                    <input
                        className='form-control'
                        id='editFormTitle'
                        type='text'
                        value={taskForm.title}
                        onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editFormDescription" className="form-label">Description</label>
                    <input
                        className='form-control'
                        id='editFormDescription'
                        type='text'
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editFormDueDate" className="form-label">Due Date</label>
                    <input
                        className='form-control'
                        id='editFormDueDate'
                        type='date'
                        value={dateToYMD(taskForm.dueDate)}
                        onChange={(e) => setTaskForm({...taskForm, dueDate: new Date(e.target.value)})
                        }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editFormPriority" className="form-label">Priority</label>
                    <input
                        className='form-control'
                        id='editFormPriority'
                        type='number'
                        value={taskForm.priority}
                        onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-success' onClick={handleSaveChanges}>Save changes</button>
                </div>
            </form>
        </div>
        :
        <div className='container'>
            <div className='row mt-5 taskContainer' style={setTaskPriorityStyle(taskForm)}>
                <h1 className='justify-content-center align-self-center'>{ taskForm.title }</h1>
                <p>Some description: { taskForm.description }</p>
                <p>Due date: { new Date(taskForm.dueDate).toLocaleString() }</p>
                <div className="row justify-content-evenly">
                    <button
                        className="btn btn-outline-secondary col-4"
                        onClick={enterEditMode}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger col-4"
                        onClick={() => handleRemove(taskForm._id)
                            }
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>;

}
