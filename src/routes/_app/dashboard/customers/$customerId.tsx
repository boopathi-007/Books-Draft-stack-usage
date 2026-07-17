import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";

import {
  useDeleteCustomer,
  useGetCustomerById,
} from "#/Features/Customers/hooks/use-customer-queries";

export const Route = createFileRoute("/_app/dashboard/customers/$customerId")({
  component: CustomerDetailsPage,
});

function CustomerDetailsPage() {
  const { useParams, useNavigate } = Route;
  const { customerId } = useParams();

  const navigate = useNavigate();

  const { data: customer } = useGetCustomerById(customerId);

  const deleteCustomer = useDeleteCustomer();

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  const handleDelete = async () => {
    await deleteCustomer.mutateAsync(customerId);

    navigate({
      to: "/dashboard/customers",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() =>
              navigate({
                to: "/dashboard/customers",
              })
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl font-bold">Customer Details</h1>

          <p className="text-muted-foreground">View customer information</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              navigate({
                to: "/dashboard/customers/edit/$customerId",
                params: {
                  customerId,
                },
              });
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Details */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-slate-800">
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <DetailItem label="ID" value={customer.id} />
            <DetailItem label="User ID" value={customer.userId} />
            <DetailItem label="Title" value={customer.title} />

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Status</p>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                  Active
                </Badge>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Description</p>
              <p className="mt-2 text-slate-700 leading-relaxed">
                {customer.body}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type DetailItemProps = {
  label: string;
  value: React.ReactNode;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-slate-100/50">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}
