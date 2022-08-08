import "./DemoUser.css";
import React from 'react'
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";

const DemoUser = () => {
    const dispatch = useDispatch();

    const loginDemo = (e) => {
        e.preventDefault();
        const email = "demo@aa.io";
        const password = "password";

        return dispatch(sessionActions.login(email, password));
    }
    return (
        <button onClick={loginDemo}>
            <p>Sign in as a demo user.</p>
        </button>
    )
}

export default DemoUser;
