import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const auth = useAuth();
  if (!auth) {
    console.error('Auth context is undefined');
    return null;
  }
  const { login, authError, isLoading } = useAuth();
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background w-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-card-foreground">Log In</h2>
        {authError && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {authError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              // className='text-input'
              className="mt-1 block w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              // className='text-input'
              className="mt-1 block w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  );
};
