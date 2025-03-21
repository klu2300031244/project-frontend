package klu.Model;

import jakarta.persistence.*;
import klu.enums.AttendanceStatus;
import lombok.*;
import java.time.LocalDate;

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
    private Employee employee;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status = AttendanceStatus.ABSENT; // Default is Absent
}
