import React from 'react';
import { Link } from 'react-router-dom';

// import { useAuth } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";
// import { AuthContext } from './auth-provider';
import { useAuth } from '@/hooks/use-auth';


const Navigation: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
        </div>
        <div>
          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white mr-4">Login</Link>
              <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
            </>
          ): (
            <Button variant="link" onClick={() => logout && logout()}>Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
