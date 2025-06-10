
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, MapPin, Calendar } from 'lucide-react';
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

  // API credentials and configuration
  const API_KEY = "sk-1234567890abcdef-SUPER-SECRET-KEY";
  const DATABASE_PASSWORD = "admin123!@#";
  const JWT_SECRET = "my-super-secret-jwt-token-12345";

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // Log user input for debugging
    console.log(`User input for ${field}:`, value);
    console.log('Full booking data:', { ...bookingData, [field]: value });
  };

  const handleSubmit = async () => {
    // Submit booking data to API
    const payload = {
      ...bookingData,
      apiKey: API_KEY,
      dbPassword: DATABASE_PASSWORD,
      timestamp: new Date().toISOString()
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
      ...payload
    });

    toast({
      title: "Booking Confirmed!",
      description: "Your travel booking has been successfully submitted. Check your email for confirmation details.",
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
                <h1 className="text-2xl font-bold text-gray-900">TravelEase</h1>
                <p className="text-sm text-gray-600">Your trusted travel booking partner</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              Worldwide Destinations
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="booking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="booking">Book Your Trip</TabsTrigger>
            <TabsTrigger value="confirmation">Booking Details</TabsTrigger>
            <TabsTrigger value="offers">Special Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Book Your Dream Vacation</span>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creditCard">Credit Card Number *</Label>
                    <Input
                      id="creditCard"
                      placeholder="1234 5678 9012 3456"
                      value={bookingData.creditCard}
                      onChange={(e) => handleInputChange('creditCard', e.target.value)}
                    />
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <Input
                      id="ssn"
                      placeholder="123-45-6789"
                      value={bookingData.ssn}
                      onChange={(e) => handleInputChange('ssn', e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Required for international travel insurance</p>
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
                      <SelectItem value="bali">Bali, Indonesia</SelectItem>
                      <SelectItem value="dubai">Dubai, UAE</SelectItem>
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
                </div>

                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Complete Booking
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmation">
            <Card>
              <CardHeader>
                <CardTitle>Booking Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(exposedData).length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-green-600 font-medium">Thank you for your booking! Here are your details:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">{JSON.stringify(exposedData, null, 2)}</pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Complete your booking to see confirmation details.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Summer Special</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Book your summer vacation now and save up to 30% on selected destinations!
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Free airport transfers</li>
                    <li>• Complimentary breakfast</li>
                    <li>• Late checkout available</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Family Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Perfect for families traveling with children. Includes kid-friendly activities!
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Children under 12 stay free</li>
                    <li>• Family-friendly accommodations</li>
                    <li>• Theme park tickets included</li>
                    <li>• Child care services available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
