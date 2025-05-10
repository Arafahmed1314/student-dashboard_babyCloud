import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEditStudent } from "../context/EditStudent";

const courseOptions = [
  "Computer Science",
  "Data Science",
  "Web Development",
  "UX Design",
  "Digital Marketing",
  "Mobile Development",
  "Artificial Intelligence",
];

const AddStudentForm = ({ onClose }) => {
  const { editData, setEditData } = useEditStudent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      studentId: "",
      name: "",
      email: "",
      course: "",
      enrollmentDate: "",
    },
  });

  useEffect(() => {
    if (editData) {
      setValue("studentId", editData.id || "");
      setValue("name", editData.name || "");
      setValue("email", editData.email || "");
      setValue("course", editData.course || "");
      setValue("enrollmentDate", editData.enrollmentDate || "");
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    setError("");
    try {
      if (editData) {
        console.log("Updating student:", data.studentId);
        const response = await axios.put(
          `http://localhost:3001/students/${data.studentId}`,
          data
        );
        console.log("Update response:", response.status, response.data);
      } else {
        console.log("Adding new student:", data.studentId);
        const response = await axios.post(
          `http://localhost:3001/students`,
          data
        );
        console.log("Add response:", response.status, response.data);
      }
      setIsSubmitted(true);
      setEditData(null);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving student:", error.message, error.response);
      setError(
        `Failed to save student: ${error.message}${
          error.response ? ` (Status: ${error.response.status})` : ""
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setEditData(null);
    onClose();
  };

  return (
    <div className="font-inter">
      {/* Simplified Header */}
      <div className="bg-[#2563EB] px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          {editData ? "Edit Student" : "Add New Student"}
        </h2>
        <button
          onClick={handleCancel}
          className="text-white hover:text-gray-200"
          aria-label="Close"
          disabled={isLoading}
        >
          <svg
            className="h-5 w-5"
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

      {/* Simplified Body */}
      <div className="p-4 bg-white">
        {isSubmitted && (
          <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-4 rounded">
            <p className="text-sm font-medium text-green-700">
              Student successfully {editData ? "updated" : "added"}!
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4 rounded">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-600"
            >
              Student ID
            </label>
            <input
              {...register("studentId", { required: "Student ID is required" })}
              id="studentId"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.studentId ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
              placeholder="Enter student ID"
            />
            {errors.studentId && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.studentId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.name.message}
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
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-600"
            >
              Course
            </label>
            <select
              {...register("course", { required: "Please select a course" })}
              id="course"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.course ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
            >
              <option value="">Select a course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.course.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enrollmentDate"
              className="block text-sm font-medium text-gray-600"
            >
              Enrollment Date
            </label>
            <input
              {...register("enrollmentDate", {
                required: "Enrollment date is required",
              })}
              id="enrollmentDate"
              type="date"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.enrollmentDate ? "border-[#EF4444]" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]`}
              disabled={isLoading}
            />
            {errors.enrollmentDate && (
              <p className="mt-1 text-sm text-[#EF4444]">
                {errors.enrollmentDate.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-3">
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
              {isLoading
                ? "Saving..."
                : editData
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
