import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const HelpAndSupport = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Your support request has been submitted. We will get back to you soon.',
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit support request',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@swarnaaz.com',
      response: 'Response time: 24-48 hours',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call our support team',
      contact: '+91 (555) 123-4567',
      response: 'Available: Mon-Fri 9AM-6PM',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available in dashboard',
      response: 'Response time: 1-2 hours',
    },
    {
      icon: Clock,
      title: 'Support Hours',
      description: 'When we are available',
      contact: 'Monday - Friday 9AM to 6PM IST',
      response: 'Closed on weekends & holidays',
    },
  ];

  return (
    <AdminLayout title="Help & Support">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground mt-2">Get assistance from our dedicated support team</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{channel.title}</CardTitle>
                  </div>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-sm">{channel.contact}</p>
                  <p className="text-xs text-muted-foreground">{channel.response}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>Fill out the form below and our team will help you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief subject of your inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
              <CardDescription>Quick solutions for common problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">How do I reset my password?</h4>
                <p className="text-sm text-muted-foreground">Click on "Forgot Password" on the login page and follow the OTP verification process.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">How do I export my data?</h4>
                <p className="text-sm text-muted-foreground">Go to Settings and look for the Export Data option to download your information.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">How do I update my profile?</h4>
                <p className="text-sm text-muted-foreground">Visit the Settings page and update your profile information there.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">We accept all major credit cards, debit cards, and digital wallets.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HelpAndSupport;
