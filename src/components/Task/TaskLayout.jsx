import React, { useEffect, useState } from 'react';

import { TaskListItem } from './TaskListItem';
import { LoadingComponent } from "../UI/LoadingComponent";

import { getAllTasks, patchById, remove } from '../../api/task.api';

import './Task.css';
import ControlButtonsComponent from "./ControlButtonsComponent";


export const TaskLayout = () => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [checked, setChecked] = useState([]);
    const [completedTaskStyle, setCompletedTaskStyle] = useState({
        visibility: 'hidden'
    });

    useEffect(() => initTasks(), []);
    useEffect(() => parseTasksByActive, [initTasks]);

    async function initTasks () {
        try {
            setLoading(true);
            const response = await getAllTasks();

            if (!response) {
                setTasks([]);
            } else if (response && response.message === 'Bad token') {
                setTasks([]);
            } else if (response) {
                setTasks(response);
            }
            setLoading(false);
        } catch (e) {
            alert(e.message);
        }
    }

    function parseTasksByActive () {
        const active = [];
        const completed = [];

        tasks.forEach((item) => {
            if(item.status) {
                active.push(item);
            } else if(!item.status) {
                completed.push(item);
            }
        });

        setActiveTasks(active);
        setCompletedTasks(completed);

        return {
            active,
            completed
        }
    }

    // ne znayu pochemu ne rabotaet
    function sortActiveTasksByCategory(type) {
        setActiveTasks([...activeTasks].sort((a,b) => a[type].localeCompare(b[type])));
        console.log(activeTasks);
    }

    async function handleRemove(taskId) {
        try {
            const response = await remove(taskId);

            if(response) {
                setTasks(tasks.filter((item) => item._id !== taskId));
            }
        } catch (e) {
            alert(e.message);
        }
    }

    function showCompletedTask() {
        if (completedTaskStyle.visibility === 'hidden') {
            setCompletedTaskStyle({visibility: 'visible'});
        } else {
            setCompletedTaskStyle({visibility: 'hidden'});
        }
    }

    function setCheckedAsCompleted(arr) {
        if(!arr.length){
            return (alert('Nothing to set'));
        }
        const requests = arr.map(item => patchById({...item, status: false }));
        Promise.all(requests)
            .then(() => alert('Done'))
            .then(() => initTasks())
            .catch(e => alert(e));
    }

    function setCheckedAsActive(arr) {
        if(!arr.length){
            return (alert('Nothing to set'));
        }
        const requests = arr.map(item => patchById({...item, status: true }));
        Promise.all(requests)
            .then(() => alert('Done'))
            .then(() => initTasks())
            .catch(e => alert(e));
    }

    function removeChecked() {
        const requests = checked.map(item => remove(item._id));
        Promise.all(requests)
            .then(() => alert('Done'))
            .then(() => initTasks())
            .catch(e => alert(e));
    }

    return (
        loading ?
                <LoadingComponent />
            :
            <div className='container mt-2'>
                <ControlButtonsComponent
                    setCheckedAsCompleted={ setCheckedAsCompleted }
                    setCheckedAsActive={ setCheckedAsActive }
                    removeChecked={ removeChecked }
                    checked = { checked }
                    activeTasks = { activeTasks }
                    completedTasks = { completedTasks }
                />
                <h3>List of tasks</h3>
                <div className='taskTableActive'>
                    <ul>
                        <select
                            className='form-select sortSelect'
                            onChange={(e) => sortActiveTasksByCategory(e.target.value)}
                        >
                            <option selected disabled>Sort By</option>
                            <option value='title'>Title</option>
                            <option value='priority'>Priority</option>
                        </select>
                        <div>
                            {activeTasks.map((item) => {
                                return (
                                    <TaskListItem
                                        item={ item }
                                        handleRemove={ handleRemove }
                                        checked={ checked }
                                        setChecked={ setChecked }
                                    />
                                )
                            })}
                        </div>
                    </ul>
                </div>
                <div className="row justify-content-center mt-5">
                    <button
                        className='btn btn-outline-secondary align-self-center col-4'
                        onClick={showCompletedTask}
                    >
                        {Object.keys(tasks).length ? 'Show completed tasks' : 'You have no tasks yet'}
                    </button>
                </div>

                <div className='taskTableCompleted mt-3' style={completedTaskStyle}>
                    <ul>
                        {completedTasks.map((item) => {
                            return (
                                <TaskListItem
                                    item={ item }
                                    handleRemove={ handleRemove }
                                    checked={ checked }
                                    setChecked={ setChecked }
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
    )

}
