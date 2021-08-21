import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/apiConstants";

export const adminRegister = async (state, setState, err) => {

    const paylaod = {
        "name": state.name,
        "email": state.email,
        "password": state.password,
    };

    try {
        // invoke api
        const response = await axios.post(`${API_BASE_URL}admin/register`, paylaod, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })

        if (response.status != 201) return response.toJSON();

        setState(prevState => ({
            ...prevState,
            'successMsg': "Registration Successful! Redirecting to Home..."
        }));

        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem('id', response.data.data.id);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('email', response.data.data.email);

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export const userRegister = async (state, setState, err) => {

    const paylaod = {
        "name": state.name,
        "email": state.email,
        "password": state.password,
    };

    try {
        // invoke api
        const response = await axios.post(`${API_BASE_URL}user/register`, paylaod, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })

        if (response.status != 201) return response.toJSON();

        setState(prevState => ({
            ...prevState,
            'successMsg': "Registration Successful! Redirecting to Home..."
        }));

        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem('id', response.data.data.id);
        localStorage.setItem('name', response.data.data.name);
        localStorage.setItem('email', response.data.data.email);

        return response.data

    } catch (err) {
        console.log(err)
    }

}
