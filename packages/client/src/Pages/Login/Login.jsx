import React, {useEffect} from 'react';
import LoginCard from "../../components/LoginCard";
import {addUser, verifyToken} from "../../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {Card} from "@mui/material";

const Login = ({mode = "signup"}) => {
    const dispatch = useDispatch();
    const {userId, errors} = useSelector(state => state?.user);
    const navigate = useNavigate();
    const isLoginPage = mode === "login"

    const Container = styled('div')`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    `

    useEffect(() => {
        if (userId) {
            dispatch(verifyToken())
            navigate('/');
        }
    }, [navigate, userId])

    const handleSubmit = (event) => {
        const {email, password} = event.target.elements;
        const formData = {
            email: email.value,
            password: password.value
        };

        dispatch(addUser({body: formData, url: isLoginPage ? 'user/login' : 'user/signup'}));
    }

    return (
        <Container>
            <LoginCard errors={errors}
                       submitText={isLoginPage ? 'Login' : 'Signup'}
                       onSubmit={handleSubmit}/>

        </Container>
    );
};

export default Login;
