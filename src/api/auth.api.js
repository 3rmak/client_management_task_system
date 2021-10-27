import { request } from '../helpers/customRequest';

import methods from '../configs/enum/requestMethods.enum';

export const login = async (formData) => {
    try {
        const response = await request('/api/auth/signin', methods.POST, formData);

        if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem('updatedAt', response.updatedAt)

            return response;
        }

        return null;
    } catch (e) {
        alert(JSON.stringify(e.message));
    }
};

export const register = async (formData) => {
    try {
        const response = await request('/api/users', methods.POST, formData);

        if (response && response._id) {
            return response;
        }

        alert('Can\'t create user profile')
    } catch (e) {
        alert(JSON.stringify(e.message));
    }
}

export const logout = async () => {
    try {
        const response = await request(
            '/api/auth/signout',
            methods.POST
        );

        if (response) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('updatedAt');
        }
    } catch (e) {
        alert(JSON.stringify(e.message));
    }
};

export const refresh_token = async () => {
    try {
        const response = await request('/api/auth/refresh',
            methods.POST,
            null,
            'refresh'
        );

        if(response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('updatedAt', response.updatedAt)
        } else if (response.message === 'Expired') {
            await logout();
        }
    } catch (e) {
        alert(JSON.stringify(e.message));
    }
};
