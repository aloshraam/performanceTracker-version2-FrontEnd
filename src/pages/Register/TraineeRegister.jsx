import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TraineeRegister = () => {
    const [name, setName] = useState("");
    const [email_address, setEmailAddress] = useState("");
    const [phoneno, setPhoneNo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [home_address, setHomeAdress] = useState("");
    const [job_title, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [linkedin_profile, setLinkedIn] = useState("");
    const [resume, setResume] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email_address", email_address);
        formData.append("phoneno", phoneno);
        formData.append("password", password);
        formData.append("home_address", home_address);
        formData.append("job_title", job_title);
        formData.append("department", department);
        formData.append("linkedin_profile", linkedin_profile);
        formData.append("resume", resume);

        try {
            const token = localStorage.getItem("TlToken");

            const response = await axios.post(
                "http://127.0.0.1:8000/empapi/register/",
                formData,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You have successfully registered.",
                }).then(() => {
                    navigate("/team-lead");
                });
            } else {
                setErrorMessage("Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage(
                error?.response?.data?.detail || "Registration failed"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
                    Register Trainee
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email_address}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            value={phoneno}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            placeholder="Department"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={job_title}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                            placeholder="Job Title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={home_address}
                            onChange={(e) => setHomeAdress(e.target.value)}
                            required
                            placeholder="Home Address"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={linkedin_profile}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            required
                            placeholder="LinkedIn Profile"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResume(e.target.files[0])}
                            required
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TraineeRegister;