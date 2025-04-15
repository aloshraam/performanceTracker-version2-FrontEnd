import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const AssignedProject = () => {
  const [assignedProject, setAssignedProject] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [link, setLink] = useState("");
  const token = localStorage.getItem("TlToken");

  useEffect(() => {
    const fetchAssignedProjectDetail = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/teamleadapi/assignedprojects/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAssignedProject(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch assigned project details:", error);
      }
    };

    fetchAssignedProjectDetail();
  }, [token]);

  const handleCompleteButtonClick = (projectId) => {
    setCurrentProjectId(projectId);
    setShowModal(true);
  };

  const handleAssignToEmp = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/teamleadapi/assignedprojects/${currentProjectId}/project_completed/`,
        { link },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Assignment marked as complete",
        });
        const updatedProjects = assignedProject.map((project) => {
          if (project.id === currentProjectId) {
            return { ...project, status: "completed" };
          }
          return project;
        });
        setAssignedProject(updatedProjects);
        setShowModal(false);
        setLink("");
      }
    } catch (error) {
      console.error("Failed to mark project as complete:", error);
    }
  };

  const isCompleted = (projectId) => {
    const project = assignedProject.find((p) => p.id === projectId);
    return project && project.status === "completed";
  };

  return (
    <div className="wrapper mt-8 h-96 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Assigned Project</h1>
      {assignedProject.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Project</th>
                <th className="py-3 px-4 border-b border-gray-300">Team Lead</th>
                <th className="py-3 px-4 border-b border-gray-300">Team Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Assigned to Trainees</th>
                <th className="py-3 px-4 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignedProject.map((assigned, index) => {
                const completed = isCompleted(assigned.id);
                return (
                  <tr key={index}>
                    <td className="py-3 px-4 border whitespace-nowrap">{assigned.id}</td>
                    <td className="py-3 px-4 border whitespace-nowrap">{assigned.project}</td>
                    <td className="py-3 px-4 border whitespace-nowrap">{assigned.teamlead}</td>
                    <td className="py-3 px-4 border whitespace-nowrap">{assigned.team}</td>
                    <td className="py-3 px-4 border whitespace-nowrap">
                      <Link to={`/assign-to-emp/${assigned.id}`}>
                        <Button
                          className={`font-bold py-2 px-4 rounded ${
                            completed
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-700 text-white"
                          }`}
                          disabled={completed}
                        >
                          Assign to Trainees
                        </Button>
                      </Link>
                    </td>
                    <td className="py-3 px-4 border whitespace-nowrap">
                      {completed ? (
                        <span className="text-green-600 font-semibold">Completed</span>
                      ) : (
                        <button
                          onClick={() => handleCompleteButtonClick(assigned.id)}
                          type="button"
                          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No projects found.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Complete Project</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Link:
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter project link"
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAssignToEmp}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedProject;