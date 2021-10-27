import { refresh_token } from './auth.api'

import { request } from '../helpers/customRequest';

import methods from '../configs/enum/requestMethods.enum';
import taskNormalizator from "../helpers/taskNormalizator";

export const create = async (task) => {
    try {
        let response = await request(
            '/api/tasks/',
            methods.POST,
            taskNormalizator(task)
        );

        if(!response) {
            return null;
        }

        if (response.message === 'Expired') {
            await refresh_token();
            response = await create(task);
        }

        return response;

    } catch (e) {
        alert(e.message);
    }
}

export const getAllTasks = async () => {
    try {
        let response = await request('/api/tasks');

        console.log(response);

        if(!response) {
            return null;
        }

        if (response.message === 'Expired') {
            await refresh_token();

            response = await getAllTasks();
        }

        return response;
    } catch (e) {
        alert(e.message);
    }
}

export const getTaskById = async (taskId) => {
    try {
        let response = await request(
            `/api/tasks/${taskId}`
        );

        if(!response) {
            return null;
        }

        if (response.message === 'Expired') {
            await refresh_token();
            response = await getTaskById(taskId);
        }

        return response;

    } catch (e) {
        alert(e.message);
    }
}

export const patchById = async (task) => {
    try {
        const { _id } = task;
        let response = await request(
            `/api/tasks/${_id}`,
            methods.PATCH,
            taskNormalizator(task)
        );

        if(!response) {
            return null;
        }

        if (response.message === 'Expired') {
            await refresh_token();
            response = await patchById(task);
        }

        return response;

    } catch (e) {
        alert(e.message);
    }
}

export const remove = async (taskId) => {
    try {
        let response = await request(
            `/api/tasks/${taskId}`,
            methods.DELETE
        );

        if(!response) {
            return null;
        }

        if (response.message === 'Expired') {
            await refresh_token();
            response = await remove(taskId);
        }

        return response;

    } catch (e) {
        alert(e.message);
    }
}
