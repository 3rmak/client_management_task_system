import React from "react";
import {Link} from "react-router-dom";

import { setTaskPriorityStyle } from '../../helpers/taskPriorityStyle';

export const TaskListItem = ({ item, handleRemove, checked, setChecked }) => {
    const liClassName = ['align-middle', 'list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', item.status ? 'list-group-item-warning' : 'list-group-item-secondary'];

    function handleCheckbox({target}) {
        if(!target.checked && checked.includes(item._id)) {
            target.removeAttribute('checked');
            target.parentNode.style.textDecoration = "";
            setChecked(checked.filter((i) => i._id !== item._id));
        } else {
            target.setAttribute('checked', true);
            target.parentNode.style.textDecoration = "line-through";
            setChecked([...checked, item]);
        }
    }

    return(
        <div className='taskListItem'>
            <div className="align-middle form-check col">
                <input className="form-check-input" type="checkbox" onClick={handleCheckbox} />
            </div>
            <li
                className={liClassName.join(' ')}
                key={item._id}
            >
                <Link to={{
                    pathname: `/tasks/${item._id}`,
                    state: {
                        task: item
                    }
                }}
                   key={item._id}
                >
                    <div className="ms-2 me-auto">{item.title}</div>
                </Link>
                <span
                    className="badge rounded-pill align-self-center"
                    style={setTaskPriorityStyle(item)}
                >
                    Severity {item.priority}
                </span>
            </li>
            <table className='taskOptions'>
                <tr>
                    <Link to={{
                        pathname: `/tasks/${item._id}`,
                        state: {
                            task: item,
                            edit: true
                        }
                    }}>Edit</Link>
                </tr>
                <tr>
                    <span className='removeButton' onClick={() => handleRemove(item._id)}>Remove</span>
                </tr>
            </table>
        </div>
    )
}
