
import React from 'react';
import { KeyRelationship } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RelationshipChartProps {
    data: KeyRelationship[];
}

const RelationshipChart: React.FC<RelationshipChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-brand-text-light">No key relationships were identified based on the provided data.</p>;
    }

    const chartData = data
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 10) // Show top 10 most relevant
        .map(item => ({
            name: `${item.entity1} - ${item.entity2}`,
            relevance: item.relevance,
            details: item.relationship,
        }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-2 bg-brand-primary border border-brand-secondary rounded-md shadow-lg text-sm">
                    <p className="font-bold">{label}</p>
                    <p className="text-brand-secondary">{`Relevance: ${payload[0].value}`}</p>
                    <p className="text-brand-text-light mt-1">{`Details: ${payload[0].payload.details}`}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 100, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#a0a0a0" domain={[0, 10]}/>
                    <YAxis type="category" dataKey="name" stroke="#a0a0a0" width={150} tick={{ fontSize: 12 }}/>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(233, 69, 96, 0.1)' }}/>
                    <Legend />
                    <Bar dataKey="relevance" fill="#e94560" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RelationshipChart;
