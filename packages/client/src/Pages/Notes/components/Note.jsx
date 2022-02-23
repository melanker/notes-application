import React, {memo} from 'react';
import {nanoid} from "@reduxjs/toolkit";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {deleteNote} from "../../../features/notesSlice";
import {useDispatch} from "react-redux";

const Note = ({title, body, noteId}) => {
    const dispatch = useDispatch();
    console.log("RENDER NOTE");

    return (
        <Card sx={{width: "200px", height: "200px", display: "flex", flexDirection: 'column'}} variant="outlined" key={nanoid()}>
            <CardContent sx={{flex: 1, overflow: "hidden"}}>
                <Typography gutterBottom variant="h5" noWrap title={title}>
                    {title}
                </Typography>
                <Typography variant="body2" gutterBottom component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => dispatch(deleteNote(noteId))} size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default memo(Note);
