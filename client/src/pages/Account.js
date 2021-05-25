import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_USER, UPDATE_ADDRESS } from '../utils/mutations';
import { USER } from '../utils/queries';
import { validateEmail } from '../utils/helpers'

function Profile() {

    const token = Auth.getProfile();
    const [errorMessage, setErrorMessage] = useState('');
    const {loading, data} = useQuery(USER, { variables: { user_id: token.data._id }})
    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const [updateAddress] = useMutation(UPDATE_ADDRESS);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        street_number: '',
        street_name: '',
        region: '',
        state: '',
        city: '',
        postal_code: '',
        email: '',
        phone: '',
        password: ''
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
        if (event.target.name === 'email') {
            const isValid = validateEmail(event.target.value);
            console.log(isValid);

            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                if (!event.target.value.length) {
                  setErrorMessage(`${event.target.name} is required.`);
                } else {
                  setErrorMessage('');
                }
              }
          } 

        if (!errorMessage) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        }

        console.log('errorMessage', errorMessage);
    }

    const user = data?.user || {};
    const address = user.address;

    if (token) {
        Auth.saveCart(user.cart);
    }

    console.log(user);
    console.log(address);

    const formHandler = e => {
        try {
            updateUser({ variables: {
                input: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                }
            }})

            updateAddress({ variables: {
                input: {
                    street_name: formData.street_name,
                    street_number: formData.street_number,
                    city: formData.city,
                    region: formData.region,
                    postal_code: formData.postal_code,
                    state: formData.state
                }
            }})
            alert('Account Updated');
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) return 'Loading...';
    if (error) return 'ERROR...';

    return (
        <>
    	    <div className="flex-c-column content">
                <form onSubmit={formHandler} className="flex-c-column form-container night-bg">
                        My Account
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.first_name} 
                                name="first_name" 
                                placeholder={user.first_name}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.last_name} 
                                name="last_name" 
                                placeholder={user.last_name}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.street_number} 
                                name="street_number" 
                                placeholder={address.street_number}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.street_name} 
                                name="street_name" 
                                placeholder={address.street_name}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.region} name="region" 
                                placeholder={address.region}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.postal_code} 
                                name="postal_code" 
                                placeholder={address.postal_code}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.city} name="city" 
                                placeholder={address.city}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.state} 
                                name="state" 
                                placeholder={address.state}></input>
                            <input 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.email} 
                                name="email" 
                                placeholder={user.email}></input>
                            <input 
                                type="password" 
                                className="form-input-width" 
                                onChange={handleInputChange} 
                                value={formData.password} 
                                name="password" 
                                placeholder='PASSWORD'></input>
                            {errorMessage && (
                                <div>
                                <p className="error-text">{errorMessage}</p>
                                </div>
                                )}
                            <button 
                                className="form-input-width" 
                                type="submit">Update Information</button>
                        </form>               
                </div>
        </>
    )
}

export default Profile;