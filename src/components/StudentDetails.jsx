// import { useEffect } from "react";
import { useAdminCheck } from "../context/AdminCheck";

const StudentDetails = ({ student, isVisible, onClose }) => {
  const { isAdmin } = useAdminCheck();
  if (!isVisible) return null;
  console.log(isAdmin);

  // Debugging close action
  const handleClose = () => {
    console.log("Closing StudentDetails modal");
    onClose();
  };

  // Debugging for edit action (placeholder for now)
  const handleEditProfile = () => {
    console.log("Edit Profile clicked for student:", student?.id);
    // Placeholder: Trigger edit modal or action (e.g., open AddStudentForm modal)
  };

  // Debugging reload attempts
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     console.log("StudentDetails: Page is about to reload/unload");
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, []);

  return (
    <div className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-inter animate-fade-in">
      <div className="bg-[#FFFFFF] rounded-xl shadow-2xl w-full max-w-7xl mx-auto overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#FFFFFF] tracking-tight">
              Student Details
            </h3>
            <button
              onClick={handleClose}
              className="text-[#F3F4F6] hover:text-[#FFFFFF] transition-colors transform hover:scale-110"
              aria-label="Close"
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
        </div>

        {student ? (
          <div className="p-6 sm:p-8">
            {/* Student Header */}
            <div className="flex items-center mb-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-2xl text-[#FFFFFF] font-semibold mr-4 shadow-md transition-transform hover:scale-105">
                {student.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-[#1F2937]">
                  {student.name}
                </h4>
                <p className="text-sm text-[#6B7280]">{student.email}</p>
              </div>
            </div>

            {/* Student Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Course */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                  Course
                </h5>
                <p className="mt-2 text-base font-medium text-[#1F2937]">
                  {student.course}
                </p>
              </div>

              {/* Enrollment Date */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                  Enrollment Date
                </h5>
                <p className="mt-2 text-base font-medium text-[#1F2937]">
                  {student.enrollmentDate}
                </p>
              </div>

              {/* Student ID */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                  Student ID
                </h5>
                <p className="mt-2 text-base font-medium text-[#1F2937]">
                  {student.id}
                </p>
              </div>

              {/* Progress */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                  Progress
                </h5>
                <div className="mt-2">
                  <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2563EB] to-[#10B981] h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs text-[#6B7280] mt-2">
                    {student.progress}% completed
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="py-2 px-6 bg-[#F3F4F6] text-[#6B7280] rounded-md font-medium hover:bg-[#E5E7EB] transition-all duration-200 active:scale-95"
                  aria-label="Close"
                >
                  Close
                </button>
                <button
                  onClick={handleEditProfile}
                  className="py-2 px-6 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-[#FFFFFF] rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                  aria-label="Edit Profile"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-[#FEE2E2] border-l-4 border-[#EF4444] p-4 rounded-lg flex items-center">
              <svg
                className="h-5 w-5 text-[#EF4444] mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium text-[#EF4444]">
                Login required to view student details
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="py-2 px-6 bg-[#F3F4F6] text-[#6B7280] rounded-md font-medium hover:bg-[#E5E7EB] transition-all duration-200 active:scale-95"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
