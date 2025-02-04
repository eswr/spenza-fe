import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { EventLog } from '@/components/webhooks/event-log';
import { WebhookForm } from '@/components/webhooks/webhook-form';
import { WebhookTable } from '@/components/webhooks/webhook-table';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="container space-y-6 py-8">
      <h1>Welcome, {user?.email || 'User'}!</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <WebhookForm />
          <WebhookTable />
        </div>
        <EventLog />
      </div>
    </div>
  );
};

export default Dashboard;
