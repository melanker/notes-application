import Notes from "./Pages/Notes/Notes";
import {Route, Routes} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Landing from "./Pages/Landing/Landing";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {verifyToken} from "./features/userSlice";
import Header from "./components/Header";
import styled from "@emotion/styled";

const AppContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`

const Content = styled('div')`
  display: flex;
  flex: 1;
  overflow: auto;
`

function App() {
    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(verifyToken())
    }, [])

    return (
        <AppContainer>
            <Header email={email}/>
            <Content>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/notes" element={<Notes/>}/>
                    <Route path="/signup" element={<Login  mode="signup" />}/>
                    <Route path="/login" element={<Login mode="login"/>}/>
                </Routes>
            </Content>
        </AppContainer>
    );
}

export default App;
