
import { GoogleGenAI, Type } from "@google/genai";
import { CaseData, AIAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    caseSummary: { type: Type.STRING, description: "A brief, objective summary of the case based on the provided facts." },
    mainMotiveHypothesis: { type: Type.STRING, description: "The most likely motive behind the crime." },
    hypotheses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A concise title for the hypothesis (e.g., 'Crime of Passion', 'Robbery Gone Wrong')." },
          description: { type: Type.STRING, description: "A detailed explanation of the hypothesis." },
          supportingEvidence: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of facts or evidence points that support this hypothesis." }
        },
         required: ["title", "description", "supportingEvidence"],
      }
    },
    investigativeLeads: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          lead: { type: Type.STRING, description: "A specific, actionable investigative step." },
          priority: { type: Type.STRING, description: "Priority level: 'High', 'Medium', or 'Low'." }
        },
        required: ["lead", "priority"],
      }
    },
    keyRelationships: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          entity1: { type: Type.STRING, description: "The first person, place, or object in the relationship." },
          entity2: { type: Type.STRING, description: "The second entity." },
          relationship: { type: Type.STRING, description: "Description of the relationship between the two entities (e.g., 'Financial dispute', 'Seen together at location X')." },
          relevance: { type: Type.NUMBER, description: "A score from 1-10 on the relevance to the case, where 10 is most relevant." }
        },
        required: ["entity1", "entity2", "relationship", "relevance"],
      }
    },
    timelineOfEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING, description: "The estimated or known time of the event (e.g., '2024-07-28 22:30')." },
          event: { type: Type.STRING, description: "A description of the event." },
          source: { type: Type.STRING, description: "Whether this is 'Reported' by the user or 'Inferred' by the AI." }
        },
        required: ["time", "event", "source"],
      }
    }
  },
  required: ["caseSummary", "mainMotiveHypothesis", "hypotheses", "investigativeLeads", "keyRelationships", "timelineOfEvents"],
};

const formatCaseDataForPrompt = (data: CaseData): string => {
  return `
    Case Title: ${data.caseTitle}
    Crime Type: ${data.crimeType}
    Date & Time: ${data.dateTime}
    Location: ${data.location}
    ---
    Victim:
    - Name: ${data.victim.name}
    - Details: ${data.victim.details}
    ---
    Case Summary:
    ${data.summary}
    ---
    Physical Evidence:
    ${data.evidence.map(e => `- ${e.description}`).join('\n')}
    ---
    Witnesses:
    ${data.witnesses.map(w => `- ${w.name}: ${w.details}`).join('\n')}
    ---
    Suspects:
    ${data.suspects.map(s => `- ${s.name}: ${s.details}`).join('\n')}
  `;
};

export const analyzeCase = async (caseData: CaseData): Promise<AIAnalysisResult> => {
  const prompt = formatCaseDataForPrompt(caseData);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the following criminal case details and provide a structured analysis. Think step-by-step to connect the dots, identify inconsistencies, and generate logical hypotheses and investigative paths.\n\n${prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
      temperature: 0.5,
    },
  });
  
  const text = response.text.trim();
  try {
    const result = JSON.parse(text);
    return result as AIAnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("The AI returned an invalid analysis format. Please try rephrasing your case details.");
  }
};
