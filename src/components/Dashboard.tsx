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
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>

        {/* System Status */}
        <div className="lg:col-span-1">
          <SystemStatus />
        </div>
      </div>

      {/* Intent Processing Status */}
      <Card className="bg-terminal-dark border-neon-green/30 glow-border">
        <CardHeader>
          <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
            <Brain className="w-5 h-5 animate-pulse" />
            Semantic Processing Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-terminal-darker border border-neon-green/20 rounded-sm">
              <div className="text-2xl font-bold text-neon-green font-terminal">97.3%</div>
              <div className="text-sm text-neon-green/70">Intent Accuracy</div>
            </div>
            <div className="text-center p-4 bg-terminal-darker border border-electric-blue/20 rounded-sm">
              <div className="text-2xl font-bold text-electric-blue font-terminal">143ms</div>
              <div className="text-sm text-electric-blue/70">Avg Response</div>
            </div>
            <div className="text-center p-4 bg-terminal-darker border border-cyan-accent/20 rounded-sm">
              <div className="text-2xl font-bold text-cyan-accent font-terminal">15.2K</div>
              <div className="text-sm text-cyan-accent/70">Vector DB Size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}