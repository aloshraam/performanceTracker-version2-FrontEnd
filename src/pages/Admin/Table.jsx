import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Tabless = ({ data }) => {
    const openLink = (url) => {
        window.open(url, '_blank');
    };
console.log(data,"dfghj")
    return (
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
                    {data.map((project) => (
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
    );
};

export default Tabless;
