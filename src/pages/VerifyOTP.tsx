import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const resetEmail = localStorage.getItem('resetEmail');
    if (!resetEmail) {
      navigate('/forgot-password');
      return;
    }
    setEmail(resetEmail);

    // Timer countdown
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification
      if (otp === '123456') { // Demo OTP
        toast({
          title: 'Success',
          description: 'OTP verified! Redirecting to reset password...',
        });
        
        // Store verified status
        localStorage.setItem('otpVerified', 'true');
        
        setTimeout(() => {
          navigate('/reset-password');
        }, 1500);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid OTP',
          description: 'The OTP you entered is incorrect. Try demo OTP: 123456',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to verify OTP. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'OTP resent to your email',
      });
      
      setTimeLeft(300);
      setOtp('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to resend OTP',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <CardTitle className="text-2xl">Verify OTP</CardTitle>
              <CardDescription>
                Enter the 6-digit OTP sent to {email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                disabled={isLoading || timeLeft === 0}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <div className="text-center text-sm">
              <p className={timeLeft < 60 ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
                OTP expires in: <strong>{formatTime(timeLeft)}</strong>
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
              <p><strong>Demo OTP:</strong> 123456</p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || timeLeft === 0}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResendOTP}
              disabled={isLoading || timeLeft > 240}
            >
              {timeLeft > 240 ? `Resend OTP in ${formatTime(timeLeft - 240)}` : 'Resend OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
