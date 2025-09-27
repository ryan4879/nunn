
export interface Person {
  name: string;
  details: string;
}

export interface Evidence {
  description: string;
  file?: {
    name: string;
    type: string;
    base64: string;
  };
}

export interface CaseData {
  caseTitle: string;
  crimeType: string;
  dateTime: string;
  location: string;
  victim: Person;
  summary: string;
  evidence: Evidence[];
  witnesses: Person[];
  suspects: Person[];
}

// AI Analysis Result types
export interface Hypothesis {
  title: string;
  description: string;
  supportingEvidence: string[];
}

export interface InvestigativeLead {
  lead: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface KeyRelationship {
  entity1: string;
  entity2: string;
  relationship: string;
  relevance: number;
}

export interface TimelineEvent {
  time: string;
  event: string;
  source: 'Reported' | 'Inferred';
}

export interface AIAnalysisResult {
  caseSummary: string;
  mainMotiveHypothesis: string;
  hypotheses: Hypothesis[];
  investigativeLeads: InvestigativeLead[];
  keyRelationships: KeyRelationship[];
  timelineOfEvents: TimelineEvent[];
}
