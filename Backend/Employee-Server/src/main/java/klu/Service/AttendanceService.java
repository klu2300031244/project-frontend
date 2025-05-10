package klu.Service;

import klu.Model.Attendance;
import klu.Model.Employee;
import klu.enums.AttendanceStatus;
import klu.Repository.AttendanceRepository;
import klu.Repository.EmployeeRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepo employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, 
                          EmployeeRepo employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public Attendance markAttendance(Long employeeId, LocalDate date, AttendanceStatus status) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        
        // Check if attendance already exists for this employee and date
        Optional<Attendance> existingAttendance = attendanceRepository
                .findByEmployee_IdAndDate(employeeId, date);
        
        if (existingAttendance.isPresent()) {
            Attendance attendance = existingAttendance.get();
            attendance.setStatus(status);
            return attendanceRepository.save(attendance);
        } else {
            Attendance attendance = new Attendance();
            attendance.setEmployee(employee);
            attendance.setDate(date);
            attendance.setStatus(status);
            return attendanceRepository.save(attendance);
        }
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAllAttendanceRecords() {
        return attendanceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAttendanceByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployee_Id(employeeId);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAttendanceByStatus(AttendanceStatus status) {
        return attendanceRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Attendance> getAttendanceByEmployeeAndDateRange(Long employeeId, 
                                                              LocalDate startDate, 
                                                              LocalDate endDate) {
        return attendanceRepository.findByEmployee_IdAndDateBetween(employeeId, startDate, endDate);
    }

    

    @Transactional
    public void deleteAttendanceRecord(Long id) {
        attendanceRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
	public List<Attendance> getAttendanceByEmployeeAndMonth(Long employeeId, int year, int month) {
		LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        return attendanceRepository.findByEmployee_IdAndDateBetween(employeeId, startDate, endDate);
	}
}