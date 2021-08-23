import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from "@shopify/polaris";
import axios from "axios";
import Header from "../Header/Header";
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import {ACCESS_TOKEN} from "../../constants/apiConstants";

const LoginForm = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {handleSubmit} = useForm();

    const history = useHistory();

    const redirectToHome = () => {
        history.push("home");
    }

    const handleChangeEmail = useCallback((newValue) => setEmail(newValue), []);
    const handleChangePassword = useCallback((newValue) => setPassword(newValue), []);

    const handleFormSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);
            const result = await axios.post("https://basmaku.herokuapp.com/api/admin/login", formdata, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(result);
            localStorage.setItem(ACCESS_TOKEN, result.data.token.access_token);
            if (result.status === 200) {
                history.push("/dashboard/home")
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="card col-12 col-lg-8 login-card mt-5 hv-center mx-auto d-block">
            <Header name="Login" />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mt-5">
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </div>
                <div className="mt-5">
                    <TextField
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </div>
                <div className="mt-5 mb-5">
                    <button type="submit" className="btn btn-success btn-lg mb-3 pl-5 pr-5 pt-3 pb-3">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    
};

export default LoginForm;