import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: LucideIcon;
  description: string;
}

export function StatsCard({ title, value, change, changeType, icon: Icon, description }: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-neon-green border-neon-green/50';
      case 'negative':
        return 'text-red-error border-red-error/50';
      case 'warning':
        return 'text-amber-warning border-amber-warning/50';
      default:
        return 'text-electric-blue border-electric-blue/50';
    }
  };

  const getGlowEffect = () => {
    switch (changeType) {
      case 'positive':
        return 'shadow-[0_0_20px_hsl(var(--neon-green)/0.2)]';
      case 'negative':
        return 'shadow-[0_0_20px_hsl(var(--red-error)/0.2)]';
      case 'warning':
        return 'shadow-[0_0_20px_hsl(var(--amber-warning)/0.2)]';
      default:
        return 'shadow-[0_0_20px_hsl(var(--electric-blue)/0.2)]';
    }
  };

  return (
    <Card className={`bg-terminal-dark border-neon-green/30 hover:border-neon-green/50 transition-all duration-300 ${getGlowEffect()} group cursor-pointer`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-terminal text-neon-green/80">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-neon-green group-hover:text-neon-green-glow transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold font-terminal text-neon-green glow-text">
            {value}
          </div>
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs font-terminal ${getChangeColor()}`}
            >
              {change}
            </Badge>
          </div>
          <p className="text-xs text-neon-green/60 font-terminal">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}