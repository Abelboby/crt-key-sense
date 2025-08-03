import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Terminal, User, Shield, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const demoAccounts = [
  {
    id: "demo1",
    username: "admin_demo",
    role: "Administrator",
    status: "available",
    lastUsed: "2 hours ago",
    features: ["Full Access", "Analytics", "Key Management"]
  },
  {
    id: "demo2", 
    username: "dev_demo",
    role: "Developer",
    status: "in_use",
    lastUsed: "5 minutes ago",
    features: ["API Access", "Intent Queries", "Basic Analytics"]
  },
  {
    id: "demo3",
    username: "viewer_demo", 
    role: "Viewer",
    status: "available",
    lastUsed: "1 day ago",
    features: ["Read Only", "View Analytics", "Intent History"]
  },
  {
    id: "demo4",
    username: "test_demo",
    role: "Tester",
    status: "maintenance",
    lastUsed: "30 minutes ago", 
    features: ["Testing Suite", "API Playground", "Debug Mode"]
  }
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="h-4 w-4 text-neon-green" />;
      case "in_use":
        return <Clock className="h-4 w-4 text-amber-400" />;
      case "maintenance":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-neon-green" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "in_use":
        return "In Use";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-neon-green/20 text-neon-green border-neon-green/40";
      case "in_use":
        return "bg-amber-400/20 text-amber-400 border-amber-400/40";
      case "maintenance":
        return "bg-red-400/20 text-red-400 border-red-400/40";
      default:
        return "bg-neon-green/20 text-neon-green border-neon-green/40";
    }
  };

  const handleDemoLogin = async (demoId: string) => {
    const demo = demoAccounts.find(d => d.id === demoId);
    if (!demo) return;

    if (demo.status !== "available") {
      toast({
        title: "Account Unavailable",
        description: `${demo.username} is currently ${demo.status}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: `Welcome, ${demo.username}!`,
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleRegularLogin = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome to SmartAPIKey!",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-terminal-black text-neon-green flex">
      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Terminal className="h-8 w-8 text-electric-blue" />
              <span className="text-2xl font-mono font-bold text-neon-green">SmartAPIKey</span>
            </div>
            <p className="text-neon-green/60 font-mono">Access the semantic gateway</p>
          </div>

          {/* Login Form */}
          <Card className="bg-terminal-black/50 border-neon-green/20">
            <CardHeader>
              <CardTitle className="text-neon-green font-mono">Login</CardTitle>
              <CardDescription className="text-neon-green/60 font-mono">
                Enter your credentials or try a demo account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-neon-green font-mono">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  className="bg-terminal-black border-neon-green/40 text-neon-green font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-neon-green font-mono">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="bg-terminal-black border-neon-green/40 text-neon-green font-mono"
                />
              </div>
              <Button 
                variant="cyber" 
                className="w-full font-mono"
                onClick={handleRegularLogin}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demo Accounts Sidebar */}
      <div className="w-80 bg-terminal-black/80 border-l border-neon-green/20 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-mono font-bold text-electric-blue mb-2">Demo Accounts</h2>
          <p className="text-sm text-neon-green/60 font-mono">
            Try the platform with pre-configured accounts
          </p>
        </div>

        <div className="space-y-4">
          {demoAccounts.map((demo) => (
            <Card 
              key={demo.id}
              className={`bg-terminal-black/60 border-neon-green/20 hover:border-electric-blue/40 transition-colors cursor-pointer ${
                selectedDemo === demo.id ? 'border-electric-blue/60 bg-electric-blue/5' : ''
              }`}
              onClick={() => setSelectedDemo(demo.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-electric-blue" />
                    <span className="font-mono text-neon-green font-bold">{demo.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(demo.status)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neon-green/60 font-mono">{demo.role}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-mono ${getStatusColor(demo.status)}`}
                  >
                    {getStatusText(demo.status)}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-neon-green/50 font-mono mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {demo.features.map((feature, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs bg-neon-green/10 text-neon-green/70 border-neon-green/30"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neon-green/50 font-mono">
                    Last used: {demo.lastUsed}
                  </span>
                  <Button
                    variant="terminal"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDemoLogin(demo.id);
                    }}
                    disabled={demo.status !== "available" || isLoading}
                  >
                    {isLoading && selectedDemo === demo.id ? "Connecting..." : "Use Account"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-terminal-black/40 border border-neon-green/20 rounded">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-electric-blue" />
            <span className="text-sm font-mono text-neon-green">Demo Info</span>
          </div>
          <p className="text-xs text-neon-green/60 font-mono">
            Demo accounts are reset daily. All data is temporary and for testing purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;