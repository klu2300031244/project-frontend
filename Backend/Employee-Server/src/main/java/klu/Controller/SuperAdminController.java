package klu.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import klu.Model.Employee;
import klu.Service.EmailService;
import klu.Service.EmployeeService;
import klu.enums.Status;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SuperAdminController {
	@Autowired 
	private EmployeeService employeeservice;
	@Autowired
	private EmailService emailService;
	@PostMapping("/updateEmployeeStatus/{id}")
	public ResponseEntity<String> updateEmployeeStatus(@PathVariable Long id, @RequestParam String status) {
	    Employee updatedEmployee = employeeservice.updateEmployeeStatus(id, Status.valueOf(status.toUpperCase()));

	    // Send email after updating status
	    String subject = "Your Employee Account is Now Active";
	    String message = "Hello " + updatedEmployee.getName() + ",\n\n"
	            + "Your account status has been updated to: " + updatedEmployee.getStatus() + ".\n"
	            + "You can now log in using the following credentials:\n\n"
	            + "Email: " + updatedEmployee.getEmail() + "\n"
	            + "Password: " + updatedEmployee.getPassword() + "\n\n"
	            + "For security reasons, please change your password after logging in.\n\n"
	            + "Best regards,\nAdmin Team";

	    emailService.sendEmail(updatedEmployee.getEmail(), subject, message);

	    return ResponseEntity.ok("Employee status updated and email with credentials sent successfully.");
	}

}
