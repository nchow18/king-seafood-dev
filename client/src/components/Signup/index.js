import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function SignUp() {
    const [formData, setUserFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await addUser({
                variables: { input: {...formData}}
            })


            Auth.login(data.addUser.token)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex-c-column">

                    <form onSubmit={handleFormSubmit} className="flex-c-column form-container night-bg">
                    SIGN UP
                        <input 
                            value={formData.first_name} 
                            onChange={handleInputChange} 
                            className="form-input-width" 
                            name="first_name" 
                            placeholder="FIRST NAME"/>
                        <input 
                            value={formData.last_name} 
                            onChange={handleInputChange} 
                            className="form-input-width" 
                            name="last_name" 
                            placeholder="LAST NAME"/>
                        <input 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className="form-input-width" 
                            name="email" 
                            placeholder="EMAIL"/>
                        <input 
                            value={formData.password} 
                            onChange={handleInputChange} 
                            type="password"  
                            className="form-input-width" 
                            name="password" 
                            placeholder="PASSWORD"/>
                        {
                            error ? <div>
                                <p className="error-text" >The provided credentials are incorrect</p>
                            </div> : null
                        }
                        <button disabled={!(formData.email && formData.password && formData.first_name && formData.last_name)} className="form-input-width" type="submit">SIGN IN</button>
                    </form>
            </div>
        </>
    )
}

export default SignUp;