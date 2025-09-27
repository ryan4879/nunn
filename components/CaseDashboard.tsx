
import React from 'react';
import { CaseData, AIAnalysisResult, InvestigativeLead } from '../types';
import RelationshipChart from './RelationshipChart';

interface CaseDashboardProps {
  caseData: CaseData;
  analysis: AIAnalysisResult;
}

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-brand-surface p-6 rounded-lg shadow-2xl ${className}`}>
        <h3 className="text-lg font-bold text-brand-secondary mb-4 border-b border-brand-primary pb-2">{title}</h3>
        {children}
    </div>
);

const PriorityBadge: React.FC<{priority: InvestigativeLead['priority']}> = ({ priority }) => {
    const colors = {
        High: 'bg-red-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-blue-500',
    };
    return <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full text-white ${colors[priority]}`}>{priority}</span>;
};


const CaseDashboard: React.FC<CaseDashboardProps> = ({ caseData, analysis }) => {
    return (
        <div className="space-y-8">
            <header className="bg-brand-surface p-6 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold">{caseData.caseTitle}</h1>
                <p className="text-brand-text-light mt-1">{caseData.crimeType} at {caseData.location} on {new Date(caseData.dateTime).toLocaleString()}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title="AI Case Summary">
                        <p className="text-brand-text-light">{analysis.caseSummary}</p>
                    </Card>
                     <Card title="Generated Hypotheses">
                        <div className="space-y-4">
                            {analysis.hypotheses.map((hyp, index) => (
                                <details key={index} className="bg-brand-primary p-4 rounded-md">
                                    <summary className="font-semibold cursor-pointer">{hyp.title}</summary>
                                    <p className="mt-2 text-brand-text-light text-sm">{hyp.description}</p>
                                    <p className="mt-2 text-xs text-gray-400">Supporting Evidence: {hyp.supportingEvidence.join(', ')}</p>
                                </details>
                            ))}
                        </div>
                    </Card>
                     <Card title="Key Relationships Network">
                        <RelationshipChart data={analysis.keyRelationships} />
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-8">
                     <Card title="Timeline of Events">
                        <ul className="space-y-3">
                            {analysis.timelineOfEvents.map((event, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-brand-secondary"></div>
                                    <div className="ml-3">
                                        <p className="font-semibold">{event.event} <span className="text-xs text-gray-400">({event.source})</span></p>
                                        <p className="text-sm text-brand-text-light">{new Date(event.time).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card title="Suggested Investigative Leads">
                        <ul className="space-y-3">
                            {analysis.investigativeLeads.map((item, index) => (
                                <li key={index} className="bg-brand-primary p-3 rounded-md">
                                    <PriorityBadge priority={item.priority} />
                                    <span>{item.lead}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseDashboard;
