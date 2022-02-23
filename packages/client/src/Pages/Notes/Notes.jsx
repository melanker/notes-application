import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteNote, getNotes, initNotes} from "../../features/notesSlice";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActionArea, CardActions, CardContent, styled, Typography} from "@mui/material";
import {nanoid} from "@reduxjs/toolkit";
import Note from "./components/Note";

const Container = styled('div')`
  flex: 1;
  display: grid;
  gap: 10px;
  min-width: 0;
  min-height: 0;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: 200px;
  justify-items: center;
`

const Notes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {notes, errors} = useSelector(state => state?.notes);

    useEffect(() => {
        if (errors?.includes('401')) {
            dispatch(initNotes('api/note'))
            navigate('login')
        }
    }, [dispatch, errors, navigate])

    useEffect(() => {
        dispatch(getNotes('api/note'))
    }, [dispatch])

    return (
        <Container>
            {notes?.map(({title, body, _id: noteId}) =>
                <Note key={noteId} body={body} title={title} noteId={noteId}/>
            )}
        </Container>
    );
};

export default Notes;
