import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';

const ViewTeaminDetail = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("TlToken");

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/teamleadapi/allemployee/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setTeamData(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch team details:", error);
        setError("Failed to fetch team details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [token]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="wrapper mt-8  overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Trainee in Detail</h1>
<Paper>
      {error && <Alert severity="error">{error}</Alert>}
      {teamData.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trainee ID</TableCell>
                <TableCell>Trainee Name</TableCell>
                <TableCell>Team Name</TableCell>
                <TableCell>Team Lead Name</TableCell>
                <TableCell>Project Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamData.map((trainee) => (
                <TableRow key={trainee.id}>
                  <TableCell>{trainee.id}</TableCell>
                  <TableCell>{trainee.name}</TableCell>
                  <TableCell>{trainee.team_names.join(", ") || "N/A"}</TableCell>
                  <TableCell>{trainee.team_lead.join(", ") || "N/A"}</TableCell>
                  <TableCell>
                    {trainee.project_details ? (
                      <div>
                        <Typography variant="body2">Project Name: {trainee.project_details.project_name}</Typography>
                        <Typography variant="body2">Assigned Part: {trainee.project_details.assigned_part}</Typography>
                        <Typography variant="body2">Status: {trainee.project_details.status}</Typography>
                      </div>
                    ) : (
                      "No project details"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No trainee data available</Typography>
      )}
    </Paper>
    </div>
  );
};

export default ViewTeaminDetail;
