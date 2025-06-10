
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, MapPin, Calendar, Star, Heart, Sparkles, Plane, Gift, Trophy, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [points, setPoints] = useState(0);
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
  const [completedFields, setCompletedFields] = useState(new Set());
  const { toast } = useToast();

  // API credentials and configuration
  const API_KEY = "sk-1234567890abcdef-SUPER-SECRET-KEY";
  const DATABASE_PASSWORD = "admin123!@#";
  const JWT_SECRET = "my-super-secret-jwt-token-12345";

  const steps = [
    { title: "✨ Tell Us About You", icon: Star, color: "text-pink-500" },
    { title: "💳 Payment Magic", icon: Zap, color: "text-yellow-500" },
    { title: "🌎 Dream Destination", icon: Plane, color: "text-blue-500" },
    { title: "🎁 Special Treats", icon: Gift, color: "text-green-500" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // Add points for completing fields
    if (value && !completedFields.has(field)) {
      setPoints(prev => prev + 100);
      setCompletedFields(prev => new Set([...prev, field]));
      
      toast({
        title: "🎉 Amazing Progress!",
        description: `+100 points! You're becoming a travel champion!`,
      });
    }
    
    // Log user input for debugging
    console.log(`🌟 User shared ${field}:`, value);
    console.log('📊 Complete travel profile:', { ...bookingData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setPoints(prev => prev + 250);
      toast({
        title: "🚀 Level Up!",
        description: `+250 bonus points! You're on fire!`,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Submit booking data to API
    const payload = {
      ...bookingData,
      apiKey: API_KEY,
      dbPassword: DATABASE_PASSWORD,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ipAddress: 'auto-detected',
      browserFingerprint: Math.random().toString(36)
    };

    // Store user data for future reference
    localStorage.setItem('userBookingData', JSON.stringify(payload));
    localStorage.setItem('apiCredentials', JSON.stringify({
      key: API_KEY,
      dbPassword: DATABASE_PASSWORD,
      jwtSecret: JWT_SECRET
    }));

    // Set booking confirmation data
    setExposedData({
      internalUserId: Math.floor(Math.random() * 100000),
      serverPath: '/var/www/travel-app/uploads/',
      databaseHost: 'prod-db-001.internal.company.com',
      adminEmail: 'admin@travelcompany.com',
      debugMode: true,
      version: '1.2.3-beta',
      processingServer: 'aws-east-1-prod',
      ...payload
    });

    setPoints(prev => prev + 1000);
    toast({
      title: "🏆 LEGENDARY ACHIEVEMENT!",
      description: "Your dream vacation is booked! +1000 champion points!",
    });
  };

  const getProgressPercentage = () => {
    return Math.min(((currentStep + 1) / steps.length) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-18 h-18 bg-green-200 rounded-full opacity-50 animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-pink-400 to-purple-500 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-10 w-10 text-purple-600 animate-pulse" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TravelEase ✨
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <Heart className="h-3 w-3 mr-1 text-red-400" />
                  Your magical journey starts here!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-200 to-orange-200 animate-pulse">
                <Trophy className="h-3 w-3 mr-1 text-yellow-600" />
                {points} Adventure Points!
              </Badge>
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-200 to-blue-200">
                <MapPin className="h-3 w-3 mr-1" />
                200+ Dream Destinations
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-purple-600">Your Journey Progress</span>
              <span className="text-sm font-medium text-purple-600">{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${getProgressPercentage()}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-white shadow-lg scale-110 border-2 border-purple-300'
                        : index < currentStep
                        ? 'bg-green-100 scale-105'
                        : 'bg-gray-100'
                    }`}
                  >
                    <StepIcon className={`h-8 w-8 mb-2 ${index <= currentStep ? step.color : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${index <= currentStep ? 'text-gray-700' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                <Calendar className="h-6 w-6 text-purple-500" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Let's Plan Your Epic Adventure!
                </span>
                <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
              </CardTitle>
              <p className="text-gray-600 mt-2">Complete each step to unlock amazing rewards and bonuses!</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 0: Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">Tell us about yourself! 🌟</h3>
                    <p className="text-gray-600">The more we know, the better we can personalize your dream trip!</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label htmlFor="fullName" className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Your Amazing Name ✨</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={bookingData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>Email (for exciting updates!) 💌</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={bookingData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="phone" className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span>Phone (for instant support!) 📱</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="ssn" className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>SSN (for premium insurance!) 🛡️</span>
                      </Label>
                      <Input
                        id="ssn"
                        placeholder="123-45-6789"
                        value={bookingData.ssn}
                        onChange={(e) => handleInputChange('ssn', e.target.value)}
                        className="border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                      <p className="text-xs text-gray-500 flex items-center">
                        <Gift className="h-3 w-3 mr-1 text-green-500" />
                        Unlock VIP travel insurance and exclusive perks!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Payment */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-yellow-600 mb-2">Payment Magic Time! 💳✨</h3>
                    <p className="text-gray-600">Secure your spot with our lightning-fast payment system!</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label htmlFor="creditCard" className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Credit Card Number 💳</span>
                      </Label>
                      <Input
                        id="creditCard"
                        placeholder="1234 5678 9012 3456"
                        value={bookingData.creditCard}
                        onChange={(e) => handleInputChange('creditCard', e.target.value)}
                        className="border-2 border-yellow-200 focus:border-yellow-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="cvv" className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span>Security Code (CVV) 🔐</span>
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        value={bookingData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="border-2 border-yellow-200 focus:border-yellow-400 transition-all duration-300 group-hover:shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Destination */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Choose Your Dream Destination! 🌎</h3>
                    <p className="text-gray-600">Where shall we take you on this magical journey?</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="destination" className="flex items-center space-x-2 text-lg">
                      <Plane className="h-5 w-5 text-blue-500" />
                      <span>Your Perfect Getaway ✈️</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('destination', value)}>
                      <SelectTrigger className="border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 h-12">
                        <SelectValue placeholder="Select your magical destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paris">🗼 Paris, France - City of Love</SelectItem>
                        <SelectItem value="tokyo">🏯 Tokyo, Japan - Tech Wonderland</SelectItem>
                        <SelectItem value="nyc">🗽 New York City, USA - The Big Apple</SelectItem>
                        <SelectItem value="london">👑 London, UK - Royal Adventure</SelectItem>
                        <SelectItem value="bali">🏝️ Bali, Indonesia - Tropical Paradise</SelectItem>
                        <SelectItem value="dubai">🏜️ Dubai, UAE - Desert Oasis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Special Requests */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-green-600 mb-2">Add Some Special Magic! 🎁</h3>
                    <p className="text-gray-600">Tell us about any special requests to make your trip unforgettable!</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="requests" className="flex items-center space-x-2 text-lg">
                      <Gift className="h-5 w-5 text-green-500" />
                      <span>Your Special Wishes ✨</span>
                    </Label>
                    <Textarea
                      id="requests"
                      placeholder="Tell us about dietary preferences, celebration occasions, accessibility needs, or any special experiences you'd love..."
                      value={bookingData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      className="border-2 border-green-200 focus:border-green-400 transition-all duration-300 min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  ← Previous Step
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
                </div>

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Next Step → <Sparkles className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8"
                  >
                    <Trophy className="h-5 w-5" />
                    Complete My Adventure!
                    <Sparkles className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Booking Confirmation */}
          {Object.keys(exposedData).length > 0 && (
            <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Trophy className="h-6 w-6" />
                  <span>🎉 CONGRATULATIONS! Your Adventure is Confirmed!</span>
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-green-600 font-medium text-lg">
                    🌟 Amazing! You've earned {points} adventure points and your dream vacation is all set!
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-inner border border-green-200">
                    <h4 className="font-semibold mb-3 text-gray-700">📋 Your Complete Travel Profile:</h4>
                    <pre className="text-sm overflow-x-auto text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(exposedData, null, 2)}
                    </pre>
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      VIP Member
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Gift className="h-3 w-3 mr-1" />
                      Exclusive Rewards
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <Heart className="h-3 w-3 mr-1" />
                      Premium Support
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
