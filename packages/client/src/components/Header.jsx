import React from 'react';
import {Button} from "@mui/material";
import styled from "@emotion/styled"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../features/userSlice";

const Container = styled('div')`
  flex-basis: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const Title = styled('div')`
  flex: 9;
  font-size: 22px;
  font-weight: 300;
`

const ButtonItem = styled(Button)`
  flex: 1
`

const Header = ({email}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (url) => {
        if (url === "logout") {
            dispatch(logoutUser());
            navigate("");
        } else {
            navigate(url);
        }
    }

    return (
        <Container>
            <Title>Notes Application</Title>
            {email && <ButtonItem onClick={() => handleClick('logout')} color="error">Logout</ButtonItem>}
            {!email && <ButtonItem onClick={() => handleClick('login')}
                                   color="error"
            >Login</ButtonItem>}
            <ButtonItem variant="contained"
                        onClick={() => handleClick('signup')}
                        color="error"
            >Signup</ButtonItem>
        </Container>
    );
};

export default Header;
