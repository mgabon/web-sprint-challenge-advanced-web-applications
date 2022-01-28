import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const { push } = useHistory()
    const [cred, setCred] = useState({
        username: '',
        password: '',
        error: ''
    })

    const handleChange = (e) => {
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/login', cred)
            .then((resp) => {
                localStorage.setItem('token', resp.data.token);
                push('/view')
            })
            .catch((err) => {
                setCred(prev => {
                    return {
                        ...prev,
                        error: err.response.data.error
                    }
                })
            })
    }

    return (<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input onChange={handleChange} name="username" value={cred.username} type='text' id="username" />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input onChange={handleChange} name='password' value={cred.password} type='password' id="password" />
                </div>
                <button id='submit'>Submit</button>
                <p id='error'>{cred.error}</p>
            </form>

        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password". (DONE)
//2. Add in a p tag with the id="error" under the login form for use in error display. (DONE)
//3. Add in necessary local state to support login form and error display. (DONE)
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page. (DONE)
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```** (DONE)
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM. (DONE)

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
