import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "./firebase";
import { useAdminCheck } from "../context/AdminCheck";

const LoginForm = ({
  setIsAdmin,
  onClose,
  onSwitchToRegister,
  setIsLoggedIn,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAdmin } = useAdminCheck();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsAdmin(isAdmin);
      setIsSubmitted(true);
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-5 flex justify-between items-center -mx-6 -mt-6 rounded-t-xl">
        <h2 className="text-xl font-semibold text-[#FFFFFF] tracking-tight">
          Login
        </h2>
        <button
          onClick={() => {
            console.log("Cancel clicked");
            onClose();
          }}
          className="text-[#F3F4F6] hover:text-[#FFFFFF] transition-colors transform hover:scale-110"
          aria-label="Close"
          disabled={isLoading}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {isSubmitted && (
          <div className="bg-green-100 border-l-4 border-green-500 p-2 mb-4 rounded">
            <p className="text-sm text-green-700">Login successful!</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-2 mb-4 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email is not valid",
                },
              })}
              id="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              id="password"
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            If you are not registered, please{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-[#2563EB] hover:underline"
            >
              register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
