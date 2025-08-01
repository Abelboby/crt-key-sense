import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Plus,
  Brain,
  BarChart3,
  Key,
  Zap,
  PlayCircle,
} from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Add API Key',
      description: 'Register new service',
      icon: Plus,
      variant: 'terminal' as const,
      action: () => console.log('Add API Key'),
    },
    {
      title: 'Semantic Query',
      description: 'Intent-based search',
      icon: Brain,
      variant: 'cyber' as const,
      action: () => console.log('Semantic Query'),
    },
    {
      title: 'View Analytics',
      description: 'Usage patterns',
      icon: BarChart3,
      variant: 'outline' as const,
      action: () => console.log('View Analytics'),
    },
    {
      title: 'Quick Test',
      description: 'Playground mode',
      icon: PlayCircle,
      variant: 'secondary' as const,
      action: () => console.log('Quick Test'),
    },
  ];

  return (
    <Card className="bg-terminal-dark border-neon-green/30 glow-border">
      <CardHeader>
        <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
          <Zap className="w-5 h-5 animate-pulse" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="w-full justify-start h-auto p-3 group"
            onClick={action.action}
          >
            <div className="flex items-center gap-3 w-full">
              <action.icon className="w-5 h-5 group-hover:animate-pulse" />
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-xs opacity-70">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}