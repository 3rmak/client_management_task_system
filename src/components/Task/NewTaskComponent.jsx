import React, { useState } from 'react';

import { create } from '../../api/task.api';

import './Task.css';

export const NewTaskComponent = () => {
    const initialEmptyForm = {
        title: '',
        description: '',
        dueDate: new Date(),
        priority: 0
    };

    const [taskForm, setTaskForm] = useState(initialEmptyForm);

    async function handleCreate(e) {
     try {
         e.preventDefault();

         e.target.disabled=true;
         const response = await create(taskForm);
         e.target.disabled=false;

         if (response && response._id) {
             alert('Created');
             return setTaskForm(initialEmptyForm);
         }
         alert('Error while creating')
     } catch (e) {
         alert(e);
     }
    }
    return (
        <div className='container'>
            <form className='taskCreateContainer'>
                <div className="mb-3">
                    <label htmlFor="createFormTitle" className="form-label">Title</label>
                    <input
                        className='form-control'
                        id='createFormTitle'
                        type='text'
                        value={taskForm.title}
                        onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="createFormDescription" className="form-label">Description</label>
                    <input
                        className='form-control'
                        id='createFormDescription'
                        type='text'
                        value={taskForm.description}
                        onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="createFormDueDate" className="form-label">Due Date</label>
                    <input
                        className='form-control'
                        id='createFormDueDate'
                        type='date'
                        onChange={(e) => {
                            console.log(e.target.value)
                            setTaskForm({...taskForm, dueDate: new Date(e.target.value)})
                            console.log(taskForm)
                        }
                        }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="createFormPriority" className="form-label">Priority</label>
                    <input
                        className='form-control'
                        id="createFormPriority"
                        type='number'
                        value={taskForm.priority}
                        onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-success' onClick={handleCreate}>Create Task</button>
                </div>
            </form>
        </div>
    );
}
