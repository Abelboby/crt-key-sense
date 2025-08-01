import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Server,
  Database,
  Wifi,
  Shield,
  Cpu,
  HardDrive,
  Zap,
} from 'lucide-react';

export function SystemStatus() {
  const systems = [
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.97%',
      icon: Server,
    },
    {
      name: 'Vector Database',
      status: 'operational',
      uptime: '99.99%',
      icon: Database,
    },
    {
      name: 'Neural Network',
      status: 'operational',
      uptime: '99.95%',
      icon: Cpu,
    },
    {
      name: 'Encryption Layer',
      status: 'operational',
      uptime: '100%',
      icon: Shield,
    },
  ];

  const metrics = [
    {
      label: 'CPU Usage',
      value: 23,
      color: 'neon-green',
    },
    {
      label: 'Memory',
      value: 67,
      color: 'electric-blue',
    },
    {
      label: 'Storage',
      value: 45,
      color: 'cyan-accent',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-neon-green border-neon-green/50';
      case 'degraded':
        return 'text-amber-warning border-amber-warning/50';
      case 'outage':
        return 'text-red-error border-red-error/50';
      default:
        return 'text-electric-blue border-electric-blue/50';
    }
  };

  return (
    <Card className="bg-terminal-dark border-neon-green/30 glow-border">
      <CardHeader>
        <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
          <Zap className="w-5 h-5 animate-pulse" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* System Components */}
        <div className="space-y-2">
          {systems.map((system, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-terminal-darker border border-neon-green/20 rounded-sm"
            >
              <div className="flex items-center gap-2">
                <system.icon className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-terminal text-neon-green">
                  {system.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neon-green/60 font-terminal">
                  {system.uptime}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs font-terminal ${getStatusColor(system.status)}`}
                >
                  {system.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Metrics */}
        <div className="space-y-3 pt-2 border-t border-neon-green/20">
          <h4 className="text-sm font-terminal text-neon-green/80">
            Resource Usage
          </h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs font-terminal">
                <span className="text-neon-green/70">{metric.label}</span>
                <span className="text-neon-green">{metric.value}%</span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2 bg-terminal-darker"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}