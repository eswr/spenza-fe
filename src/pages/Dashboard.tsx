import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { EventLog } from '@/components/webhooks/event-log';
import { WebhookForm } from '@/components/webhooks/webhook-form';
import { WebhookTable } from '@/components/webhooks/webhook-table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(`${API_URL}/webhooks`, values, config);
    },
    onSuccess: () => {
      console.log('Webhook triggered successfully');
    },
    onError: (error) => {
      console.error('Failed to trigger webhook:', error);
    },
  });

  const onTrigger = async () => {
    const values = {
      targetUrl: "https://webhook.site/414fd375-486e-4c28-bff0-2eb31abbd243",
      eventType: "test1",
    };

    try {
      mutation.mutate(values);
    } catch (error) {
      console.error("Error triggering webhook:", error);
    }
  };

  return (
    <div className="container space-y-6 py-8">
      <h1>Welcome, {user?.email || 'User'}!</h1>
      <Button 
        onClick={onTrigger} 
        disabled={mutation.isPending}
        className="bg-primary text-primary-foreground hover:bg-primary-dark"
      >
        {mutation.isPending ? 'Triggering...' : 'Trigger Webhook'}
      </Button>
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
