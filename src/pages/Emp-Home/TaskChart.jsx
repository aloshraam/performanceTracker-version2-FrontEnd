import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskUpdateLists from "./TaskUpdateLists";

const TaskChart = () => {
  const [taskChart, setTaskChart] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("Emp-token");

  const fetchTaskChart = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/empapi/taskchart/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data, "response");
      setTaskChart(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch task details:", error);
      setError("Failed to fetch task details. Please try again.");
    }
  };

  useEffect(() => {
    fetchTaskChart();
  }, []);

  //task complete chart
  // const markTaskComplete = async (projectDetailId) => {
  //   if (!projectDetailId) {
  //     console.error("projectDetailId is undefined");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       `http://127.0.0.1:8000/teamleadapi/project-detail/${projectDetailId}/mark_status_complete/`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     );
  //     fetchTaskChart(); // Refresh the task list after status update
  //   } catch (error) {
  //     console.error("Error marking task as complete", error);
  //   }
  // };

  return (
    <div className="wrapper overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Task chart</h1>
      {error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : taskChart.length > 0 ? (
        <div className="relative">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Task Id</th>
                <th className="border border-gray-300 px-4 py-2">Assigned Part</th>
                <th className="border border-gray-300 px-4 py-2">Assigned Person</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">Total Days</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskChart.map((task, index) => {
                const projectDetail = task.project_detail || {};
                const isCompleted = projectDetail.status === "completed";

                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{task.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{projectDetail.assigned_part}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.assigned_person}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.start_date}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.total_days}</td>
                    <td className="border border-gray-300 px-4 py-2">{projectDetail.status}</td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <Link to={`/update-tasks/${task.id}`}>
                        <button
                          type="button"
                          className="py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Update
                        </button>
                      </Link>
                      {/* <button
                        type="button"
                        className={`py-2 px-3 rounded-md text-sm font-medium ${
                          isCompleted
                            ? "bg-green-500 cursor-not-allowed text-white"
                            : "bg-gray-700 text-white hover:bg-gray-800"
                        }`}
                        onClick={() => {
                          if (projectDetail.id) {
                            markTaskComplete(projectDetail.id);
                          } else {
                            console.error("No project detail ID found");
                          }
                        }}
                        disabled={isCompleted}
                      >
                        {isCompleted ? "Completed" : "Mark Complete"}
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No Tasks.</p>
      )}
      <TaskUpdateLists />
    </div>
  );
};

export default TaskChart;