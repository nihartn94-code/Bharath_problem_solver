import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const CategoryBreakdownChart: React.FC = () => {
  const data = [
    { name: 'Water Supply & Leakage', value: 28, color: '#38BDF8' },
    { name: 'Public Bus & Transit', value: 22, color: '#C084FC' },
    { name: 'Traffic & Congestion', value: 20, color: '#F59E0B' },
    { name: 'Waste & Garbage', value: 14, color: '#34D399' },
    { name: 'Apartment Maintenance', value: 10, color: '#FB7185' },
    { name: 'Hospital OPD Wait', value: 6, color: '#2DD4BF' },
  ];

  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder h-full flex flex-col justify-between">
      <div className="border-b border-cardBorder pb-3 mb-4">
        <h3 className="text-base font-bold text-white">Category Disruption Distribution</h3>
        <p className="text-xs text-slate-400">Multi-domain telemetry analytics</p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', color: '#FFF' }}
              itemStyle={{ color: '#38BDF8', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-cardBorder pt-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
