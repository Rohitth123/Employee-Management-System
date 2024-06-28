import React, { useContext, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { getEmployeeDetails } from '../services/api';
function EmployeeDashboard() {
  const { employees } = useContext(EmployeeContext);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const downloadPayslip = (employeeId) => {
    const doc = new jsPDF();
    const employee = employees.find((emp) => emp.id === employeeId);
    const ctc = parseFloat(employee.ctc);

    if (isNaN(ctc)) {
      alert("CTC is not a valid number for this employee.");
      return;
    }

    const monthlyCtc = (ctc / 12).toFixed(2);

    // Extract only necessary data for payslip
    const data = [
      ["Employee Name", "PAN Card", "Aadhar", "Bank Name", "Branch Name", "IFSC", "Monthly Payment"],
      [employee.full_name, employee.pan_card, employee.aadhar, employee.bank_name, employee.branch_name, employee.ifsc, monthlyCtc],
    ];

    doc.autoTable({
      head: [data[0]],
      body: data.slice(1),
    });

    doc.save(`Payslip_Employee_${employeeId}_${selectedMonth}.pdf`);
  };

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>
      <p>Welcome to the employee dashboard.</p>
      {employees.map((employee) => (
        <div key={employee.id} className="employee-details">
          <h2>{employee.full_name}'s Details</h2>
          <div className="personal-details">
            <h3>Personal Details</h3>
            <p>
              <strong>Date of Birth:</strong> {employee.date_of_birth}
            </p>
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>
            <p>
              <strong>Age:</strong> {employee.age}
            </p>
            <p>
              <strong>Current Address:</strong> {employee.current_address}
            </p>
            <p>
              <strong>Permanent Address:</strong> {employee.permanent_address}
            </p>
            <p>
              <strong>Mobile:</strong> {employee.mobile}
            </p>
            <p>
              <strong>Personal Mail:</strong> {employee.personal_mail}
            </p>
            <p>
              <strong>Emergency Contact Name:</strong>{" "}
              {employee.emergency_contact_name}
            </p>
            <p>
              <strong>Emergency Contact Mobile:</strong>{" "}
              {employee.emergency_contact_mobile}
            </p>
          </div>
          <div className="professional-details">
            <h3>Professional Details</h3>
            <p>
              <strong>Employment Code:</strong> {employee.employment_code}
            </p>
            <p>
              <strong>Role ID:</strong> {employee.role_id}
            </p>
            <p>
              <strong>Office Phone:</strong> {employee.office_phone}
            </p>
            <p>
              <strong>Office Address:</strong> {employee.office_address}
            </p>
            <p>
              <strong>Reporting Manager:</strong> {employee.reporting_manager}
            </p>
            <p>
              <strong>HR Name:</strong> {employee.hr_name}
            </p>
          </div>
          <div className="project-details">
            <h3>Project Details</h3>
            <p>
              <strong>Client Name:</strong> {employee.client_name}
            </p>
            <p>
              <strong>Project Start Date:</strong> {employee.project_start_date}
            </p>
            <p>
              <strong>Project End Date:</strong> {employee.project_end_date}
            </p>
            <p>
              <strong>Project Reporting Manager:</strong>{" "}
              {employee.project_reporting_manager}
            </p>
          </div>
          <div className="payslip-details">
            <h3>Generate Payslip</h3>
            <label htmlFor="month">Select Month:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button onClick={() => downloadPayslip(employee.id)}>
              Download Payslip
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDashboard;
