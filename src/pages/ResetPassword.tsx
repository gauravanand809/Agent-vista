import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('No reset token found. Please use the forgot password link.');
      toast({
        title: "Error",
        description: "No reset token found.",
        variant: "destructive",
      });
    }
  }, [token, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (!token) {
      setMessage('No reset token found.');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    const result = await resetPassword(token, password);

    if (result.success) {
      setMessage('Your password has been reset successfully. You can now log in.');
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. You can now log in.",
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setMessage(result.error || 'Failed to reset password. Please try again.');
      toast({
        title: "Error",
        description: result.error || "Failed to reset password.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

return (
  <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-secondary/20 to-background">
    <Card className="w-full max-w-md shadow-lg dark:bg-gray-950">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>Enter and confirm your new password.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="passwordHelp"
            />
            {/* Optional password strength feedback */}
            <p id="passwordHelp" className="text-xs text-muted-foreground">
              Use at least 8 characters, including a number and a symbol.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Optional error */}
            {password !== confirmPassword && confirmPassword.length > 0 && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !token || password !== confirmPassword}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          {message && (
            <p className="text-center text-sm text-muted-foreground">
              {message}
            </p>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="underline hover:text-primary">
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);

};

export default ResetPassword;
