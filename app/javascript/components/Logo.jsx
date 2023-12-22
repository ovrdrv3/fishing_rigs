import React, { useState } from 'react';
import LogoHook from '../../assets/images/Logo_Hook.svg';
import LogoNormal from '../../assets/images/Logo_Normal.svg';

export default function Logo() {
  const [logoSrc, setLogoSrc] = useState(LogoHook);

  const handleMouseOver = () => {
    setLogoSrc(LogoNormal);
  };

  const handleMouseOut = () => {
    setLogoSrc(LogoHook);
  };

  return (
    <a href="/">
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="flex justify-center items-center dark:invert cursor-pointer">
        <img class="p-2" src={logoSrc} alt="Logo" />
      </div>
    </a>
  );
}
