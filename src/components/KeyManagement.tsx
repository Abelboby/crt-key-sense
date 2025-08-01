import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AddKeyModal } from './AddKeyModal';
import {
  Key,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Activity,
  Shield,
  AlertTriangle,
} from 'lucide-react';

export function KeyManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

  const apiKeys = [
    {
      id: 1,
      name: 'OpenAI GPT-4',
      service: 'OpenAI',
      key: 'sk-1234567890abcdef...',
      status: 'active',
      lastUsed: '2 minutes ago',
      requests: 1247,
      expiresAt: '2024-03-15',
      scope: ['text-generation', 'code-completion'],
    },
    {
      id: 2,
      name: 'Anthropic Claude',
      service: 'Anthropic',
      key: 'sk-ant-api03-abcdef...',
      status: 'active',
      lastUsed: '5 minutes ago',
      requests: 834,
      expiresAt: '2024-04-22',
      scope: ['text-analysis', 'conversation'],
    },
    {
      id: 3,
      name: 'Google Gemini Pro',
      service: 'Google',
      key: 'AIzaSyC1234567890...',
      status: 'expiring',
      lastUsed: '1 hour ago',
      requests: 456,
      expiresAt: '2024-01-08',
      scope: ['multimodal', 'vision'],
    },
    {
      id: 4,
      name: 'Stability AI',
      service: 'Stability',
      key: 'sk-1234567890abcdef...',
      status: 'inactive',
      lastUsed: '3 days ago',
      requests: 123,
      expiresAt: '2024-06-30',
      scope: ['image-generation'],
    },
  ];

  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
            ACTIVE
          </Badge>
        );
      case 'expiring':
        return (
          <Badge className="bg-amber-warning/20 text-amber-warning border-amber-warning/50">
            EXPIRING
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-red-error/20 text-red-error border-red-error/50">
            INACTIVE
          </Badge>
        );
      default:
        return null;
    }
  };

  const maskKey = (key: string) => {
    return key.substring(0, 8) + '••••••••••••••••';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-terminal font-bold text-neon-green glow-text">
            API Key Management
          </h1>
          <p className="text-neon-green/70 font-terminal mt-1">
            Secure credential storage and semantic mapping
          </p>
        </div>
        <Button
          variant="terminal"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Key
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-terminal-dark border-neon-green/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-neon-green" />
              <div>
                <div className="text-xl font-bold text-neon-green font-terminal">
                  {apiKeys.filter(k => k.status === 'active').length}
                </div>
                <div className="text-xs text-neon-green/60">Active Keys</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-terminal-dark border-electric-blue/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-electric-blue" />
              <div>
                <div className="text-xl font-bold text-electric-blue font-terminal">
                  {apiKeys.reduce((sum, k) => sum + k.requests, 0).toLocaleString()}
                </div>
                <div className="text-xs text-electric-blue/60">Total Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-terminal-dark border-amber-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-warning" />
              <div>
                <div className="text-xl font-bold text-amber-warning font-terminal">
                  {apiKeys.filter(k => k.status === 'expiring').length}
                </div>
                <div className="text-xs text-amber-warning/60">Expiring Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-terminal-dark border-cyan-accent/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-accent" />
              <div>
                <div className="text-xl font-bold text-cyan-accent font-terminal">
                  {new Set(apiKeys.flatMap(k => k.scope)).size}
                </div>
                <div className="text-xs text-cyan-accent/60">Unique Scopes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="bg-terminal-dark border-neon-green/30 hover:border-neon-green/50 transition-all duration-300 glow-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-neon-green" />
                  <div>
                    <CardTitle className="text-neon-green font-terminal">
                      {apiKey.name}
                    </CardTitle>
                    <p className="text-sm text-neon-green/60 font-terminal">
                      {apiKey.service} • {apiKey.scope.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(apiKey.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Key Display */}
                <div className="space-y-2">
                  <label className="text-xs font-terminal text-neon-green/70 uppercase">
                    API Key
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-terminal-darker border border-neon-green/20 rounded-sm text-sm font-terminal text-neon-green">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys.has(apiKey.id) ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-terminal text-neon-green/70 uppercase">
                      Last Used
                    </label>
                    <div className="text-sm font-terminal text-electric-blue">
                      {apiKey.lastUsed}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-terminal text-neon-green/70 uppercase">
                      Requests
                    </label>
                    <div className="text-sm font-terminal text-electric-blue">
                      {apiKey.requests.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="ml-auto text-right">
                    <div className="text-xs font-terminal text-neon-green/70 uppercase">
                      Expires
                    </div>
                    <div className={`text-sm font-terminal ${
                      apiKey.status === 'expiring' ? 'text-amber-warning' : 'text-electric-blue'
                    }`}>
                      {apiKey.expiresAt}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}