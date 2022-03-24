import React, { useEffect, useState } from 'react';
import './homePage.css'
import porsche from '../../images/porsche.png'

export default function HomePage() {

    return (
        <div className='mainHomePage'>
            <div className='home-page-one'>
                <div className='home-page-one-logos'>
                    <div className='logo'>
                        <img className="logo-img" src={'https://1000logos.net/wp-content/uploads/2020/03/AMG-Logo.jpg'} alt='bmwlogo'/>
                    </div>
                    <div className='logo'>
                        <img className="logo-img" src={'https://www.carlogos.org/logo/BMW-M-logo-1920x1080.png'} alt='bmwlogo'/>
                    </div>
                    <div className='logo'>
                        <img className="logo-img" src={'https://www.gran-turismo.com/gtsport/decal/7349968051048022528_1.png'} alt='bmwlogo'/>
                    </div>
                    <div className='logo'>
                        <img className="logo-img" src={'https://i.pinimg.com/originals/71/22/9b/71229b4d078f7cce44afb17b71fd29dc.jpg'} alt='bmwlogo'/>
                    </div>
                </div>
                <div className='home-page-one-video-box'>
                    <div className='home-page-one-video'>
                        <img  className='hp-video' src={'https://i.pinimg.com/originals/9f/3a/90/9f3a90e6435960e6f26f99d52cfc0d77.jpg'}/>
                    </div>
                    <div className='home-page-one-video-text'>
                        <h2 className='welcome-text'>Welcome To</h2>
                        <h2 className='ab-text'>Auto Barn</h2>
                    </div>
                </div>
            </div>
            <div className='home-page-two'>
                <div className='home-page-two-car-image'>
                 <img className='hp-car-img' src={porsche} alt='car-top-img'/>
                </div>
                <div className='home-page-two-inner'>
                    <div className='home-page-two-btn-box'>
                        <button className='home-page-vehicles-btn'>View Vehicles for sale</button>
                    </div>
                    <div className='home-page-two-quote'>
                        <p className='home-page-quote-text'>We drive to feel alive</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
