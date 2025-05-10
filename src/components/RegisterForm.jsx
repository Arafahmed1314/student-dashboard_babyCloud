import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "./firebase";
import { useAdminCheck } from "../context/AdminCheck";

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAdmin, setIsAdmin } = useAdminCheck();
  console.log(isAdmin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;

      console.log("User registered:", user);

      setIsSubmitted(true);
      // Automatically switch to LoginForm on success
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        if (onSwitchToLogin) onSwitchToLogin(); // Switch to LoginForm
      }, 2000); // Reduced to 2 seconds for quicker feedback
    } catch (error) {
      console.error("Registration error:", error.message);
      setError(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="p-4 font-inter">
      <div className="bg-[#2563EB] px-4 py-2 rounded-t-md">
        <h2 className="text-lg font-semibold text-white">Register</h2>
      </div>
      <div className="p-4">
        {isSubmitted && (
          <div className="bg-green-100 border-l-4 border-green-500 p-2 mb-4 rounded">
            <p className="text-sm text-green-700">Registration successful!</p>
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
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-600"
            >
              Student Name
            </label>
            <input
              {...register("studentName", {
                required: "Student name is required",
              })}
              id="studentName"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.studentName ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
              placeholder="Enter student name"
            />
            {errors.studentName && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.studentName.message}
              </p>
            )}
          </div>
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded text-[#2563EB] focus:ring-[#2563EB]"
              disabled={isLoading}
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-600">
              Register as Administrator
            </label>
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
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#2563EB] hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
