import * as z from "zod";

const LoginSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z
    .string({ error: "Password is required." })
    .min(6, { error: "Password must be at least 6 characters long." }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export { LoginSchema };
