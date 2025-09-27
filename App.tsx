
import React, { useState } from 'react';
import { CaseData, AIAnalysisResult } from './types';
import CaseCreationForm from './components/CaseCreationForm';
import CaseDashboard from './components/CaseDashboard';
import Header from './components/Header';
import { analyzeCase } from './services/geminiService';
import Loader from './components/Loader';

type View = 'form' | 'loading' | 'dashboard' | 'error';

const App: React.FC = () => {
  const [view, setView] = useState<View>('form');
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCaseSubmit = async (data: CaseData) => {
    setView('loading');
    setCaseData(data);
    setError(null);
    try {
      const result = await analyzeCase(data);
      setAnalysisResult(result);
      setView('dashboard');
    } catch (err) {
      console.error("Error analyzing case:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
      setView('error');
    }
  };

  const handleCreateNewCase = () => {
    setCaseData(null);
    setAnalysisResult(null);
    setError(null);
    setView('form');
  };

  const renderContent = () => {
    switch (view) {
      case 'form':
        return <CaseCreationForm onSubmit={handleCaseSubmit} />;
      case 'loading':
        return <Loader message="Nunn is analyzing the case file. This may take a moment..." />;
      case 'dashboard':
        return caseData && analysisResult ? (
          <CaseDashboard caseData={caseData} analysis={analysisResult} />
        ) : (
          <p>Error: Missing case data or analysis result.</p>
        );
      case 'error':
        return (
          <div className="text-center p-8 bg-brand-surface rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-brand-secondary mb-4">Analysis Failed</h2>
            <p className="text-brand-text-light mb-6">{error}</p>
            <button
              onClick={handleCreateNewCase}
              className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-300"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen container mx-auto p-4 md:p-8 font-sans">
      <Header onNewCase={handleCreateNewCase} />
      <main className="mt-8">
        {renderContent()}
      </main>
      <footer className="text-center text-brand-text-light text-sm mt-12 pb-4">
        <p>Disclaimer: Nunn is an AI assistant. Its output is generated and should be used for informational and idea-generation purposes only. It is not a substitute for professional investigative work and its conclusions should not be considered legal evidence.</p>
      </footer>
    </div>
  );
};

export default App;
