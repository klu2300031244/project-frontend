package klu.Service;

import klu.Model.LeaveRequest;
import klu.Model.Employee;
import klu.Model.Attendance;
import klu.enums.LeaveStatus;
import klu.enums.AttendanceStatus;
import klu.Repository.LeaveRequestRepository;
import klu.Repository.EmployeeRepo;
import klu.Repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepo employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    // Request a leave
    public LeaveRequest requestLeave(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    // Get all leave requests by employee
    public List<LeaveRequest> getLeavesByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    // Approve or Reject leave
    public LeaveRequest updateLeaveStatus(Long leaveId, LeaveStatus status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));

        leaveRequest.setStatus(status);
        leaveRequestRepository.save(leaveRequest);

        if (status == LeaveStatus.APPROVED) {
            markLeaveInAttendance(leaveRequest);
        }

        return leaveRequest;
    }

    // Mark Leave in Attendance
    private void markLeaveInAttendance(LeaveRequest leaveRequest) {
        Employee employee = leaveRequest.getEmployee();
        for (LocalDate date = leaveRequest.getStartDate(); !date.isAfter(leaveRequest.getEndDate()); date = date.plusDays(1)) {
            Attendance attendance = new Attendance();
            attendance.setEmployee(employee);
            attendance.setDate(date);
            attendance.setStatus(AttendanceStatus.LEAVE);
            attendanceRepository.save(attendance);
        }
    }
}
