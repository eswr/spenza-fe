import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  const auth = useAuth();
  if (!auth) {
    return <div>Error: Auth context is not available</div>;
  }
  const { signup } = auth;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      // Redirect to dashboard or desired page
    } catch (error) {
      // Handle signup error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background w-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-card-foreground">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="mt-1 block w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className="mt-1 block w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className="mt-1 block w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
};
