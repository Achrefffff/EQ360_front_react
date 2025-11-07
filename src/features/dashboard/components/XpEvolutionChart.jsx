import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const XpEvolutionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Évolution XP par SPPA
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="xp" 
            stroke="#5cf5b2" 
            strokeWidth={3}
            dot={{ fill: '#5cf5b2', r: 5 }}
            activeDot={{ r: 7 }}
            name="XP"
          />
          <Line 
            type="monotone" 
            dataKey="niveau" 
            stroke="#a855f7" 
            strokeWidth={2}
            dot={{ fill: '#a855f7', r: 4 }}
            name="Niveau"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default XpEvolutionChart;
