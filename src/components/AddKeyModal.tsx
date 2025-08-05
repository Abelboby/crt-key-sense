import { useState } from 'react';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Key,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
} from 'lucide-react';

interface AddKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddKeyModal({ isOpen, onClose }: AddKeyModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sessionToken = typeof window !== 'undefined' ? localStorage.getItem('session_token') || '' : '';
  const [formData, setFormData] = useState({
    template: '', // moved to top
    name: '',
    service: '',
    apiKey: '',
    token: sessionToken,
    description: '',
    scope: '',
    maxRequestsPerDay: '',
    maxRequestsPerWeek: '',
    maxTokensPerDay: '',
    maxPayloadKb: '',
    expiryDate: '',
    allowedOrigins: '',
  });

  // Keep token in sync with global session token
  useEffect(() => {
    setFormData(prev => ({ ...prev, token: sessionToken }));
  }, [sessionToken, isOpen]);

  const [completionPercentage, setCompletionPercentage] = useState(0);

  const services = [
    'Google',
  ];

  // Template options
  const templateOptions = [
    {
      value: 'gemini-chat-completion',
      label: 'Gemini Chat Completion Demo',
      autofill: {
        name: 'Gemini Chat Completion',
        service: 'Google',
        description: 'Google Gemini for advanced chat completion',
        scope: 'chat-completion,gemini',
        maxRequestsPerDay: '1000',
        maxRequestsPerWeek: '5000',
        maxTokensPerDay: '100000',
        maxPayloadKb: '512',
        expiryDate: '',
        allowedOrigins: 'https://myapp.com, https://staging.myapp.com',
      }
    }
  ];

  // Handle template change and autofill
  const handleTemplateChange = (value: string) => {
    setFormData(prev => {
      const selected = templateOptions.find(t => t.value === value);
      if (selected) {
        return {
          ...prev,
          template: value,
          ...selected.autofill
        };
      }
      return { ...prev, template: value };
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Calculate completion percentage
    const filled = Object.values({ ...formData, [field]: value })
      .filter(v => v.length > 0).length;
    setCompletionPercentage((filled / 13) * 100);
  };

  const getKeyStrength = (key: string) => {
    if (key.length < 10) return { strength: 'weak', color: 'text-red-error' };
    if (key.length < 30) return { strength: 'medium', color: 'text-amber-warning' };
    return { strength: 'strong', color: 'text-neon-green' };
  };

  const isPage1Valid = () => {
    return formData.name && formData.service && formData.apiKey && formData.scope;
  };

  const isPage2Valid = () => {
    return true; // Page 2 fields are optional
  };

  const handleNext = () => {
    if (currentPage === 1 && isPage1Valid()) {
      setCurrentPage(2);
    }
  };

  const handlePrevious = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const handleSubmit = () => {
    // Integrate API key adding endpoint
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // Prepare payload as per API docs
    const payload = {
      token: formData.token,
      api_key: formData.apiKey,
      description: formData.description,
      template: formData.template || (templateOptions[0]?.value ?? ''),
      max_requests_per_day: Number(formData.maxRequestsPerDay) || undefined,
      max_requests_per_week: Number(formData.maxRequestsPerWeek) || undefined,
      max_tokens_per_day: Number(formData.maxTokensPerDay) || undefined,
      max_payload_kb: Number(formData.maxPayloadKb) || undefined,
      expiry_date: formData.expiryDate || undefined,
      allowed_origins: formData.allowedOrigins ? formData.allowedOrigins.split(',').map(o => o.trim()) : undefined,
      scopes: formData.scope ? formData.scope.split(',').map(s => s.trim()) : undefined,
    };
    fetch(`${backendUrl}/auth/add-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('API key added successfully!');
          onClose();
        } else {
          alert(data.error || 'Failed to add API key');
        }
      })
      .catch(() => {
        alert('Network error');
      });
  };

  const renderPage1 = () => (
    <div className="space-y-6">
      {/* Template Dropdown at Top */}
      <div className="space-y-2">
        <Label className="text-neon-green font-terminal text-sm">API Template *</Label>
        <select
          value={formData.template}
          onChange={e => handleTemplateChange(e.target.value)}
          className="terminal-input w-full h-10 px-3 py-2 rounded-sm"
        >
          <option value="">Select template...</option>
          {templateOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <p className="text-xs text-neon-green/60 font-terminal">Choose a template for your API key</p>
      </div>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-terminal">
          <span className="text-neon-green/70">Step 1 of 2 - Basic Information</span>
          <span className="text-neon-green">{Math.round(completionPercentage)}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2 bg-terminal-darker" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Name */}
        <div className="space-y-2">
          <Label className="text-neon-green font-terminal text-sm">
            Service Name *
          </Label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Gemini Chat Completion"
            className="terminal-input"
          />
          <p className="text-xs text-neon-green/60 font-terminal">
            Human-readable identifier for this key
          </p>
        </div>

        {/* Service Provider */}
        <div className="space-y-2">
          <Label className="text-neon-green font-terminal text-sm">
            Provider *
          </Label>
          <select
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className="terminal-input w-full h-10 px-3 py-2 rounded-sm"
          >
            <option value="">Select provider...</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      {/* API Key */}
      <div className="space-y-2">
        <Label className="text-neon-green font-terminal text-sm flex items-center gap-2">
          <Shield className="w-4 h-4" />
          API Key *
        </Label>
        <Input
          type="password"
          value={formData.apiKey}
          onChange={(e) => handleInputChange('apiKey', e.target.value)}
          placeholder="Enter your API key..."
          className="terminal-input font-mono"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-neon-green/60 font-terminal">
            Keys are encrypted with AES-256 before storage
          </p>
          {formData.apiKey && (
            <Badge 
              variant="outline" 
              className={`text-xs font-terminal ${getKeyStrength(formData.apiKey).color} border-current`}
            >
              {getKeyStrength(formData.apiKey).strength} key
            </Badge>
          )}
        </div>
      </div>

      {/* Scope/Permissions */}
      <div className="space-y-2">
        <Label className="text-neon-green font-terminal text-sm">
          Scopes *
        </Label>
        <Input
          value={formData.scope}
          onChange={(e) => handleInputChange('scope', e.target.value)}
          placeholder="e.g., text-generation, code-completion, image-analysis"
          className="terminal-input"
        />
        <p className="text-xs text-neon-green/60 font-terminal">
          Comma-separated list of intended use cases for semantic matching
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-neon-green font-terminal text-sm">
          Description (Optional)
        </Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Additional notes about this API key..."
          className="terminal-input h-20 resize-none"
        />
      </div>

      {/* Token & Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-neon-green font-terminal text-sm">
            Token
          </Label>
          <Input
            value={formData.token}
            onChange={(e) => handleInputChange('token', e.target.value)}
            placeholder="e.g., eca8d79e7cf3494f"
            className="terminal-input font-mono"
          />
          <p className="text-xs text-neon-green/60 font-terminal">
            Unique identifier for this API key
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-neon-green/20">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="terminal" 
          onClick={handleNext}
          disabled={!isPage1Valid()}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderPage2 = () => {
    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-terminal">
            <span className="text-neon-green/70">Step 2 of 2 - Advanced Settings</span>
            <span className="text-neon-green">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-terminal-darker" />
        </div>

        {/* Rate Limits */}
        <div className="space-y-4">
          <Label className="text-neon-green font-terminal text-base flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Rate Limits & Quotas
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-neon-green font-terminal text-sm">
                Max Requests/Day
              </Label>
              <Input
                type="number"
                value={formData.maxRequestsPerDay}
                onChange={(e) => handleInputChange('maxRequestsPerDay', e.target.value)}
                placeholder="e.g., 500"
                className="terminal-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-neon-green font-terminal text-sm">
                Max Requests/Week
              </Label>
              <Input
                type="number"
                value={formData.maxRequestsPerWeek}
                onChange={(e) => handleInputChange('maxRequestsPerWeek', e.target.value)}
                placeholder="e.g., 2000"
                className="terminal-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-neon-green font-terminal text-sm">
                Max Tokens/Day
              </Label>
              <Input
                type="number"
                value={formData.maxTokensPerDay}
                onChange={(e) => handleInputChange('maxTokensPerDay', e.target.value)}
                placeholder="e.g., 50000"
                className="terminal-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-neon-green font-terminal text-sm">
                Max Payload (KB)
              </Label>
              <Input
                type="number"
                value={formData.maxPayloadKb}
                onChange={(e) => handleInputChange('maxPayloadKb', e.target.value)}
                placeholder="e.g., 1000"
                className="terminal-input"
              />
            </div>
          </div>
        </div>

        {/* Expiry & Origins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-neon-green font-terminal text-sm">
              Expiry Date
            </Label>
            <Input
              type="datetime-local"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className="terminal-input"
            />
            <p className="text-xs text-neon-green/60 font-terminal">
              When this API key expires
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-neon-green font-terminal text-sm">
              Allowed Origins
            </Label>
            <Textarea
              value={formData.allowedOrigins}
              onChange={(e) => handleInputChange('allowedOrigins', e.target.value)}
              placeholder="https://myapp.com, https://staging.myapp.com"
              className="terminal-input h-16 resize-none"
            />
            <p className="text-xs text-neon-green/60 font-terminal">
              Comma-separated list of allowed domains
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-3 bg-terminal-darker border border-electric-blue/30 rounded-sm">
          <Info className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
          <div className="text-sm font-terminal text-electric-blue/80">
            <div className="font-semibold mb-1">Security Features Active</div>
            <ul className="text-xs space-y-1 text-electric-blue/60">
              <li>• End-to-end encryption with AES-256</li>
              <li>• Automatic key rotation reminders</li>
              <li>• Audit logging for all access attempts</li>
              <li>• Semantic intent validation</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-neon-green/20">
          <Button variant="outline" onClick={handlePrevious} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary">
              Test Connection
            </Button>
            <Button 
              variant="terminal" 
              onClick={handleSubmit}
              disabled={completionPercentage < 80}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Add Key
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-terminal-dark border-neon-green/30 glow-border">
        <DialogHeader>
          <DialogTitle className="text-neon-green font-terminal text-xl flex items-center gap-2">
            <Key className="w-6 h-6" />
            Add New API Key
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${currentPage === 1 ? 'bg-neon-green' : 'bg-neon-green/30'}`} />
                <div className={`w-2 h-2 rounded-full ${currentPage === 2 ? 'bg-neon-green' : 'bg-neon-green/30'}`} />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="transition-all duration-300 ease-in-out">
          {currentPage === 1 ? renderPage1() : renderPage2()}
        </div>
      </DialogContent>
    </Dialog>
  );
}