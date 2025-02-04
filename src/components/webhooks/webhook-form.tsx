// "use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const formSchema = z.object({
  targetUrl: z.string().url({ message: "Invalid URL" }),
  eventType: z.string().min(1, "Event type is required"),
});

export function WebhookForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetUrl: "",
      eventType: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api.post("/subscriptions", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="targetUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/webhook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <FormControl>
                <Input placeholder="payment.received" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
