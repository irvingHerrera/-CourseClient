import React, { useState } from 'react';
import { ReactComponent as YouTubeIcon } from '../../../assets/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/svg/linkedin.svg';

import './SocialLinks.scss';

export default function SocialLinks() {
    return (
        <div className='social-links'>
            <a href='https://youtube.com/' className='youtube' target='_blank' rel="noopener noreferrer">
                <YouTubeIcon></YouTubeIcon>
            </a>
            <a href='https://www.facebook.com/' className='twitter' target='_blank' rel="noopener noreferrer">
                <TwitterIcon></TwitterIcon>
            </a>
            <a href='https://twitter.com/' className='facebook' target='_blank' rel="noopener noreferrer">
                <FacebookIcon></FacebookIcon>
            </a>
            <a href='linkedin.com' className='linkedin' target='_blank' rel="noopener noreferrer">
                <LinkedinIcon></LinkedinIcon>
            </a>
        </div>
    );
}