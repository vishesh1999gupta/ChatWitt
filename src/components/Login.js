import React , {useState} from 'react'
import { auth,provider } from '../firebase.js';
import './login.css';
import axios from './axios.js';
function Login(props) {
    
    let photoURL;
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(async (result)=> {
            // console.log(result)
            // props.setUser(result)     
        photoURL = result.user.photoURL
           await axios.post("/login",{
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: photoURL,
                roomList: []
            }).then(response => {
                // console.log({user: response.data,photoURL: photoURL})
                props.setUser({user: response.data,photoURL: photoURL});
            }
            )
        });   
    };


    return (
        <div className="login">
            <div className="login-container">
                <img src="https://cdn4.iconfinder.com/data/icons/sapphire-storm-1/32/color-web3-09-512.png" alt="" />
                <div className="login-text">
                    <h2>Sign in to WireChat</h2>
                </div>
                <button onClick={signIn}>Sign in with Google</button>
            </div>
        </div>
    )
}

export default Login