import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton, Modal, Box, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";

const HrProjectDetails = () => {
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const token = localStorage.getItem("HRtoken");
  const API_URL = "http://127.0.0.1:8000/hrapi/projects/";

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProjectData(response.data);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
    };

    fetchProjectDetails();
  }, [token]);

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setCurrentProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${API_URL}${currentProject.id}/`,
        currentProject,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setProjectData((prev) =>
        prev.map((project) =>
          project.id === currentProject.id ? currentProject : project
        )
      );
      handleModalClose();
      Swal.fire({
        icon: "success",
        title: "Project Updated",
      });
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const openProjectLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="wrapper h-96 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Registered Projects</h1>
      {projectData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Project Id</th>
                <th className="py-3 px-4 border-b border-gray-300">Project Title</th>
                <th className="py-3 px-4 border-b border-gray-300">Project Description</th>
                <th className="py-3 px-4 border-b border-gray-300">Due Date</th>
                <th className="py-3 px-4 border-b border-gray-300">Project Status</th>
                <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projectData.map((project, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border whitespace-nowrap">{project.id}</td>
                  <td className="py-3 px-4 border whitespace-nowrap">{project.topic}</td>
                  <td className="py-3 px-4 border whitespace-nowrap">{project.description}</td>
                  <td className="py-3 px-4 border whitespace-nowrap">{project.end_date}</td>
                  <td className="py-3 px-4 border whitespace-nowrap">{project.project_status}</td>
                  <td className="py-3 px-4 border whitespace-nowrap">
                    <IconButton onClick={() => handleEditClick(project)}>
                      <EditIcon style={{ color: "green" }} />
                    </IconButton>
                    {project.link && (
                      <IconButton onClick={() => openProjectLink(project.link)}>
                        <VisibilityIcon style={{ color: "blue" }} />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No projects found.</p>
      )}
      {currentProject && (
        <Modal open={open} onClose={handleModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Edit Project</h2>
            <TextField
              margin="normal"
              fullWidth
              label="Project Title"
              name="topic"
              value={currentProject.topic || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Project Description"
              name="description"
              value={currentProject.description || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Due Date"
              name="end_date"
              type="date"
              value={currentProject.end_date || ''}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default HrProjectDetails;
