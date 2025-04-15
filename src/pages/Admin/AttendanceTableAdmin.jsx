import React, { useEffect, useState } from 'react';
import { Table, Pagination, Card, Typography } from 'antd';
import { attendanceAdminAPI } from '@/Services/allAPI';
import moment from 'moment';

const { Title } = Typography;

const AttendanceTableAdmin = () => {
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        getAttendanceDetails();
    }, []);

    const getAttendanceDetails = async () => {
        const token = localStorage.getItem("adminToken");
        try {
            const result = await attendanceAdminAPI(token);
            if (result.status === 200) {
                const sortedData = result.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAttendanceDetails(sortedData);
                const uniqueDates = [...new Set(sortedData.map(item => item.date))];
                setDates(uniqueDates);
                setFilteredData(sortedData.filter(item => item.date === uniqueDates[0]));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const selectedDate = dates[page - 1];
        setFilteredData(attendanceDetails.filter(item => item.date === selectedDate));
    };
    console.log(filteredData);
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Login Time',
            dataIndex: 'login_time',
            key: 'login_time',
            render: (text) => moment(text, "HH:mm:ss.SSSSSS").format("hh:mm A"),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <Card style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Attendance Records </Title>
            <Table 
                columns={columns} 
                dataSource={filteredData} 
                rowKey='id' 
                pagination={false} 
                bordered
            />
            <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                current={currentPage}
                total={dates.length * 10}
                pageSize={10}
                onChange={handlePageChange}
                showSizeChanger={false}
            />
        </Card>
    );
};

export default AttendanceTableAdmin;
