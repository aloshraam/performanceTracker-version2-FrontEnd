import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../../components/Header/Navbar";
import { toast } from "react-toastify";
import './Login.css';

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminapi/token/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("TlToken", response.data.token);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        }).then(() => {
          if (response.data.user_type === "admin") {
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin");
          } else if (response.data.user_type === "hr") {
            localStorage.setItem("HRtoken", response.data.token);
            navigate("/manager");
          } else if (response.data.user_type === "teamlead") {
            localStorage.setItem("TlToken", response.data.token);
            navigate("/team-lead");
          } else if (response.data.user_type === "employee") {
            localStorage.setItem("Emp-token", response.data.token);
            localStorage.setItem("userID", JSON.stringify(response.data.id));
            navigate("/trainee");
          }

          localStorage.setItem("userData", JSON.stringify(response.data));
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        const { data } = error.response;
        if (data?.non_field_errors?.length > 0) {
          toast.warning(data.non_field_errors[0]);
        } else {
          toast.warning("Invalid username or password. Please try again.");
        }
      } else if (error.request) {
        alert("No response received from the server. Please try again later.");
      } else {
        alert("An error occurred while logging in. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp5569141.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl p-6">
          <div className="text-center text-white md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome</h1>
            <p className="text-lg">Please sign in to continue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10 md:w-1/2 w-full animate-fade-in">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
              Sign in to your account
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Not a member?{" "}
              <Link
                to={'/register'}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;