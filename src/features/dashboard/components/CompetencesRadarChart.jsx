import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const CompetencesRadarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Aucun SPPA disponible
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Compétences par SPPA
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="sppa" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 'auto']}
            stroke="#6b7280"
            style={{ fontSize: '10px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Radar 
            name="Compétences" 
            dataKey="competences" 
            stroke="#1afffb" 
            fill="#1afffb" 
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Radar 
            name="Niveau" 
            dataKey="niveau" 
            stroke="#a855f7" 
            fill="#a855f7" 
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Radar 
            name="Heures" 
            dataKey="heures" 
            stroke="#5cf5b2" 
            fill="#5cf5b2" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompetencesRadarChart;
