import React, {useState} from 'react'

import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

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
    <div>
        <input placeholder='Email' onChange={ (e) => setData({...data, email: e.target.value})} />
        <input placeholder='Email' onChange={ (e) => setData({...data, password: e.target.value})} />
        <button onClick={register}>Регистрация</button>
        <button onClick={login}>Войти</button>
    </div>

  )

}

export default Login