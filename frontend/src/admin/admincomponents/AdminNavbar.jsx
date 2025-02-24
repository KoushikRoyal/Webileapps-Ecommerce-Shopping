import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin"); // Redirect to login page
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token"); // Remove token
    navigate("/admin"); // Redirect to login page
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm ml-auto"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
