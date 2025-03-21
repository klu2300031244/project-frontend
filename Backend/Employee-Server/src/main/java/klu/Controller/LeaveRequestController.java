package klu.Controller;

import klu.Model.LeaveRequest;
import klu.enums.LeaveStatus;
import klu.Service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Apply for leave
    @PostMapping("/request")
    public LeaveRequest requestLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.requestLeave(leaveRequest);
    }

    // Get all leave requests for an employee
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeavesByEmployee(employeeId);
    }

    // Approve leave
    @PutMapping("/approve/{leaveId}")
    public LeaveRequest approveLeave(@PathVariable Long leaveId) {
        return leaveRequestService.updateLeaveStatus(leaveId, LeaveStatus.APPROVED);
    }

    // Reject leave
    @PutMapping("/reject/{leaveId}")
    public LeaveRequest rejectLeave(@PathVariable Long leaveId) {
        return leaveRequestService.updateLeaveStatus(leaveId, LeaveStatus.REJECTED);
    }
}
