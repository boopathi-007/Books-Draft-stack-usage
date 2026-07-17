import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  CustomerFormSchema,
  type CustomerFormType,
} from "../schemas/customer.schema";

export interface IProps {
  defaultValues?: CustomerFormType;

  title: string;

  submitText: string;

  loading?: boolean;

  onSubmit: SubmitHandler<CustomerFormType>;
}

export default function CustomerForm({
  title,
  submitText,
  loading,
  defaultValues,
  onSubmit,
}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormType>({
    resolver: zodResolver(CustomerFormSchema),

    mode: "onBlur",

    defaultValues: defaultValues ?? {
      userId: "",
      title: "",
      body: "",
    },
  });

  return (
    <div className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>

        <p className="mt-2 text-sm text-slate-500">
          Fill in the customer details below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 sm:p-8">
        {/* Customer ID */}

        <div>
          <label
            htmlFor="userId"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Customer ID
          </label>

          <input
            id="userId"
            {...register("userId")}
            placeholder="CUS-1001"
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.userId
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.userId && (
            <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
          )}
        </div>

        {/* Name */}

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Customer Name
          </label>

          <input
            id="title"
            {...register("title")}
            placeholder="John Doe"
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.title
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}

        <div>
          <label
            htmlFor="body"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="body"
            rows={5}
            {...register("body")}
            placeholder="Customer Description..."
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.body
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.body && (
            <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading || isSubmitting ? "Saving..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
