import z from "zod";

const ForgotPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export { ForgotPasswordSchema };
