import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {userRegister} from "../../../api/api";
import Header from "../../../components/Header/Header";
import {TextField} from "@shopify/polaris"
import {useHistory} from "react-router";
import {pattern} from "../../../constants/constants";
import styles from "./Registration.module.css";
import axios from "axios";
import {useForm} from "react-hook-form";

const Registration = props => {
    const history = useHistory();

    const {handleSubmit} = useForm();

    // declare states
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        errors: {
            name:"",
            email:"",
            password: "",
        }
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const redirectToWelcome = () => {
        history.push('/welcome');
    }

    const handleChangeName = useCallback((newValue) => setName(newValue), []);
    const handleChangeEmail = useCallback((newValue) => setEmail(newValue), []);
    const handleChangePassword = useCallback((newValue) => setPassword(newValue), []);


    const handleFormSubmit = async () => {
        try {
            console.log("Entered form block")
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            const result = await axios.post("http://localhost:8000/api/user/register", formdata);
            redirectToWelcome();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-5 hv-center mx-auto d-block">
            <Header name="Register" />
            <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    {/*<label htmlFor="Input Name">Your Full Name</label>*/}
                    <TextField
                        id="name"
                        label="Name"
                        value={name}
                        onChange={handleChangeName}
                        type="text"
                        // error={true}
                    />
                    <div className={styles.errorMsg}>{state.errors.name}</div>
                </div>
                <div className="form-group text-left email mt-3">
                    <TextField
                        // focused={true}
                        id="email"
                        label="Email"
                        value={email}
                        onChange={handleChangeEmail}
                        type="text"
                    />
                    <small id="emailHelp" className="form-text text-muted ">Your Email is at Safe </small>
                    <div className={styles.errorMsg}>{state.errors.email}</div>
                </div>
                <div className="form-group text-left mt-3">
                    <TextField
                        // focused={true}
                        id="password"
                        label="password"
                        value={password}
                        onChange={handleChangePassword}
                        type="password"
                    />
                    <div className={styles.errorMsg}>{state.errors.password}</div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mb-3"
                >
                    Register
                </button>
            </form>
        </div>
    );};

Registration.propTypes = {
    
};

export default Registration;