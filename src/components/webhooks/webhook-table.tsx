import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export function WebhookTable() {
  const queryClient = useQueryClient();

  const { data: webhooks } = useQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await api.get("/subscriptions");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/subscriptions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Target URL</TableHead>
          <TableHead>Event Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {webhooks?.map((webhook) => (
          <TableRow key={webhook._id}>
            <TableCell>{webhook.targetUrl}</TableCell>
            <TableCell>{webhook.eventType}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(webhook._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
