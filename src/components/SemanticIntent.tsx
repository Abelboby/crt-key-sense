import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import {
  Brain,
  Send,
  History,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export function SemanticIntent() {
  const [intent, setIntent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const [intentHistory] = useState([
    {
      id: 1,
      intent: 'Generate a blog post about AI trends',
      matchedKey: 'OpenAI GPT-4',
      confidence: 98.7,
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      intent: 'Analyze code for security vulnerabilities',
      matchedKey: 'Anthropic Claude',
      confidence: 94.2,
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      intent: 'Create product mockup images',
      matchedKey: 'Stability AI',
      confidence: 91.8,
      timestamp: '12 minutes ago',
    },
  ]);

  const handleSubmit = async () => {
    if (!intent.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setLastResult({
        intent: intent,
        matchedKey: 'OpenAI GPT-4',
        confidence: 96.3,
        reasoning: 'High semantic similarity to text generation tasks',
        alternatives: [
          { key: 'Anthropic Claude', confidence: 87.2 },
          { key: 'Google Gemini', confidence: 82.1 },
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-neon-green';
    if (confidence >= 85) return 'text-electric-blue';
    if (confidence >= 75) return 'text-amber-warning';
    return 'text-red-error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-terminal font-bold text-neon-green glow-text">
            Semantic Intent Input
          </h1>
          <p className="text-neon-green/70 font-terminal mt-1">
            Describe your intent in natural language // AI will find the best API key
          </p>
        </div>
        <Badge variant="outline" className="border-electric-blue/50 text-electric-blue animate-pulse-slow">
          <Brain className="w-3 h-3 mr-1" />
          Neural Network Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Intent Input */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-terminal-dark border-neon-green/30 glow-border">
            <CardHeader>
              <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
                <Brain className="w-5 h-5 animate-pulse" />
                Intent Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="Describe what you want to accomplish... e.g., 'Generate creative writing content for a science fiction story' or 'Analyze customer feedback sentiment'"
                  className="terminal-input h-32 resize-none text-base"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-terminal text-neon-green/60">
                    {intent.length}/500 characters
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!intent.trim()}
                    >
                      Template Override
                    </Button>
                    <Button
                      variant="terminal"
                      onClick={handleSubmit}
                      disabled={!intent.trim() || isProcessing}
                      className="gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Analyze Intent
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <div className="space-y-3 p-4 bg-terminal-darker border border-electric-blue/20 rounded-sm">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-electric-blue animate-pulse" />
                    <span className="text-sm font-terminal text-electric-blue">
                      Neural processing in progress...
                    </span>
                  </div>
                  <Progress value={65} className="h-2 bg-terminal-black" />
                  <div className="text-xs font-terminal text-electric-blue/70">
                    Analyzing semantic vectors • Matching intent patterns • Calculating confidence scores
                  </div>
                </div>
              )}

              {/* Results */}
              {lastResult && !isProcessing && (
                <div className="space-y-4 p-4 bg-terminal-darker border border-neon-green/20 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-neon-green" />
                      <span className="font-terminal text-neon-green font-semibold">
                        Match Found
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`font-terminal ${getConfidenceColor(lastResult.confidence)} border-current`}
                    >
                      {lastResult.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-terminal text-neon-green/70 uppercase">
                        Selected API Key
                      </label>
                      <div className="text-lg font-terminal text-neon-green glow-text">
                        {lastResult.matchedKey}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-terminal text-neon-green/70 uppercase">
                        Reasoning
                      </label>
                      <div className="text-sm font-terminal text-electric-blue">
                        {lastResult.reasoning}
                      </div>
                    </div>
                  </div>

                  {/* Alternative Matches */}
                  <div className="space-y-2">
                    <label className="text-xs font-terminal text-neon-green/70 uppercase">
                      Alternative Matches
                    </label>
                    {lastResult.alternatives.map((alt: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-terminal-black border border-neon-green/10 rounded-sm">
                        <span className="text-sm font-terminal text-neon-green/80">
                          {alt.key}
                        </span>
                        <Badge variant="outline" className="text-xs font-terminal text-electric-blue/80 border-electric-blue/30">
                          {alt.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button variant="cyber" className="w-full gap-2">
                    <Zap className="w-4 h-4" />
                    Execute with {lastResult.matchedKey}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History & Templates */}
        <div className="space-y-4">
          {/* Recent History */}
          <Card className="bg-terminal-dark border-neon-green/30 glow-border">
            <CardHeader>
              <CardTitle className="text-neon-green font-terminal flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Intents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {intentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-terminal-darker border border-neon-green/20 rounded-sm hover:border-neon-green/40 transition-colors cursor-pointer"
                    onClick={() => setIntent(item.intent)}
                  >
                    <div className="text-sm font-terminal text-neon-green truncate">
                      {item.intent}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-terminal text-electric-blue">
                        {item.matchedKey}
                      </span>
                      <Badge variant="outline" className="text-xs font-terminal text-neon-green/80 border-neon-green/30">
                        {item.confidence}%
                      </Badge>
                    </div>
                    <div className="text-xs font-terminal text-neon-green/40 mt-1">
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-terminal-dark border-electric-blue/30">
            <CardHeader>
              <CardTitle className="text-electric-blue font-terminal flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Generate creative content',
                  'Analyze data patterns',
                  'Create visual assets',
                  'Process natural language',
                  'Code assistance needed',
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => setIntent(template)}
                  >
                    <ArrowRight className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="text-xs">{template}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}