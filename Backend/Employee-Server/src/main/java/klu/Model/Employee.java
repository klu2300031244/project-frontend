package klu.Model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import klu.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String org; // Inherits from Manager

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING; // Employee Approval Status
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getOrg() {
		return org;
	}
	public void setOrg(String org) {
		this.org = org;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Manager getManager() {
		return manager;
	}
	public void setManager(Manager manager) {
		this.manager = manager;
	}
	public List<LeaveRequest> getLeaveRequests() {
		return leaveRequests;
	}
	public void setLeaveRequests(List<LeaveRequest> leaveRequests) {
		this.leaveRequests = leaveRequests;
	}
	public List<Attendance> getAttendanceRecords() {
		return attendanceRecords;
	}
	public void setAttendanceRecords(List<Attendance> attendanceRecords) {
		this.attendanceRecords = attendanceRecords;
	}
	@ManyToOne(fetch = FetchType.EAGER) // ✅ Changed to EAGER for PrePersist
    @JoinColumn(name = "manager_id", nullable = false)
    @JsonBackReference  // Prevents infinite recursion

    private Manager manager;

    @PrePersist
    public void setOrgFromManager() {
    	if (manager != null && manager.getOrg() != null) {
            this.org = manager.getOrg();
            System.out.println("PrePersist executed: Setting org = " + this.org);
        } else {
            System.out.println("PrePersist executed: Manager or org is null");
        }
    }
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference 
    private List<LeaveRequest> leaveRequests = new ArrayList<>();
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attendance> attendanceRecords = new ArrayList<>();


}
