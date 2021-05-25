import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PROMO } from '../utils/mutations';

function AdminPromotions() {

    const [updatePromo, { error }] = useMutation(UPDATE_PROMO);

    const [formData, setFormData] = useState({
        promoMsg1: '',
        promo1Start: '',
        promo1End: '',
        promoMsg2: '',
        promo2Start: '',
        promo2End: '',
        promoMsg3: '',
        promo3Start: '',
        promo3End: '',
        mainPromo: '',
        featuredProduct1: '',
        featuredProduct2: '',
        featuredProduct3: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const updatePromotions = async (event) => {
        try {
            updatePromo({
                variables: {
                    input: {
                        ...formData
                    },
                    promo_id: '60aade22b00f2b64a4d4f697'
                }
            })
            alert('Promotions Updated');
        } catch (e) {
            console.log(e);
        }
    }

    if (error) return `...ERROR`;

    return (
        <>
            <div className="flex-c-column order-container">
                <form onSubmit={updatePromotions} className="flex-c-column">
                    <div>
                        <b>HOME PAGE PROMO</b>
                        <div className="flex-start-row admin-input-width">
                            <b>MAIN PROMO</b>
                            <textarea  onChange={handleInputChange} name="mainPromo" value={formData.mainPromo}></textarea>
                        </div>
                    </div>

                    <div className="flex-start-row margin-2rem">
                        <div className="flex-start-column admin-input-width">
                            <b>Promotion 1</b>
                            <input onChange={handleInputChange} name="promoMsg1" value={formData.promoMsg1} />
                            <b>Promotion 1 - Start Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo1Start" value={formData.promo1Start} type="text" />
                            <b>Promotion 1 - End Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo1End" value={formData.promo1End} type="text" />
                        </div>
                        <div className="flex-start-row admin-input-width">
                            <b>Promotion 2</b>
                            <input onChange={handleInputChange} name="promoMsg2" value={formData.promoMsg2} />
                            <b>Promotion 2 - Start Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo2Start" value={formData.promo2Start} type="text" />
                            <b>Promotion 2 - End Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo2End" value={formData.promo2End} type="text" />
                        </div>
                        <div className="flex-start-row admin-input-width">
                            <b>Promotion 3</b>
                            <input  onChange={handleInputChange} name="promoMsg3" value={formData.promoMsg3} />
                            <b>Promotion 3 - Start Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo3Start" value={formData.promo3Start} type="text" />
                            <b>Promotion 3 - End Date</b>
                            <input onChange={handleInputChange} className="date-input-size" name="promo3End" value={formData.promo3End} type="text" />
                        </div>
                    </div>

                    <div className="flex-start-row">    
                        <div className="flex-start-row admin-input-width">
                            <b>Featured 1 Product ID</b>
                            <input onChange={handleInputChange} name="featuredProduct1" value={formData.featuredProduct1} />
                        </div>
                    </div>
                    <div className="flex-start-row">
                        <div className="flex-start-row admin-input-width">
                            <b>Featured 2 Product ID</b>
                            <input onChange={handleInputChange} name="featuredProduct2" value={formData.featuredProduct2} />
                        </div>
                    </div>
                    <div className="flex-start-row">
                        <div className="flex-start-row admin-input-width">
                            <b>Featured 3 Product ID</b>
                            <input type="text" onChange={handleInputChange} name="featuredProduct3" value={formData.featuredProduct3} />
                        </div>
                    </div>
                    <button type="submit" className="order-button">UPDATE</button>
                </form>
            </div>
        </>
    )
}

export default AdminPromotions;