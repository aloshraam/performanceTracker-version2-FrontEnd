import { Box, Tab, Tabs, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getAllProjects } from "../../Services/allAPI";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const token = localStorage.getItem("adminToken");

const ProjectList = () => {
    const [managerList, setManagerList] = useState([]);
    const [value, setValue] = useState(0);

    const getManagerList = async () => {
        const result = await getAllProjects(token);
        if (result.status === 200) {
            setManagerList(result.data);
        }
    };

    useEffect(() => {
        getManagerList();
    }, []);

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="wrapper">
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs>
                        <Tab label="Projects List" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Topic</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {managerList.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.id}</TableCell>
                                        <TableCell>{project.topic}</TableCell>
                                        <TableCell>{project.description}</TableCell>
                                        <TableCell>{project.end_date}</TableCell>
                                        <TableCell>{project.project_status}</TableCell>
                                        <TableCell>
                                            {project.link && (
                                                <IconButton onClick={() => openLink(project.link)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default ProjectList;
