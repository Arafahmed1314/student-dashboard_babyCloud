import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ setIsAdmin, setShowAddStudentModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <header className="sticky top-0 z-10 bg-[#2563EB]/90 backdrop-blur-md shadow-sm font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-[#FFFFFF]">
              Student Management Dashboard
            </h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() =>
                isLoggedIn ? handleLogout() : setShowLoginModal(true)
              }
              className="bg-[#FFFFFF] text-[#2563EB] font-medium py-2 px-4 rounded-md hover:bg-[#F3F4F6] transition-colors"
              aria-label={isLoggedIn ? "Logout" : "Login"}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setShowAddStudentModal(true);
                }}
                className="bg-[#10B981] text-[#FFFFFF] font-medium py-2 px-4 rounded-md hover:bg-[#059669] transition-colors"
                aria-label="Add Student"
              >
                Add Student
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-sm flex justify-center items-center z-50 min-h-screen">
          <div className="bg-[#FFFFFF] rounded-xl shadow-2xl w-full max-w-md mx-auto p-4">
            <LoginForm
              onClose={closeModals}
              onSwitchToRegister={switchToRegister}
              setIsAdmin={setIsAdmin}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-sm flex justify-center items-center z-50 min-h-screen">
          <div className="bg-[#FFFFFF] rounded-xl shadow-2xl w-full max-w-md mx-auto p-4">
            <RegisterForm
              onClose={closeModals}
              onSwitchToLogin={switchToLogin}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
