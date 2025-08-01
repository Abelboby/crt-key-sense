import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: 'OpenAI API Request',
      intent: 'Generate blog content',
      timestamp: '2 minutes ago',
      status: 'success',
      confidence: 98.7,
    },
    {
      id: 2,
      action: 'Anthropic Claude',
      intent: 'Code review assistance',
      timestamp: '5 minutes ago',
      status: 'success',
      confidence: 94.2,
    },
    {
      id: 3,
      action: 'Google Gemini',
      intent: 'Image analysis',
      timestamp: '12 minutes ago',
      status: 'warning',
      confidence: 87.5,
    },
    {
      id: 4,
      action: 'Stability AI',
      intent: 'Generate artwork',
      timestamp: '18 minutes ago',
      status: 'success',
      confidence: 91.8,
    },
    {
      id: 5,
      action: 'Cohere Embed',
      intent: 'Document similarity',
      timestamp: '23 minutes ago',
      status: 'error',
      confidence: 76.3,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-neon-green" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-warning" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-error" />;
      default:
        return <Clock className="w-4 h-4 text-electric-blue" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-neon-green';
    if (confidence >= 85) return 'text-electric-blue';
    if (confidence >= 75) return 'text-amber-warning';
    return 'text-red-error';
  };

  return (
    <Card className="bg-terminal-dark border-neon-green/30 glow-border">
      <CardHeader>
        <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
          <Activity className="w-5 h-5 animate-pulse" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-2 bg-terminal-darker border border-neon-green/20 rounded-sm hover:border-neon-green/40 transition-colors"
            >
              {getStatusIcon(activity.status)}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-terminal text-neon-green truncate">
                  {activity.action}
                </div>
                <div className="text-xs text-neon-green/60 truncate">
                  "{activity.intent}"
                </div>
                <div className="text-xs text-neon-green/40 font-terminal">
                  {activity.timestamp}
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-xs font-terminal border-current ${getConfidenceColor(activity.confidence)}`}
              >
                {activity.confidence}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}