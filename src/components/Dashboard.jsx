import { useState, useEffect } from "react";
import Header from "./Header";
import StudentList from "./StudentList";
import AddStudentForm from "./AddStudentForm";
import StudentDetails from "./StudentDetails";
import Footer from "./Footer";
import { useEditStudent } from "../context/EditStudent";

const Dashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const { setEditData } = useEditStudent();
  const [isAdmin, setIsAdmin] = useState(false);
  const handleViewDetails = (student) => {
    console.log("View details for student:", student.id);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    console.log("Edit student:", student.id);
    setEditData(student);
    setShowAddStudentModal(true);
  };

  const closeModal = () => {
    console.log("Closing details modal");
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Debugging navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      console.log("Page is about to reload/unload");
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] font-inter">
      <Header
        setShowAddStudentModal={setShowAddStudentModal}
        setIsAdmin={setIsAdmin}
      />
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-[#1F2937] mb-8">
            Student Management
          </h1>
          <div className="transition-all duration-200">
            <StudentList
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </main>
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-[#1F2937]/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#FFFFFF] rounded-lg p-6 w-full max-w-md shadow-xl">
            <AddStudentForm onClose={() => setShowAddStudentModal(false)} />
          </div>
        </div>
      )}
      <StudentDetails
        student={selectedStudent}
        isVisible={isModalOpen}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
