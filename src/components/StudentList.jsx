import { useEffect, useState } from "react";
import axios from "axios";
import { useEditStudent } from "../context/EditStudent";

const StudentList = ({ onViewDetails, onEdit, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { editData, setEditData } = useEditStudent();

  // Fetch students
  const fetchStudents = async () => {
    console.log("Fetching students...");
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      setNotification({ type: "error", message: "Failed to load students" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    console.log("Deleting student:", id);
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
      setNotification({
        type: "success",
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting student:", error.message);
      setNotification({ type: "error", message: "Failed to delete student" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Refresh after edit
  useEffect(() => {
    if (!editData) {
      console.log("editData cleared, refetching students...");
      fetchStudents(); // Refresh list after edit
    }
  }, [editData]);

  // Highlight edited student
  useEffect(() => {
    if (editData && editData.id) {
      console.log("Highlighting student:", editData.id);
      setSearchTerm(editData.name || "");
      setSelectedCourse(editData.course || "");
      const editedStudentElement = document.getElementById(
        `student-${editData.id}`
      );
      if (editedStudentElement) {
        editedStudentElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    } else {
      setSearchTerm("");
      setSelectedCourse("");
    }
  }, [editData]);

  const courseOptions = [...new Set(students.map((student) => student.course))];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse = !selectedCourse || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <section className="bg-[#FFFFFF] rounded-lg shadow-sm p-6 mb-6 transition-all duration-200 font-inter">
      {/* Notification */}
      {notification && (
        <div
          className={`mb-4 p-4 rounded-md border-l-4 ${
            notification.type === "success"
              ? "bg-[#D1FAE5] border-[#10B981] text-[#10B981]"
              : "bg-[#FEE2E2] border-[#EF4444] text-[#EF4444]"
          }`}
        >
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">
          All Students
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
              aria-label="Search students"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-[#6B7280]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="block w-full border border-[#D1D5DB] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            aria-label="Filter by course"
            disabled={isLoading}
          >
            <option value="">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      {isLoading ? (
        <div className="text-center text-[#6B7280]">Loading students...</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB]">
              <thead className="bg-[#F3F4F6]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#FFFFFF] divide-y divide-[#E5E7EB]">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    id={`student-${student.id}`}
                    className={`hover:bg-[#F9FAFB] transition-colors ${
                      editData && editData.id === student.id
                        ? "bg-[#DBEAFE]/50"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-4 text-sm font-medium text-[#1F2937]">
                          {student.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {student.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-[#D1FAE5] text-[#10B981]">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => onViewDetails(student)}
                          className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                          aria-label={`View details for ${student.name}`}
                          disabled={isLoading}
                        >
                          View
                        </button>
                        {isAdmin && (
                          <>
                            <button
                              type="button"
                              onClick={() => onEdit(student)}
                              className="text-[#10B981] hover:text-[#059669] transition-colors"
                              aria-label={`Edit ${student.name}`}
                              disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(student.id)}
                              className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                              aria-label={`Delete ${student.name}`}
                              disabled={isLoading}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                id={`student-${student.id}`}
                className={`bg-[#FFFFFF] border border-[#E5E7EB] rounded-md shadow-sm p-4 hover:shadow-md transition-all duration-200 ${
                  editData && editData.id === student.id
                    ? "bg-[#DBEAFE]/50"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-[#1F2937]">
                        {student.name}
                      </h3>
                      <p className="text-xs text-[#6B7280]">{student.email}</p>
                    </div>
                  </div>
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-[#D1FAE5] text-[#10B981]">
                    {student.course}
                  </span>
                </div>
                <div className="mt-3 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(student)}
                    className="text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium"
                    aria-label={`View details for ${student.name}`}
                    disabled={isLoading}
                  >
                    View
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="text-sm text-[#10B981] hover:text-[#059669] font-medium"
                        aria-label={`Edit ${student.name}`}
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(student.id)}
                        className="text-sm text-[#EF4444] hover:text-[#DC2626] font-medium"
                        aria-label={`Delete ${student.name}`}
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default StudentList;
