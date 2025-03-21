package klu.Controller;

import klu.Model.Attendance;
import klu.Service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Mark attendance manually
    @PostMapping("/mark")
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }

    // Get attendance records for an employee
    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getAttendanceByEmployee(@PathVariable Long employeeId) {
        return attendanceService.getAttendanceByEmployee(employeeId);
    }
}
