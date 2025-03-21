package klu.Service;

import klu.Model.Attendance;
import klu.Repository.AttendanceRepository;
import klu.Repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepo employeeRepository;

    // Mark attendance manually
    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    // Get attendance records for an employee
    public List<Attendance> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }
}
