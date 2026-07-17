import z from "zod";

export const CustomerDetailSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const CustomerFormSchema = z.object({
  userId: z.string().min(1, "Customer ID is required"),

  title: z.string().min(3, "Name must be at least 3 characters"),

  body: z.string().min(10, "Description must be at least 10 characters"),
});

export const CustomersSchema = z.array(CustomerDetailSchema);

export type CustomersSchemaType = z.infer<typeof CustomersSchema>;

export type CustomersDetailSchemaType = z.infer<typeof CustomerDetailSchema>;

export type CustomerFormType = z.infer<typeof CustomerFormSchema>;
