import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "#/schemas/forgot-password.schema";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotPasswordSchemaType> = (data) => {
    console.log(data);
    return navigate({ to: "/login" });
  };
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Create a new Password
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            New Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="*********"
            {...register("password")}
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Re enter Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm New Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="*********"
            {...register("confirmPassword")}
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Updating password..." : "Submit"}
        </button>

        <div>
          <Link
            to="/login"
            className=" w-full mb-2 text-sm font-medium text-slate-700 flex align-middle justify-center hover:cursor-pointer hover:text-blue-600"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
}
