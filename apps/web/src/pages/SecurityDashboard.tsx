import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Target,
  Database,
  Cpu,
  Lock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const alertTrends = [
  { name: '00:00', total: 45, high: 5 },
  { name: '04:00', total: 32, high: 2 },
  { name: '08:00', total: 120, high: 25 },
  { name: '12:00', total: 210, high: 45 },
  { name: '16:00', total: 180, high: 30 },
  { name: '20:00', total: 95, high: 15 },
];

const KPI_CARDS = [
  { title: 'Total Alerts (24h)', value: '2,842', trend: '+12%', color: 'rose', icon: AlertTriangle },
  { title: 'MTTR (Mean Time to Respond)', value: '42m', trend: '-8%', color: 'rose', icon: Clock },
  { title: 'Playbook Autopilot', value: '78%', trend: 'Healthy', color: 'rose', icon: Zap },
  { title: 'Threat Intelligence', value: 'Active', trend: 'Global', color: 'slate', icon: Shield },
];

const SecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Command Center</h1>
          <p className="text-slate-400">Strategic oversight of global threat detection and automated orchestration.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Download Incident Report
          </button>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Manual Ingest
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('-') || card.trend === 'Healthy' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Trend Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Threat Alert Velocity (24h)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrends}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#f43f5e" fill="url(#colorTotal)" name="Total Alerts" />
                <Area type="monotone" dataKey="high" stroke="#fbbf24" fill="transparent" strokeDasharray="5 5" name="High Severity" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Detection Rules */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Top Detection Rules</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Bruteforce SSH', value: 45, color: 'bg-rose-500' },
              { name: 'Data Exfiltration (S3)', value: 25, color: 'bg-amber-500' },
              { name: 'Lateral Movement (SMB)', value: 20, color: 'bg-sky-500' },
              { name: 'Suspicious Auth (GCP)', value: 10, color: 'bg-slate-500' },
            ].map((rule) => (
              <div key={rule.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{rule.name}</span>
                  <span className="text-slate-400">{rule.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${rule.color}`} style={{ width: `${rule.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Alerts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Critical Active Alerts</h3>
          <button className="text-rose-400 hover:text-rose-300 text-sm font-medium">View All Alerts</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Alert Type</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Source IP</th>
                <th className="px-6 py-4 font-semibold">Playbook Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { type: 'BRUTEFORCE_ATTACK', severity: 'CRITICAL', source: '192.168.45.12', status: 'AUTO_BLOCKED' },
                { type: 'UNAUTHORIZED_ACCESS', severity: 'HIGH', source: '10.0.5.21', status: 'INVESTIGATING' },
                { type: 'TOR_EXIT_NODE_ACCESS', severity: 'MEDIUM', source: '1.2.3.4', status: 'PENDING_APPROVAL' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span className="text-sm font-medium text-slate-300">{row.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.severity === 'CRITICAL' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.source}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3 h-3 ${row.status === 'AUTO_BLOCKED' ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="text-xs text-slate-400">{row.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-rose-400 hover:text-rose-300 text-xs font-bold uppercase tracking-wider">
                      Launch Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
