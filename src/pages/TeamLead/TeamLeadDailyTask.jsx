import { getDailyTaskTeamLeadAPI, markPerformanceAPI } from "@/Services/allAPI";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function TeamLeadDailyTask() {
  const [groupedTasks, setGroupedTasks] = useState({});
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [selectedEmpName, setSelectedEmpName] = useState("");
  const [performanceScore, setPerformanceScore] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Function to group tasks by employee name
  const groupTasksByEmployee = (tasks) => {
    const grouped = {};
    tasks.forEach((task) => {
      const empName = task.emp.name;
      if (!grouped[empName]) {
        grouped[empName] = [];
      }
      grouped[empName].push(task);
    });
    return grouped;
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("TlToken");
    const result = await getDailyTaskTeamLeadAPI(token);
    console.log(result.data);
    if (result.status === 200) {
      const grouped = groupTasksByEmployee(result.data);
      setGroupedTasks(grouped);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = true;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (empId, empName) => {
    setSelectedEmpId(empId);
    setSelectedEmpName(empName);
    setShowModal(true);
  };

  const handleSubmitPerformance = async () => {
    const token = localStorage.getItem("TlToken");

    if (!selectedEmpId || !performanceScore) {
      alert("Please fill out all fields");
      return;
    }

    const body = {
      performance: performanceScore,
      employee: selectedEmpId,
    };

    try {
      const result = await markPerformanceAPI(body, token);
      if (result.status === 200 || result.status === 201) {
        alert("Performance marked successfully!");
        setShowModal(false);
        setPerformanceScore("");
        setSelectedEmpId(null);
        setSelectedEmpName("");
      } else {
        alert("Failed to mark performance.");
      }
    } catch (error) {
      console.error("Error marking performance:", error);
      alert("An error occurred while submitting.");
    }
  };

  return (
    <div className="wrapper p-6">
      <h3 className="text-3xl font-bold text-center text-primary mb-8">All Tasks</h3>

      {Object.entries(groupedTasks).map(([empName, tasks]) => (
        <div key={empName} className="mb-10">
          <h2 className="text-2xl font-semibold capitalize mb-2">{empName}&apos;s Tasks</h2>

          <button
            onClick={() => openModal(tasks[0].emp.id, empName)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mark Performance
          </button>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start gap-2">
                <Checkbox id={`task-${task.id}`} checked={task.is_completed} />
                <div>
                  <Label htmlFor={`task-${task.id}`} className="text-md font-medium">
                    {task.task}
                  </Label>
                </div>
                {task.is_completed && task.file && task.file !== "/null" && (
                  <button
                    onClick={() => handleDownload(`http://127.0.0.1:8000${task.file}`)}
                    className="ml-2"
                  >
                    <FaEye className="text-blue-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <h3 className="text-xl font-semibold mb-4">
              Mark Performance for{" "}
              <span className="text-blue-600 capitalize">{selectedEmpName}</span>
            </h3>
            <input
              type="number"
              min="0"
              max="100"
              value={performanceScore}
              onChange={(e) => setPerformanceScore(e.target.value)}
              placeholder="Enter performance score"
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedEmpId(null);
                  setSelectedEmpName("");
                  setPerformanceScore("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPerformance}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}