import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { StatsCard } from './StatsCard';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { SystemStatus } from './SystemStatus';
import {
  Key,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  Shield,
  Brain,
} from 'lucide-react';

export function Dashboard() {
  // Demo credentials (default to demo1)
  const demoAccounts = [
    { userId: "demo1", password: "pass1" },
    { userId: "demo2", password: "pass2" },
    { userId: "demo3", password: "pass3" }
  ];
  const demoCreds = demoAccounts[0];

  const handleLogout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const payload = { userId: demoCreds.userId, password: demoCreds.password };
    try {
      const res = await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("session_token");
        window.location.href = "/";
      } else {
        alert(data.error || "Logout failed");
      }
    } catch (e) {
      alert("Network error");
    }
  };
  const stats = [
    {
      title: 'Total API Keys',
      value: '24',
      change: '+3',
      changeType: 'positive' as const,
      icon: Key,
      description: 'Active keys registered',
    },
    {
      title: 'Requests Today',
      value: '1,247',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Semantic API calls',
    },
    {
      title: 'Last Key Used',
      value: '2m ago',
      change: 'OpenAI GPT-4',
      changeType: 'neutral' as const,
      icon: Clock,
      description: 'Most recent activity',
    },
    {
      title: 'Expiring Soon',
      value: '3',
      change: 'Within 7 days',
      changeType: 'warning' as const,
      icon: AlertTriangle,
      description: 'Keys need renewal',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-terminal font-bold text-neon-green glow-text">
            Terminal Dashboard
          </h1>
          <p className="text-neon-green/70 font-terminal mt-1">
            SmartAPIKey Control Center // Semantic Intent Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-neon-green/50 text-neon-green animate-pulse-slow">
            <Brain className="w-3 h-3 mr-1" />
            AI ACTIVE
          </Badge>
          <Badge variant="outline" className="border-electric-blue/50 text-electric-blue">
            <Shield className="w-3 h-3 mr-1" />
            SECURE
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - Commented out for now */}
        {/* <div className="lg:col-span-1">
          <QuickActions />
        </div> */}

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* System Status - Commented out for now */}
        {/* <div className="lg:col-span-1">
          <SystemStatus />
        </div> */}
      </div>

      {/* Semantic Processing Engine Footer */}
      <footer className="mt-12 border-t border-neon-green/20 bg-terminal-black/50 backdrop-blur rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono font-bold text-electric-blue flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              Semantic Processing Engine
            </h3>
            <div className="text-sm text-neon-green/60 font-mono">
              Status: Online
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-terminal-black/60 border border-neon-green/20 rounded p-4">
              <div className="text-xs text-neon-green/60 font-mono mb-1">Vector DB Size</div>
              <div className="text-lg font-mono text-neon-green">2.4 GB</div>
              <div className="text-xs text-neon-green/40 font-mono">~1.2M vectors</div>
            </div>
            
            <div className="bg-terminal-black/60 border border-neon-green/20 rounded p-4">
              <div className="text-xs text-neon-green/60 font-mono mb-1">DB Connection</div>
              <div className="text-lg font-mono text-neon-green flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                Connected
              </div>
              <div className="text-xs text-neon-green/40 font-mono">Latency: 12ms</div>
            </div>
            
            <div className="bg-terminal-black/60 border border-neon-green/20 rounded p-4">
              <div className="text-xs text-neon-green/60 font-mono mb-1">System Uptime</div>
              <div className="text-lg font-mono text-neon-green">99.7%</div>
              <div className="text-xs text-neon-green/40 font-mono">42d 18h 23m</div>
            </div>
            
            <div className="bg-terminal-black/60 border border-neon-green/20 rounded p-4">
              <div className="text-xs text-neon-green/60 font-mono mb-1">Avg Response</div>
              <div className="text-lg font-mono text-neon-green">147ms</div>
              <div className="text-xs text-neon-green/40 font-mono">Last 24h</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-neon-green/50 font-mono text-center">
            Semantic engine metrics • Updates every 30s • Data will be updated in future versions
          </div>
        </div>
      </footer>
    </div>
  );
}