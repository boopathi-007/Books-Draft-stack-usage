import { createFileRoute } from "@tanstack/react-router";
import CustomerForm from "#/Features/Customers/Components/customerForm";
import {
  useGetCustomerById,
  useUpdateCustomer,
} from "#/Features/Customers/hooks/use-customer-queries";
import type { CustomerFormType } from "#/Features/Customers/schemas/customer.schema";

export const Route = createFileRoute(
  "/_app/dashboard/customers/edit/$customerId",
)({
  component: EditCustomerPage,
});

function EditCustomerPage() {
  const { useParams, useNavigate } = Route;
  const { customerId } = useParams();

  const navigate = useNavigate();

  const { data } = useGetCustomerById(customerId);

  const { mutateAsync, isPending } = useUpdateCustomer();

  const handleUpdateCustomer = (data: CustomerFormType) => {
    mutateAsync({ id: customerId, data });
    navigate({
      to: "/dashboard/customers",
    });
  };

  if (!data) return null;

  return (
    <CustomerForm
      title="Edit Customer"
      submitText="Update Customer"
      defaultValues={{
        userId: data.userId.toString(),
        title: data.title,
        body: data.body,
      }}
      loading={isPending}
      onSubmit={handleUpdateCustomer}
    />
  );
}
