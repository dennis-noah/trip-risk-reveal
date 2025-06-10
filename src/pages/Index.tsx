
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Lock, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    creditCard: '',
    cvv: '',
    ssn: '',
    destination: '',
    specialRequests: ''
  });
  
  const [exposedData, setExposedData] = useState({});
  const { toast } = useToast();

  // VULNERABILITY 1: Exposed API credentials in client-side code
  const API_KEY = "sk-1234567890abcdef-SUPER-SECRET-KEY";
  const DATABASE_PASSWORD = "admin123!@#";
  const JWT_SECRET = "my-super-secret-jwt-token-12345";

  // VULNERABILITY 2: No input validation
  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // VULNERABILITY 3: Logging sensitive data
    console.log(`User input for ${field}:`, value);
    console.log('Full booking data:', { ...bookingData, [field]: value });
  };

  // VULNERABILITY 4: Insecure form submission
  const handleSubmit = async () => {
    // VULNERABILITY 5: No CSRF protection, no authentication
    
    // Simulate API call with exposed credentials
    const payload = {
      ...bookingData,
      apiKey: API_KEY,
      dbPassword: DATABASE_PASSWORD,
      timestamp: new Date().toISOString()
    };

    // VULNERABILITY 6: Sensitive data in localStorage
    localStorage.setItem('userBookingData', JSON.stringify(payload));
    localStorage.setItem('apiCredentials', JSON.stringify({
      key: API_KEY,
      dbPassword: DATABASE_PASSWORD,
      jwtSecret: JWT_SECRET
    }));

    // VULNERABILITY 7: Exposing internal system information
    setExposedData({
      internalUserId: Math.floor(Math.random() * 100000),
      serverPath: '/var/www/travel-app/uploads/',
      databaseHost: 'prod-db-001.internal.company.com',
      adminEmail: 'admin@travelcompany.com',
      debugMode: true,
      version: '1.2.3-beta',
      ...payload
    });

    toast({
      title: "⚠️ Booking Submitted (Insecurely!)",
      description: "Check the console and localStorage for exposed data!",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VulnTravel</h1>
                <p className="text-sm text-red-600">⚠️ Intentionally Vulnerable Demo App</p>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              SECURITY RISKS DEMO
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Educational Purpose Only:</strong> This application intentionally contains security vulnerabilities 
            to demonstrate risks of poor coding practices. Never use these patterns in production!
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="booking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="booking">Vulnerable Booking Form</TabsTrigger>
            <TabsTrigger value="exposed">Exposed Data</TabsTrigger>
            <TabsTrigger value="risks">Security Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Book Your Dream Vacation</span>
                  <Badge variant="destructive" className="text-xs">VULNERABLE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ No input sanitization</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ No email validation</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ Stored in plain text</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creditCard">Credit Card Number *</Label>
                    <Input
                      id="creditCard"
                      placeholder="1234 5678 9012 3456"
                      value={bookingData.creditCard}
                      onChange={(e) => handleInputChange('creditCard', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ Logged in console & localStorage</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      maxLength={4}
                      value={bookingData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ No encryption</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <Input
                      id="ssn"
                      placeholder="123-45-6789"
                      value={bookingData.ssn}
                      onChange={(e) => handleInputChange('ssn', e.target.value)}
                    />
                    <p className="text-xs text-red-500">⚠️ Completely unprotected</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select onValueChange={(value) => handleInputChange('destination', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Paris, France</SelectItem>
                      <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                      <SelectItem value="nyc">New York City, USA</SelectItem>
                      <SelectItem value="london">London, UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special accommodations or requests..."
                    value={bookingData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  />
                  <p className="text-xs text-red-500">⚠️ Vulnerable to XSS injection</p>
                </div>

                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Book Now (Insecurely!)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exposed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Exposed Sensitive Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <Lock className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      The following sensitive information is exposed in the client-side code and browser storage:
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="text-red-400">// Hardcoded API Credentials (visible in source code)</div>
                    <div>API_KEY: "{API_KEY}"</div>
                    <div>DATABASE_PASSWORD: "{DATABASE_PASSWORD}"</div>
                    <div>JWT_SECRET: "{JWT_SECRET}"</div>
                    <br />
                    <div className="text-red-400">// User Data (check localStorage & console)</div>
                    <pre>{JSON.stringify(exposedData, null, 2)}</pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-red-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-red-600">Browser Storage Leaks</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-1 text-gray-600">
                          <li>• Credit card data in localStorage</li>
                          <li>• API keys stored client-side</li>
                          <li>• Personal information unencrypted</li>
                          <li>• Session data exposed</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-red-600">Console Exposure</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-1 text-gray-600">
                          <li>• Real-time input logging</li>
                          <li>• Sensitive data in console.log</li>
                          <li>• Internal system paths</li>
                          <li>• Database connection strings</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Critical Vulnerabilities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">1. Exposed API Credentials</h4>
                    <p className="text-sm text-gray-600">API keys and passwords hardcoded in client-side JavaScript</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">2. No Input Validation</h4>
                    <p className="text-sm text-gray-600">Forms accept any input without sanitization or validation</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">3. Sensitive Data Logging</h4>
                    <p className="text-sm text-gray-600">Credit cards, SSN, and personal data logged to console</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">4. Insecure Storage</h4>
                    <p className="text-sm text-gray-600">Sensitive data stored unencrypted in localStorage</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Additional Security Issues</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">5. XSS Vulnerability</h4>
                    <p className="text-sm text-gray-600">Text areas susceptible to cross-site scripting attacks</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">6. No CSRF Protection</h4>
                    <p className="text-sm text-gray-600">Forms can be submitted from external sites</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">7. Information Disclosure</h4>
                    <p className="text-sm text-gray-600">Internal system information exposed to clients</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">8. No Authentication</h4>
                    <p className="text-sm text-gray-600">Anyone can access and submit sensitive forms</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>How to Fix These Issues</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-green-800">
                <p>• Never store API keys or secrets in client-side code</p>
                <p>• Implement proper input validation and sanitization</p>
                <p>• Use HTTPS and encrypt sensitive data</p>
                <p>• Implement proper authentication and authorization</p>
                <p>• Add CSRF protection to forms</p>
                <p>• Never log sensitive information</p>
                <p>• Use secure session management</p>
                <p>• Implement Content Security Policy (CSP)</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
