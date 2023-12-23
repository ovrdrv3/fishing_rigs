import React, { useState } from 'react';
import LogoHook from '../../assets/images/Logo_Hook.svg';
import LogoNormal from '../../assets/images/Logo_Normal.svg';

export default function Logo() {
  const [logo, setLogo] = useState(LogoNormal);

  const handleMouseOver = () => {
    setLogo(LogoHook);
  };

  const handleMouseOut = () => {
    setLogo(LogoNormal);
  };

  return (
    <a href="/">
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="flex justify-center items-center dark:invert cursor-pointer">
        <img className="p-2" src={logo} alt="Logo" />
      </div>
    </a>
  );
}
