package klu.Service;

import klu.Model.LeaveRequest;
import klu.Model.Employee;
import klu.enums.LeaveStatus;
import klu.Repository.EmployeeRepo;
import klu.Repository.LeaveRequestRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepo employeeRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, 
                             EmployeeRepo employeeRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public LeaveRequest createLeaveRequest(Long employeeId, LocalDate startDate, 
                                         LocalDate endDate, String description) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(employee);
        leaveRequest.setStartDate(startDate);
        leaveRequest.setEndDate(endDate);
        leaveRequest.setDescription(description);
        leaveRequest.setStatus(LeaveStatus.PENDING);
        
        return leaveRequestRepository.save(leaveRequest);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getLeaveRequestsByStatus(LeaveStatus status) {
        return leaveRequestRepository.findByStatus(status);
    }

    @Transactional
    public LeaveRequest updateLeaveRequestStatus(Long id, LeaveStatus status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with id: " + id));
        
        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }

    @Transactional
    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean isLeaveRequestOverlapping(Long employeeId, LocalDate startDate, LocalDate endDate) {
        return leaveRequestRepository.existsByEmployeeIdAndStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatus(
                employeeId, endDate, startDate, LeaveStatus.APPROVED);
    }

    @Transactional(readOnly = true)
    public List<LeaveRequest> getPendingLeaveRequestsByManager(Long managerId) {
        return leaveRequestRepository.findByEmployeeManagerIdAndStatus(managerId, LeaveStatus.PENDING);
    }
}
