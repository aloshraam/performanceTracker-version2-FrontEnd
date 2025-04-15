import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Performance = () => {
  const [employee, setEmployee] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const token = localStorage.getItem("HRtoken");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/teamleadapi/employee/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PerformanceAnalyze = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/hrapi/Performance/${employee}/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.status === 200) {
        console.log("API Response:", response.data);
        setPerformanceData(response.data);
        handleOpen();
      }
    } catch (error) {
      console.error("Creation error:", error);
      toast.warning(error?.response?.data?.employee[0] || "Creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await PerformanceAnalyze();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
    Analyze Performance Section
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Analyze Performance</h2>
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="employees" className="block text-sm font-medium text-gray-900">Trainee Id</label>
          <TextField value={employee} onChange={(e) => setEmployee(e.target.value)} type="text" required fullWidth variant="outlined" />
        </div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <Dialog open={open} onClose={handleClose} className="w-3/4 mx-auto my-auto">
          <DialogTitle>Analyze Performance</DialogTitle>
          <DialogContent>
            {performanceData && (
              <DialogContentText>
                Manager: {performanceData.hr}
                <br /> Performance: {performanceData.performance}
                <br /> Trainee: {performanceData.employee}
                <br />
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isLoading ? "Loading..." : "Track"}
        </Button>
      </form>
    </div>
    
    Trainees Table
    <div className="w-full max-w-5xl h-96 overflow-y-auto wrapper">
      <h1 className="text-2xl font-semibold mb-4">Trainees</h1>
      {employeeData.length > 0 ? (
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Email</th>
                <th className="py-3 px-4 border-b border-gray-300">Position</th>
                <th className="py-3 px-4 border-b border-gray-300">Phone No</th>
                <th className="py-3 px-4 border-b border-gray-300">In Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employeeData.map((employee, index) => (
              <tr>
                <td className="py-3 px-4 border whitespace-nowrap">{employee.id}</td>
                <td className="py-3 px-4 border whitespace-nowrap">
                  <span className="underline cursor-pointer text-[-webkit-link]">{employee.name} {employee.Firstname} {employee.lastname}</span>
                </td>
                <td className="py-3 px-4 border whitespace-nowrap">{employee.email_address}</td>
                <td className="py-3 px-4 border whitespace-nowrap">{employee.job_title}</td>
                <td className="py-3 px-4 border whitespace-nowrap">{employee.phoneno}</td>
                <td className="py-3 px-4 border whitespace-nowrap">{employee.in_team ? "Yes" : "No"}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
          <p className="mt-4">No projects found.</p>
        )}
    </div>
  </div>
  
  )
};

export default Performance;
