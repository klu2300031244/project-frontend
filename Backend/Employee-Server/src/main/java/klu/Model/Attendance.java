package klu.Model;

import jakarta.persistence.*;
import klu.enums.AttendanceStatus;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "attendance")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnore
    private Employee employee;

    @JsonProperty("employeeId")  // This will include employeeId in JSON response
    public Long getEmployeeId() {
        return employee != null ? employee.getId() : null;
    }

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status = AttendanceStatus.ABSENT;
}
