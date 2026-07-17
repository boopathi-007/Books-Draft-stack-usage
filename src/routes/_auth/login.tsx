import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, type LoginSchemaType } from "#/schemas/login.schema";
import { useAuthStore } from "#/stores/auth.store";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    console.log(data);

    login(data.password, {
      id: "1",
      name: "John Doe",
      email: data.email,
    });

    return navigate({ to: "/dashboard", replace: true });

    // await login(data);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`w-full rounded-lg border px-3 py-2.5 outline-none transition ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-600"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
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
        <div>
          <Link
            to="/forgot-password"
            className=" w-full mb-2 text-sm font-medium text-slate-700 flex align-middle justify-center hover:cursor-pointer hover:text-blue-600"
          >
            Forget Password ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
}
