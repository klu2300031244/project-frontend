import React, { useEffect, useRef } from "react";
import "../css/FAQ.css";
import HomeNavbar from "../NavBars/HomeNavbar";

const colors = [
  "#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8",
  "#6c757d", "#6610f2", "#fd7e14", "#20c997",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const faqs = [
  { id: 1, question: "What is the purpose of this EMS?", answer: "The Employee Management System (EMS) helps organizations manage employee records, attendance, payroll, and performance efficiently.", icon: "bi-person-fill-gear" },
  { id: 2, question: "How can I add a new employee?", answer: "To add an employee, go to the Admin Dashboard, navigate to 'Employees', and click 'Add Employee'. Fill in the details and save.", icon: "bi-person-plus-fill" },
  { id: 3, question: "Can employees update their profiles?", answer: "Yes, employees can update their profiles by logging in and accessing the 'Profile' section in the dashboard.", icon: "bi-pencil-square" },
  { id: 4, question: "Does this system support payroll management?", answer: "Yes, the system automates payroll calculations, including salaries, deductions, and tax calculations.", icon: "bi-cash-coin" },
  { id: 5, question: "How does the leave management work?", answer: "Employees can apply for leaves via the system, and managers can approve or reject leave requests through the dashboard.", icon: "bi-calendar-check-fill" },
  { id: 6, question: "Can managers track employee attendance?", answer: "Yes, managers can view daily, weekly, and monthly attendance records from the attendance module.", icon: "bi-clipboard-data" },
  { id: 7, question: "Is there role-based access control?", answer: "Yes, EMS provides role-based access, where admins, managers, and employees have different permission levels.", icon: "bi-shield-lock-fill" },
  { id: 8, question: "How secure is employee data?", answer: "The EMS uses encryption and authentication mechanisms to ensure data security and privacy.", icon: "bi-lock-fill" },
  { id: 9, question: "Can reports be generated?", answer: "Yes, detailed reports on attendance, payroll, and employee performance can be generated and exported.", icon: "bi-bar-chart-line-fill" },
];

const FAQ = () => {
  const faqContainerRef = useRef(null);

  useEffect(() => {
    const faqContainer = faqContainerRef.current;
    if (!faqContainer) return;

    // Duplicate the FAQ cards for smooth scrolling
    faqContainer.innerHTML += faqContainer.innerHTML;

    let position = 0;
    const speed = 1; // Adjust scrolling speed

    function scrollLoop() {
      position += speed;
      if (position >= faqContainer.scrollHeight / 2) {
        position = 0; // Reset scroll for seamless loop
      }
      faqContainer.style.transform = `translateY(-${position}px)`;
      requestAnimationFrame(scrollLoop);
    }

    scrollLoop();
  }, []);

  return (
    <div>
      <HomeNavbar />
      <div className="container-faq mt-5">
        <div className="row">
          <div className="col-md-3">
          <h2 className="text-center faq-heading ">Popular - FAQs</h2>
          <button type="button" class="btn btn-primary btn-lg faq-button">Write US</button>
          </div>
          <div className="col-md-9 faq-main" ref={faqContainerRef}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="col-md-4 mb-4"
                data-bs-toggle="modal"
                data-bs-target={`#faqModal${faq.id}`}
              >
                <div className="faq-cards text-center p-3">
                  <div
                    className="icon-box"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <i className={`bi ${faq.icon} fs-1`}></i>
                  </div>
                  <h5 className="mt-2">{faq.question}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bootstrap Modals */}
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="modal fade"
            id={`faqModal${faq.id}`}
            tabIndex="-1"
            aria-labelledby={`faqModalLabel${faq.id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{faq.question}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">{faq.answer}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
