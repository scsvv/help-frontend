import React, {useState} from 'react'

import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { LoginStyled } from './styled';
import { Button } from '@mui/material';

const Login = ({user, setUser}) => {
  
    const [data, setData] = useState({email: "", password: ""})

    const register = async () => {
        try
        {
            const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
            console.log(user);
        } catch (error) {
            alert(error.message)
        }
    };

    const login = async () => {
        try
        {
            const user = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log(user);
        } catch (error) {
            alert(error.message)
        }
    };

    const logout  =  async () => {
        await signOut(auth)
    };
    
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    if (auth.currentUser ) {
        return (
            <button onClick={logout}>Log Out</button>
        )
    }

    return (
    <LoginStyled>
        <input placeholder='Почта' onChange={ (e) => setData({...data, email: e.target.value})} />
        <input placeholder='Пароль' onChange={ (e) => setData({...data, password: e.target.value})} />
        <div className='buttons-area'>
            {// <Button variant="contained" onClick={register}>Регистрация</Button>
            }
            <Button variant="contained" color="success" onClick={login}>Войти</Button>
        </div>
    </LoginStyled>

  )

}

export default Login

