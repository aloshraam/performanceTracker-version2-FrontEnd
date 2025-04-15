import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmployeePerformance = () => {
    const [performanceData, setPerformanceData] = useState(null);
    const token = localStorage.getItem("Emp-token");
    const user = localStorage.getItem("userID");

    useEffect(() => {
        const fetchPerformanceDetails = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/hrapi/Performance/${user}/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );
                setPerformanceData(response.data);
            } catch (error) {
                console.error("Failed to fetch performance details:", error);
            }
        };

        if (token && user) {
            fetchPerformanceDetails();
        }
    }, [token, user]);

    const formatData = (data) => {
        return [
            { name: 'Performance', value: data.performance },
            { name: 'Remaining', value: 100 - data.performance }
        ];
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="mt-8">

        
            {performanceData ? (
                <ResponsiveContainer width="100%" height={500}>
                    <h1 className="text-3xl font-medium text-center text-primary mb-6">My Perfomance</h1>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={formatData(performanceData)}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {formatData(performanceData).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div>No Performance Available</div>
            )}
        </div>
    );
};

export default EmployeePerformance;
