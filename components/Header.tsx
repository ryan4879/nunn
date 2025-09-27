
import React from 'react';

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .972.997 3.5 3.5 0 0 1 3.5 3.5c0 .588.48 1.013 1.03.997V12a1 1 0 0 1 1 1v1.2a2.5 2.5 0 0 1-5 0V13a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v1.2a2.5 2.5 0 0 1-5 0V13a1 1 0 0 1 1-1h.28c.55-.016 1.03-.41 1.03-.997V7.5a3.5 3.5 0 0 1 3.5-3.5A1 1 0 0 0 9.5 3.2V2Z" />
    <path d="M12 14.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Z" />
    <path d="M4.5 14a2.5 2.5 0 0 0-2.5 2.5v.04a4.48 4.48 0 0 0 3.25 4.21A2.5 2.5 0 0 0 7 18.5V17a2.5 2.5 0 0 0-2.5-2.5Z" />
    <path d="M19.5 14a2.5 2.5 0 0 1 2.5 2.5v.04a4.48 4.48 0 0 1-3.25 4.21A2.5 2.5 0 0 1 17 18.5V17a2.5 2.5 0 0 1 2.5-2.5Z" />
  </svg>
);


interface HeaderProps {
    onNewCase: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewCase }) => {
  return (
    <header className="flex justify-between items-center pb-4 border-b-2 border-brand-primary">
      <div className="flex items-center space-x-3">
        <BrainIcon className="text-brand-secondary"/>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Nunn <span className="text-base font-normal text-brand-text-light hidden md:inline-block">AI Investigation Assistant</span></h1>
      </div>
      <button onClick={onNewCase} className="bg-brand-surface text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary transition duration-300 border border-brand-primary">
        + New Case File
      </button>
    </header>
  );
};

export default Header;
