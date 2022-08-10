import React from 'react';
import SplashSignupModal from "./SplashSignupModal";
import SplashLoginModal from './SplashLoginModal';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import DemoUser from '../auth/DemoUser/DemoUser';
import './SplashPage.css';
import { Redirect } from 'react-router-dom';
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
                    <div className='SplashRightContainer'>
                        <div className='SplashRight'>
                            <div className='SplashIconContainer'>
                                <img className='SplashIcon' src='https://i.imgur.com/IRQ5Wrh.png' alt="icon"></img>
                            </div>
                            <p className='SplashSlogan'>Joking now</p>
                            <p className='SplashText'>Join Joker today.</p>
                            <div className='SplashSignupContainer'>
                                <DemoUser />
                                <div className='SplashBorderManipulation'>
                                    <div className='SplashBorder'></div>
                                    <p className='SplashBorderOr'>or</p>
                                    <div className='SplashBorder'></div>
                                </div>
                                <SplashSignupModal />
                            </div>
                            <div className='SplashLoginContainer'>
                                <p className='SplashAccText'>Already have an account?</p>
                                <SplashLoginModal />
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='SplashFooter'>
                    <a className='SplashAbout' href='https://github.com/Jasontang98/Joker'>Github
                    <BsGithub className='SplashGithub' />
                    </a>
                    <a className='SplashAbout' href='https://www.linkedin.com/in/jason-tang-b8444517b/'>Linkedin
                    <BsLinkedin className='SplashLinkedin' />
                    </a>
                </footer>
            </div>
        </>
    )
}

export default SplashPage;
