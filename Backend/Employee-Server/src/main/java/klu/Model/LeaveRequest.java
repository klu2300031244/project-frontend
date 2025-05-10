package klu.Model;

import jakarta.persistence.*;
import klu.enums.LeaveStatus;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "leave_requests")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonBackReference
    private Employee employee;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status = LeaveStatus.PENDING;

    private String description;
}
