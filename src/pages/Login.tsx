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
    userId: "demo1",
    password: "pass1",
    role: "Administrator",
    status: "available",
    lastUsed: "2 hours ago",
    features: ["Full Access", "Analytics", "Key Management"]
  },
  {
    userId: "demo2",
    password: "pass2",
    role: "Developer",
    status: "available",
    lastUsed: "5 minutes ago",
    features: ["API Access", "Intent Queries", "Basic Analytics"]
  },
  {
    userId: "demo3",
    password: "pass3",
    role: "Viewer",
    status: "available",
    lastUsed: "1 day ago",
    features: ["Read Only", "View Analytics", "Intent History"]
  }
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDemoSelect = (demoId: string) => {
    const demo = demoAccounts.find(d => d.userId === demoId);
    if (demo) {
      setUserId(() => demo.userId);
      setPassword(() => demo.password);
      setSelectedDemo(() => demoId);
      setError("");
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const payload = { userId, password };
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("session_token", data.token);
        toast({
          title: "Login Successful",
          description: `Welcome, ${userId}!`,
        });
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed");
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (e) {
      setError("Network error");
      toast({
        title: "Login Failed",
        description: "Network error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                <Label htmlFor="userId" className="text-neon-green font-mono">User ID</Label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="Enter userId"
                  className="bg-terminal-black border-neon-green/40 text-neon-green font-mono"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-neon-green font-mono">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-terminal-black border-neon-green/40 text-neon-green font-mono"
                  autoComplete="current-password"
                />
              </div>
              {error && <div className="text-red-400 font-mono text-xs">{error}</div>}
              <Button 
                variant="cyber" 
                className="w-full font-mono"
                onClick={handleLogin}
                disabled={isLoading || !userId || !password}
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
              key={demo.userId}
              className={`bg-terminal-black/60 border-neon-green/20 hover:border-electric-blue/40 transition-colors cursor-pointer ${
                selectedDemo === demo.userId ? 'border-electric-blue/60 bg-electric-blue/5' : ''
              }`}
              onClick={() => handleDemoSelect(demo.userId)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-electric-blue" />
                    <span className="font-mono text-neon-green font-bold">{demo.userId}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neon-green/60 font-mono">{demo.role}</span>
                  <Badge 
                    variant="outline" 
                    className="text-xs font-mono bg-neon-green/10 text-neon-green/70 border-neon-green/30"
                  >
                    Available
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
                    onClick={async e => {
                      e.stopPropagation();
                      handleDemoSelect(demo.userId);
                      // Wait for React state to update before login
                      setTimeout(() => {
                        handleLogin();
                      }, 100);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && selectedDemo === demo.userId ? "Connecting..." : "Use Account"}
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