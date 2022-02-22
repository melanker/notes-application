import React from 'react';
import {useDispatch} from "react-redux";
import LoginCard from "../../components/LoginCard";
import {addUser} from "../../features/userSlice";

const Signup = () => {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const { email, password } = event.target.elements
        const formData = {
            email: email.value,
            password: password.value
        }

        dispatch(addUser(formData))
    }

    return (
        <div>
            <LoginCard onSubmit={handleSubmit}/>
        </div>
    );
};

export default Signup;
