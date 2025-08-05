import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Terminal, Shield, Zap, Brain } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-terminal-black text-neon-green">
      {/* Header */}
      <header className="border-b border-neon-green/20 bg-terminal-black/90 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-electric-blue" />
            <span className="text-xl font-mono font-bold text-neon-green">SmartAPIKey</span>
          </div>
          {/* <Button 
            variant="cyber" 
            onClick={() => navigate('/login')}
            className="font-mono"
          >
            Try Demo
          </Button> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 text-neon-green">
            Smart<span className="text-electric-blue">API</span>Key
          </h1>
          <p className="text-xl md:text-2xl text-neon-green/80 mb-8 font-mono">
            Semantic API Gateway Web App
          </p>
          
          {/* CTA Button */}
          <Button 
            variant="cyber" 
            size="lg"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-4 font-mono animate-pulse-glow"
          >
            <Terminal className="mr-2 h-5 w-5" />
            Launch Demo
          </Button>
        </div>

        {/* Explanation Content Area - Placeholder */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-terminal-black/50 border border-neon-green/20 rounded-lg p-8 backdrop-blur">
            <h2 className="text-2xl font-mono font-bold text-electric-blue mb-6">
              {/* Content placeholder - user will update */}
              Project Overview
            </h2>
            <div className="space-y-4 text-neon-green/80 font-mono">
              <p>
                [Space reserved for project explanation content]
              </p>
              <p>
                [User will update this section with detailed information]
              </p>
              <p>
                [About semantic intent-driven API key management]
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-terminal-black/50 border border-neon-green/20 rounded-lg p-6 hover:border-electric-blue/40 transition-colors">
            <Shield className="h-12 w-12 text-electric-blue mb-4" />
            <h3 className="text-xl font-mono font-bold text-neon-green mb-2">Secure</h3>
            <p className="text-neon-green/70 font-mono">Enterprise-grade security for API key management</p>
          </div>
          
          <div className="bg-terminal-black/50 border border-neon-green/20 rounded-lg p-6 hover:border-electric-blue/40 transition-colors">
            <Brain className="h-12 w-12 text-electric-blue mb-4" />
            <h3 className="text-xl font-mono font-bold text-neon-green mb-2">Smart</h3>
            <p className="text-neon-green/70 font-mono">AI-powered semantic intent recognition</p>
          </div>
          
          <div className="bg-terminal-black/50 border border-neon-green/20 rounded-lg p-6 hover:border-electric-blue/40 transition-colors">
            <Zap className="h-12 w-12 text-electric-blue mb-4" />
            <h3 className="text-xl font-mono font-bold text-neon-green mb-2">Fast</h3>
            <p className="text-neon-green/70 font-mono">Lightning-fast API routing and response</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neon-green/20 bg-terminal-black/90 backdrop-blur py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-neon-green/60 font-mono">
            &copy; 2024 SmartAPIKey. CRT-powered semantic intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;