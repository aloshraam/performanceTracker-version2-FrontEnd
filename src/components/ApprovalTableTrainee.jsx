import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { approveTraineeAPI } from "../Services/allAPI";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ApprovalTableTrainee = ({ data, getTraineeList }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleAccept = async (id) => {
    const token = localStorage.getItem("adminToken");
    const result = await approveTraineeAPI(id, token);
    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Approved",
        text: "You have successfully approved the trainee",
      });
      getTraineeList();
    }
  };

  return (
    <div>
      {data?.length === 0 ? (
        <p className="mt-6 text-center">No request Available</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell align="right">Email address</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Resume</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                console.log("Resume URL for", row.name || row.firstname, ":", row.resume);
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <span className="capitalize">
                        {row.name
                          ? row.name
                          : `${row.firstname || ""} ${row.lastname || ""}`}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.email_address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.phoneno}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.resume ? (
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => window.open(`http://127.0.0.1:8000${row.resume}`, "_blank")}
                        >
                          View Resume
                        </Button>
                      ) : (
                        "No resume"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="flex gap-4 justify-end">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleAccept(row.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Optional Reject Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className="text-center">Are you sure you want to reject?</p>
          </Typography>
          <div className="flex gap-4 justify-center mt-6">
            <Button size="small" variant="contained" color="success">
              Accept
            </Button>
            <Button
              onClick={handleClose}
              size="small"
              variant="outlined"
              color="error"
            >
              Reject
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

ApprovalTableTrainee.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email_address: PropTypes.string,
      id: PropTypes.number,
      phoneno: PropTypes.number,
      resume: PropTypes.string,
    })
  ),
  getTraineeList: PropTypes.func,
};

export default ApprovalTableTrainee;