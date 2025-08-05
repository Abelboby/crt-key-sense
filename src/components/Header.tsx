import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SidebarTrigger } from './ui/sidebar';
import { Terminal, Shield, Clock, User, LogOut } from 'lucide-react';
import { Copy } from 'lucide-react';

export function Header() {
  // Get session token from localStorage
  const [apiToken, setApiToken] = useState<string | null>(null);
  useEffect(() => {
    setApiToken(localStorage.getItem("session_token"));
    // Listen for token changes (e.g., after login)
    window.addEventListener("storage", () => {
      setApiToken(localStorage.getItem("session_token"));
    });
    return () => {
      window.removeEventListener("storage", () => {
        setApiToken(localStorage.getItem("session_token"));
      });
    };
  }, []);

  const handleCopyToken = () => {
    if (apiToken) {
      navigator.clipboard.writeText(apiToken);
      alert("API token copied to clipboard!");
    }
  };
  // Demo credentials (default to demo1)
  const demoAccounts = [
    { userId: "demo1", password: "pass1" },
    { userId: "demo2", password: "pass2" },
    { userId: "demo3", password: "pass3" }
  ];
  const demoCreds = demoAccounts[0];

  const handleLogout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const payload = { userId: demoCreds.userId, password: demoCreds.password };
    try {
      const res = await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("session_token");
        window.location.href = "/";
      } else {
        alert(data.error || "Logout failed");
      }
    } catch (e) {
      alert("Network error");
    }
  };
  const [sessionTime, setSessionTime] = useState(1847); // Seconds remaining

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-16 border-b border-neon-green/30 bg-terminal-darker flex items-center justify-between px-6 glow-border">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-neon-green hover:text-neon-green-glow" />
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-neon-green animate-pulse-slow" />
          <span className="text-xl font-terminal font-bold text-neon-green glow-text">
            SmartAPIKey
          </span>
          <Badge variant="outline" className="text-xs border-neon-green/50 text-neon-green">
            v2.1.3
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Session Status */}
        <div className="flex items-center gap-2 px-3 py-1 bg-terminal-dark border border-neon-green/40 rounded-sm">
          <Shield className="w-4 h-4 text-neon-green" />
          <span className="text-xs font-terminal text-neon-green">SECURE</span>
        </div>

        {/* Session Timer */}
        <div className="flex items-center gap-2 px-3 py-1 bg-terminal-dark border border-amber-warning/60 rounded-sm">
          <Clock className={`w-4 h-4 ${sessionTime < 300 ? 'text-red-error animate-pulse' : 'text-amber-warning'}`} />
          <span className={`text-xs font-terminal ${sessionTime < 300 ? 'text-red-error' : 'text-amber-warning'}`}>
            {formatTime(sessionTime)}
          </span>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">dev@terminal</span>
          </Button>
          {apiToken && (
            <div className="flex items-center gap-1 bg-terminal-dark border border-neon-green/40 rounded px-2 py-1">
              <span className="text-xs font-mono text-neon-green truncate max-w-[120px]" title={apiToken}>{apiToken}</span>
              <button
                type="button"
                className="inline-flex items-center px-2 py-1 text-xs font-mono text-neon-green border border-neon-green/40 rounded hover:bg-neon-green/10 focus:outline-none focus:ring-2 focus:ring-neon-green/50"
                onClick={handleCopyToken}
                title="Copy API Token"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}