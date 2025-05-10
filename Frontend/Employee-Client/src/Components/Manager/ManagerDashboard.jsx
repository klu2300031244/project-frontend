import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Nav,
  Button,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddEmployee from "../Manager/AddEmployee";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [managerId, setManagerId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    recentLeaves: [],
  });
  const navigate = useNavigate();
  const managerName = localStorage.getItem("managerName") || "Manager";

  useEffect(() => {
    const storedManagerId = localStorage.getItem("managerId");
    if (storedManagerId) {
      setManagerId(storedManagerId);
      fetchEmployees(storedManagerId);
      fetchDashboardStats(storedManagerId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchEmployees = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employees/byManager/${id}`
      );
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  const fetchDashboardStats = async (id) => {
    try {
      const [employeesRes, leavesRes] = await Promise.all([
        axios.get(`http://localhost:8080/employees/count/byManager/${id}`),
        axios.get(`http://localhost:8080/leave-requests/pending/byManager/${id}`),
      ]);

      setStats({
        totalEmployees: employeesRes.data.count,
        pendingLeaves: leavesRes.data.length,
        recentLeaves: leavesRes.data.slice(0, 3),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="sidebar bg-primary text-white vh-100 sticky-top">
          <div className="sidebar-header p-4 text-center">
            <h4 className="text-white">HR Portal</h4>
            <div className="employee-info mt-4">
              <div 
                className="avatar bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <span className="fs-3 fw-bold">{managerName.charAt(0)}</span>
              </div>
              <h5 className="mb-0 text-white">{managerName}</h5>
              <small className="text-white-50">Manager</small>
            </div>
          </div>

          <Nav className="flex-column p-3">
            <Nav.Item className="mb-2">
              <Nav.Link as={Link} to="/managerdashboard" className="text-white active bg-primary-dark rounded">
                <i className="bi bi-speedometer2 me-2"></i>Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link as={Link} to="/leave/approvals" className="text-white hover-bg-primary-dark rounded">
                <i className="bi bi-calendar-event me-2"></i>Leave Approvals
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link as={Link} to="/attendance/manage" className="text-white hover-bg-primary-dark rounded">
                <i className="bi bi-clock-history me-2"></i>Attendance
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link href="#" className="text-white hover-bg-primary-dark rounded">
                <i className="bi bi-people-fill me-2"></i>Team Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link href="#" className="text-white hover-bg-primary-dark rounded">
                <i className="bi bi-graph-up me-2"></i>Reports
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-4">
              <Button
                variant="outline-light"
                size="sm"
                className="w-100"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-left me-2"></i>Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={10} className="main-content p-4 bg-light">
          {/* Top Navigation */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Manager Dashboard</h2>
            <div className="d-flex align-items-center">
              <Button variant="outline-primary" size="sm" className="me-2">
                <i className="bi bi-bell-fill"></i>
              </Button>
              <Button variant="outline-primary" size="sm" className="me-3">
                <i className="bi bi-envelope-fill"></i>
              </Button>
              <span className="text-muted">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <Row className="mb-4 g-3">
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0" style={{ marginLeft:"100px"}}>
                <Card.Body className="text-center">
                  <div className="icon-circle bg-blue-light mb-3 mx-auto">
                    <i className="bi bi-people-fill text-primary fs-4"></i>
                  </div>
                  <h5 className="text-muted mb-2">Team Members</h5>
                  <h2 className="text-primary mb-0">{stats.totalEmployees}</h2>
                </Card.Body>
              </Card>
            </Col>
             <Col md={6}>
                            <Card className="h-100 shadow-sm border-0">
                <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Leave Requests</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    as={Link} 
                    to="/leave/approvals"
                  >
                    View All
                  </Button>
                </Card.Header>
                <Card.Body>
                  {stats.recentLeaves.length > 0 ? (
                    <Table hover responsive className="mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Employee</th>
                          <th>Dates</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentLeaves.map((leave) => (
                          <tr key={leave.id}>
                            <td>Emp. #{leave.employeeId}</td>
                            <td>{leave.startDate} to {leave.endDate}</td>
                            <td>
                              <Badge bg="warning" className="text-white">Pending</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-calendar-x text-muted fs-1"></i>
                      <p className="text-muted mt-2">No pending leave requests</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
             </Col>
            
          </Row>

          {/* Recent Activities and Team Sections */}
          <Row className="g-3">
            {/* Leave Requests Card */}
            
            {/* Team Members Card */}
            
              <Card className="h-100 shadow-sm border-0" style={{ maxHeight: "600px",minWidth: "800px" ,marginLeft:"250px"}} >
                <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center" style={{ maxHeight: "600px",minWidth: "700px", marginTop: "40px" }}>
                  <h5 className="mb-0">Your Team</h5>
                  <AddEmployee managerId={managerId} />
                </Card.Header>
                <Card.Body>
                  {loading ? (
                    <div className="text-center py-4">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : employees.length > 0 ? (
                    <div className="table-responsive">
                      <Table hover className="mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((employee) => (
                            <tr key={employee.id}>
                              <td>{employee.id}</td>
                              <td>{employee.name}</td>
                              <td>{employee.email}</td>
                              <td>
                                <Badge bg={employee.active ? "success" : "secondary"}>
                                  {employee.active ? "Active" : "Inactive"}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-people text-muted fs-1"></i>
                      <p className="text-muted mt-2">No employees found</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
          
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerDashboard;