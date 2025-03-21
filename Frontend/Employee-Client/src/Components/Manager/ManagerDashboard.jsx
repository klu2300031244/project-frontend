import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "../Manager/AddEmployee";

const ManagerDashboard = () => {
  const [managerId, setManagerId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedManagerId = localStorage.getItem("managerId");
    if (storedManagerId) {
      console.log("Manager ID found in localStorage:", storedManagerId);
      setManagerId(storedManagerId);
      fetchEmployees(storedManagerId);
    } else {
      console.error("No manager ID found. Redirecting to login.");
      window.location.href = "/login"; // Redirect if not logged in
    }
  }, []);

  const fetchEmployees = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/employees/byManager/${id}`);
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  return (
    <div className="manager-container mt-4">
      <div className="manager-card shadow p-4">
        <h1 className="text-center text-primary">Manager Dashboard</h1>
        {managerId ? (
          <>
            <div className="alert alert-info text-center">
              <strong>Manager ID:</strong> {managerId}
            </div>

            <AddEmployee managerId={managerId} />

            <h2 className="mt-4 text-secondary">Employees Under You</h2>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : employees.length > 0 ? (
              <table className="table table-striped mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-danger">No employees found.</p>
            )}
          </>
        ) : (
          <p className="text-center text-warning">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
