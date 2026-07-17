import { createFileRoute } from "@tanstack/react-router";
import CustomerForm from "#/Features/Customers/Components/customerForm";
import { useCreateCustomer } from "#/Features/Customers/hooks/use-customer-queries";
import type { CustomerFormType } from "#/Features/Customers/schemas/customer.schema";

export const Route = createFileRoute("/_app/dashboard/customers/add")({
  component: AddCustomerPage,
});

function AddCustomerPage() {
  const navigate = Route.useNavigate();

  const { mutateAsync: createCustomer, isPending } = useCreateCustomer();

  const handleCreateCustomer = (data: CustomerFormType) => {
    createCustomer(data);
    navigate({
      to: "/dashboard/customers",
    });
  };

  return (
    <CustomerForm
      title="Create Customer"
      submitText="Create Customer"
      loading={isPending}
      onSubmit={handleCreateCustomer}
    />
  );
}
