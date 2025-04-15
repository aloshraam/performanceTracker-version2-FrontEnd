import { getDailyTaskAPI, updateDailyTaskAPI } from "@/Services/allAPI";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DailyTask() {
  const [allTask, setAllTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [file, setFile] = useState(null);

  const getDailyTask = async () => {
    const token = localStorage.getItem("Emp-token");
    const result = await getDailyTaskAPI(token);
    if (result.status === 200) {
      setAllTask(result.data);
    }
  };

  useEffect(() => {
    getDailyTask();
  }, []);

  const handleButtonClick = (id) => {
    console.log(id);
    setCurrentTaskId(id);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const token = localStorage.getItem("Emp-token");
    const formData = new FormData();
    formData.append("file_data", file);

    const result = await updateDailyTaskAPI(token, formData, currentTaskId);
    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "File Uploaded and Task Completed",
      });
      setShowModal(false);
      setFile(null);
      setCurrentTaskId(null);
      getDailyTask();
    }
  };

  return (
    <main className="wrapper dark:bg-gray-950">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50">
        Daily Tasks
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 dark:text-gray-200">Task</th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 dark:text-gray-200">Due Date</th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTask.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">No Task Available</td>
              </tr>
            ) : (
              allTask.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-400">{task.task}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-400 ">{task.due_date}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-400">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleButtonClick(task.id)}
                    >
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
