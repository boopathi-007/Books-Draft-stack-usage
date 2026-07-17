// biome-ignore assist/source/organizeImports: <explanation>
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus,
} from "lucide-react";
import { useGetCustomers } from "#/Features/Customers/hooks/use-customer-queries";

export const Route = createFileRoute("/_app/dashboard/customers/")({
  component: CustomerPage,
});

function CustomerPage() {
  const { useNavigate, useSearch } = Route;
  const { q } = useSearch();
  const navigate = useNavigate();
  const { data: customers = [] } = useGetCustomers({
    page: 1,
    limit: 10,
    q,
    sort: "",
  });

  const handleCreateCustomer = () => {
    navigate({
      to: "/dashboard/customers/add",
    });
  };

  const handleCustomerDetails = (id: number) => {
    navigate({
      to: `/dashboard/customers/$customerId`,
      params: { customerId: id.toString() },
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Customers</h1>

          <p className="text-sm text-muted-foreground">
            Manage your customer information.
          </p>
        </div>

        <Button className="gap-2" onClick={handleCreateCustomer}>
          <Plus size={18} />
          Create Customer
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer List</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCustomerDetails(customer.id)}
                >
                  <TableCell>{customer.id}</TableCell>

                  <TableCell className="font-medium ">
                    {customer.userId}
                  </TableCell>

                  <TableCell>{customer.title}</TableCell>

                  <TableCell className="text-slate-500 max-w-[500px]">
                    {customer.body}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1-10 of 125 customers
            </p>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft size={18} />
              </Button>

              <Button variant="outline">1</Button>

              <Button>2</Button>

              <Button variant="outline">3</Button>

              <Button variant="outline" size="icon">
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
