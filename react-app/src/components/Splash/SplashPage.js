import React from 'react';
import SplashSignupModal from "./SplashSignupModal";
import SplashLoginModal from './SplashLoginModal';
import DemoUser from '../auth/DemoUser/DemoUser';
import './SplashPage.css';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SplashPage = () => {
    const user = useSelector(state => state.session.user)

    if (user) {
        return (<Redirect top="/" />)
    }

    return (
        <div className='SplashWholePage'>
            <div className='SplashNoFoot'>
                <div className='SplashLeft'>
                </div>
                <div className='SplashRight'>
                    <h1>Joking now</h1>
                    <p>Join Joker today</p>
                </div>
                <div className='SplashSignupContainer'>
                    <DemoUser />
                    <div>
                        <p>or</p>
                    </div>
                    <SplashSignupModal />
                </div>
                <div className='SplashLoginContainer'>
                    <p>Already have an account?</p>
                    <SplashLoginModal />
                </div>
            </div>
            <footer className='SplashFooter'>
                <p>Footer</p>
            </footer>
        </div>
    )
}

export default SplashPage;
