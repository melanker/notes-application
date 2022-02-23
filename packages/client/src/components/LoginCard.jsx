import React from 'react';
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";

const LoginCard = ({onSubmit, errors, submitText}) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(event);
    }

    return (
        <Card sx={{height: "400px", width: "300px", display: "flex", flexDirection: "column"}} variant={"outlined"}>
            <CardContent sx={{display: "flex", flex: "1"}}>
                <form onSubmit={handleSubmit}>
                    <TextField sx={{width: "250px", marginBottom: "30px" }}
                               name="email"
                               label="Email"
                               required={true}
                               error={!!errors?.email}
                               helperText={errors?.email}/>
                    <TextField sx={{width: "250px"}}
                               name="password"
                               label="Password"
                               type="password"
                               required={true}
                               error={!!errors?.password}
                               helperText={errors?.password}/>
                </form>
            </CardContent>
            <CardActions><Button type="submit">{submitText}</Button></CardActions>
        </Card>
    );
};

export default LoginCard;
