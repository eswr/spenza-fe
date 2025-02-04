import React from 'react';
import { SignupForm } from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
};

export default Signup;
