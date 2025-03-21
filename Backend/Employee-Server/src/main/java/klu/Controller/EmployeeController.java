package klu.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import klu.Model.Employee;
import klu.Model.Manager;
import klu.Service.EmployeeService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping("/addEmployee") 
    public void addEmployee(@RequestBody Employee employee, @RequestParam Long managerId) {
        // Step 1: Fetch Manager from DB
        Manager manager = service.findManagerById(managerId);
        if (manager == null) {
            throw new RuntimeException("Manager not found with ID: " + managerId);
        }

        // Step 2: Set Manager before Saving
        employee.setManager(manager);
        System.out.println("Debug: Employee manager set -> " + employee.getManager().getId());

        // Step 3: Save Employee
        service.addEmployee(employee);
    }

    @GetMapping("/allEmployees")
    public List<Employee> getEmployees() {
        return service.getEmployees();
    }
    
    @GetMapping("/byManager/{managerId}")
    public List<Employee> getEmployeesByManager(@PathVariable Long managerId) {
        return service.getEmployeesByManager(managerId);
    }
   

}
