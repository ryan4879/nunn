import React, { useState, useCallback } from 'react';
import { CaseData, Person, Evidence } from '../types';

interface CaseCreationFormProps {
  onSubmit: (data: CaseData) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-brand-surface p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-xl font-bold text-brand-secondary mb-4 border-b-2 border-brand-primary pb-2">{title}</h2>
    {children}
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`w-full bg-brand-primary p-3 rounded-md text-brand-text placeholder-brand-text-light focus:outline-none focus:ring-2 focus:ring-brand-secondary ${props.className}`} />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className={`w-full bg-brand-primary p-3 rounded-md text-brand-text placeholder-brand-text-light focus:outline-none focus:ring-2 focus:ring-brand-secondary ${props.className}`} />
);

const CaseCreationForm: React.FC<CaseCreationFormProps> = ({ onSubmit }) => {
  const [caseTitle, setCaseTitle] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [victim, setVictim] = useState<Person>({ name: '', details: '' });
  const [summary, setSummary] = useState('');
  const [evidence, setEvidence] = useState<Evidence[]>([{ description: '' }]);
  const [witnesses, setWitnesses] = useState<Person[]>([{ name: '', details: '' }]);
  const [suspects, setSuspects] = useState<Person[]>([{ name: '', details: '' }]);

  const handleListChange = <T,>(index: number, field: keyof T, value: string, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [field]: value };
    setList(newList);
  };

  const addListItem = <T,>(defaultItem: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    setList([...list, defaultItem]);
  };
  
  const removeListItem = <T,>(index: number, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.length > 1) {
      setList(list.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const caseData: CaseData = {
      caseTitle, crimeType, dateTime, location, victim, summary,
      evidence: evidence.filter(item => item.description.trim() !== ''),
      witnesses: witnesses.filter(item => item.name.trim() !== '' || item.details.trim() !== ''),
      suspects: suspects.filter(item => item.name.trim() !== '' || item.details.trim() !== ''),
    };
    onSubmit(caseData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section title="Case Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold">Case Title</label>
            <Input type="text" value={caseTitle} onChange={(e) => setCaseTitle(e.target.value)} placeholder="e.g., The Midnight Robbery at Grandview" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Crime Type</label>
            <Input type="text" value={crimeType} onChange={(e) => setCrimeType(e.target.value)} placeholder="e.g., Burglary, Homicide, Missing Person" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Date & Time</label>
            <Input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Location</label>
            <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Address or GPS coordinates" required />
          </div>
        </div>
      </Section>
      
      <Section title="Victim Details">
        <div>
          <label className="block mb-2 font-semibold">Victim Name</label>
          <Input type="text" value={victim.name} onChange={(e) => setVictim({ ...victim, name: e.target.value })} placeholder="Full Name" required/>
        </div>
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Relevant Information</label>
          <Textarea rows={2} value={victim.details} onChange={(e) => setVictim({ ...victim, details: e.target.value })} placeholder="Age, occupation, relationship to location, etc." required/>
        </div>
      </Section>

      <Section title="Case Summary">
         <label className="block mb-2 font-semibold">Narrative of Events</label>
         <Textarea rows={5} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Describe the known sequence of events, what was discovered at the scene, and initial findings." required />
      </Section>

      {/* Fix: Replaced dynamic section generation with explicit sections for type safety. */}
      <Section title="Evidence">
        {evidence.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-4 items-center">
            <div className="md:col-span-9">
              <div className="w-full">
                <Input type="text" value={item.description} onChange={e => handleListChange(index, 'description', e.target.value, evidence, setEvidence)} placeholder="Describe evidence found..." />
              </div>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <button type="button" onClick={() => removeListItem(index, evidence, setEvidence)} className="text-brand-text-light hover:text-brand-secondary transition-colors">&#x2715;</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addListItem({ description: '' }, evidence, setEvidence)} className="mt-2 text-brand-secondary font-semibold hover:text-opacity-80 transition">+ Add Evidence</button>
      </Section>

      <Section title="Witnesses">
        {witnesses.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-4 items-center">
            <div className="md:col-span-9 grid md:grid-cols-2 gap-4">
              <div className="w-full">
                <Input type="text" value={item.name} onChange={e => handleListChange(index, 'name', e.target.value, witnesses, setWitnesses)} placeholder="Witness Name" />
              </div>
              <div className="w-full">
                <Input type="text" value={item.details} onChange={e => handleListChange(index, 'details', e.target.value, witnesses, setWitnesses)} placeholder="Initial statement or known information" />
              </div>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <button type="button" onClick={() => removeListItem(index, witnesses, setWitnesses)} className="text-brand-text-light hover:text-brand-secondary transition-colors">&#x2715;</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addListItem({ name: '', details: '' }, witnesses, setWitnesses)} className="mt-2 text-brand-secondary font-semibold hover:text-opacity-80 transition">+ Add Witness</button>
      </Section>

      <Section title="Suspects">
        {suspects.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-4 items-center">
            <div className="md:col-span-9 grid md:grid-cols-2 gap-4">
              <div className="w-full">
                <Input type="text" value={item.name} onChange={e => handleListChange(index, 'name', e.target.value, suspects, setSuspects)} placeholder="Suspect Name" />
              </div>
              <div className="w-full">
                <Input type="text" value={item.details} onChange={e => handleListChange(index, 'details', e.target.value, suspects, setSuspects)} placeholder="Reason for suspicion, alibi, etc." />
              </div>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <button type="button" onClick={() => removeListItem(index, suspects, setSuspects)} className="text-brand-text-light hover:text-brand-secondary transition-colors">&#x2715;</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addListItem({ name: '', details: '' }, suspects, setSuspects)} className="mt-2 text-brand-secondary font-semibold hover:text-opacity-80 transition">+ Add Suspect</button>
      </Section>

      <div className="text-center pt-4">
        <button type="submit" className="bg-brand-secondary text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-opacity-80 transition duration-300 shadow-xl">
          Analyze Case File
        </button>
      </div>
    </form>
  );
};

export default CaseCreationForm;
