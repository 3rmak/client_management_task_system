import { BACKEND_IP_ADDRESS } from '../configs/frontDeploy'
import methods from '../configs/enum/requestMethods.enum';

export const request = async (apiURL, method=methods.GET, data=null, token_type='access') => {
  try {
    const baseURL = `${BACKEND_IP_ADDRESS}`;
    const token = token_type === 'access' ?
        localStorage.getItem('access_token') :
        localStorage.getItem('refresh_token');
    console.log(token);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600',
      'Authorization': token,
    }
    const mode = 'cors'
    const body = data ? JSON.stringify(data) : null;

    console.log(`${baseURL}${apiURL}`);
    const response = await fetch(`${baseURL}${apiURL}`, {
      method,
      mode,
      headers,
      body
    })

    return response.json();
  } catch (e) {
    throw new Error(`custom request error ${e.message}`);
  }
}
