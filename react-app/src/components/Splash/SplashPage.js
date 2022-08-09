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
        return <Redirect to="/jokes" />
    }

    return (
        <>
            <div className='SplashWholePage'>
                <div className='SplashNoFoot'>
                    <div className='SplashLeft'>
                        <img className='SplashImage' src='https://www.wired.com/wp-content/uploads/2016/11/DaveChappelleNetflix-1.jpg' alt='standup' />
                    </div>
                    <div className='SplashRight'>
                        <div className='SplashIconContainer'>
                            <img className='SplashIcon' src='https://i.imgur.com/IRQ5Wrh.png' alt="icon"></img>
                        </div>
                        <p className='SplashSlogan'>Joking now</p>
                        <p className='SplashText'>Join Joker today</p>
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
                </div>
                <div>
                <footer className='SplashFooter'>
                    <p>Footer</p>
                </footer>
                </div>
            </div>
        </>
    )
}

export default SplashPage;
