import React from 'react';
import Feed from './Feed/Feed';
import SideBar from './Sidebar/Sidebar';
import './TimelineAllJokes.css';

const TimelineAllJokes = () => {
    return (
        <div className='timeline-all-wrap'>
            <div className='timeline-all-left'>
                <SideBar />
            </div>
            <div className='timeline-all-center'>
                <Feed className='timeline-all-feed' />
            </div>
        </div>
    )
}

export default TimelineAllJokes
