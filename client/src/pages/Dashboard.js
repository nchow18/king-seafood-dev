import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AdminOrders from '../pages/AdminOrders';
import AdminProducts from '../pages/AdminProducts';
import AdminPromotions from '../pages/AdminPromotions';

function Dashboard() {

    const [dashLinks] = useState([
        {
            name: 'Products',
            href: '/admindashboard'
        },
        {
            name: 'Orders',
            href: '/admindashboard'
        },
        {
            name: 'Promotions',
            href: '/admindashboard'
        },
    ])

    const [currentDashLink, setCurrentDashLink] = useState(dashLinks[0])
    
    return (
        <>
            <DashboardHeader 
                dashLinks={dashLinks}
                currentDashLink={currentDashLink}
                setCurrentDashLink={setCurrentDashLink}
            />
            <div className="flex-c-column content">
                {currentDashLink.name === 'Products' && (
                    <>
                        <AdminProducts />
                    </>
                )}
                {currentDashLink.name === 'Orders' && (
                    <>
                        <AdminOrders />
                    </>
                )}
                {currentDashLink.name === 'Promotions' && (
                    <>
                        <AdminPromotions />
                    </>
                )}                
            </div>
        </>
    )
}

export default Dashboard;