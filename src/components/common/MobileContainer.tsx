import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="w-[390px] min-h-screen mx-auto relative bg-white overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  );
};
