package klu.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import klu.Model.Employee;
import klu.Model.Manager;
import klu.Service.EmployeeService;
import klu.Service.ManagerService;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private ManagerService managerService;

    @Autowired
    private EmployeeService employeeService;
    @PostMapping("/login")
    public Map<String, Object> login(@RequestParam String email, @RequestParam String password) {
        Map<String, Object> response = new HashMap<>();

        // Check in Manager Table
        Manager manager = managerService.findByEmail(email);
        if (manager != null && manager.getPassword().equals(password)) {
            response.put("id", manager.getId());
            response.put("role", "MANAGER");
            return response;
        }

        // Check in Employee Table
        Employee employee = employeeService.findByEmail(email);
        if (employee != null && employee.getPassword().equals(password)) {
            if (employee.getStatus() == klu.enums.Status.ACCEPTED) { // Ensure employee is approved
                response.put("id", employee.getId());
                response.put("role", "EMPLOYEE");
                return response;
            } else {
                response.put("error", "Your account is pending/rejected. Contact admin.");
                return response;
            }
        }

        // Invalid Login
        response.put("error", "Invalid credentials.");
        return response;
    }
}
