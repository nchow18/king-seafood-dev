import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN } from '../../utils/mutations';

function Login() {
    const [formData, setUserFormData] = useState({ email: '', password: '' })
    const [login, { error } ] = useMutation(LOGIN)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData.email, formData.password)

        try {
            const { data } = await login({
                variables: {...formData}
            })
            Auth.login(data.login.token)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex-c-column">
                <form 
                onSubmit={handleFormSubmit} 
                className="flex-c-column form-container night-bg">
                    SIGN IN
                    <input 
                        onChange={handleInputChange} 
                        value={formData.email} 
                        className="form-input-width" 
                        name="email" 
                        placeholder="EMAIL">
                    </input>
                    <input 
                        onChange={handleInputChange} 
                        value={formData.password} 
                        className="form-input-width" 
                        type="password"
                        name="password" 
                        placeholder="PASSWORD">
                    </input>
                        {
                        error ? <div>
                            <p className="error-text" >The provided credentials are incorrect</p>
                        </div> : null
                        }
                    <button 
                        disabled={!(formData.email && formData.password)}
                        onChange={handleInputChange} 
                        className="form-input-width" 
                        type="submit"
                        variant="success"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;