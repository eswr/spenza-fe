// "use client";

// import { WebhookForm } from "@/components/webhooks/webhook-form";
// import { WebhookTable } from "@/components/webhooks/webhook-table";
// import { EventLog } from "@/components/webhooks/event-log";
// import { useAuth } from "@/hooks/use-auth";
// import { redirect } from "next/navigation";

export default function Home() {
  // const { user } = useAuth();

  // if (!user) {
  //   redirect("/login");
  // }

  return <h3>Public</h3>;

  // return (
  //   <div className="container space-y-6 py-8">
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //       <div className="space-y-6">
  //         <WebhookForm />
  //         <WebhookTable />
  //       </div>
  //       <EventLog />
  //     </div>
  //   </div>
  // );
}
