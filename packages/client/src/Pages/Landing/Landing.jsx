import React from 'react';
import Lottie from 'react-lottie';
import animation from '../../assets/get-things-done.json'
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const commonDefaults = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sx={{alignItems: "center", display: 'flex'}}>
                <Lottie options={commonDefaults}
                        height={500}
                        width={500}
                />
            </Grid>
            <Grid item xs={6} sx={{alignItems: "center", display: 'flex'}}>
                <Button onClick={() => navigate('/notes')}
                        color="error">Enter Notes</Button>
            </Grid>
        </Grid>
    )
        ;
};

export default Landing;
