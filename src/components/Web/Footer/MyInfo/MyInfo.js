import React from 'react';

import logoWhite from '../../../../assets/img/png/logo-white.png';
import SocialLink from '../../SocialLinks';

import './MyInfo.scss';

const MyInfo = () => {
    return (
        <div className="my-info">
            <img src={logoWhite}  alt="PiñiscoRata" />
            <h4>
                ¡Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tu imaginación fluya y crea verdaderas maravillas!
            </h4>
            <SocialLink />
        </div>
    );
};

export default MyInfo;
