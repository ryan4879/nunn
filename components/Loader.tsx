
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-brand-surface rounded-lg shadow-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-secondary mb-6"></div>
      <p className="text-lg font-semibold text-brand-text">{message}</p>
      <p className="text-sm text-brand-text-light mt-2">Connecting evidence, identifying patterns, generating hypotheses...</p>
    </div>
  );
};

export default Loader;
