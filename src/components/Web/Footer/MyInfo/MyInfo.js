import React from 'react'
import Logo from '../../../../assets/png/logo-white.png';
import SocialLink from '../../SocialLinks';
import './MyInfo.scss';

export default function MyInfo() {
    return (
        <div className='my-info'>
            <img src={Logo} alt='Irving'/>
            <h4>lorem lorem lorem lorem</h4>
            <SocialLink></SocialLink>
        </div>
    )
}
