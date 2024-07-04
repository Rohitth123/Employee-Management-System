import React, { useState, useContext, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";

function AdminDashboard() {
  const { employees, setEmployees } = useContext(EmployeeContext);

  const initialFormState = {
    employment_code: "",
    full_name: "",
    date_of_birth: "",
    gender: "",
    age: "",
    current_address: "",
    permanent_address: "",
    mobile: "",
    personal_mail: "",
    company_mail: "",
    emergency_contact_name: "",
    emergency_contact_mobile: "",
    role_id: "",
    office_phone: "",
    office_address: "",
    reporting_manager: "",
    hr_name: "",
    date_of_joining: "",
    employment_history: "",
    client_name: "",
    project_start_date: "",
    project_end_date: "",
    project_reporting_manager: "",
    pan_card: "",
    aadhar: "",
    bank_name: "",
    branch_name: "",
    ifsc: "",
    ctc: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialFormState);
  const [currentSection, setCurrentSection] = useState(null);
  const [error, setError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    setForm(initialFormState);
    setCurrentSection("personal");
    setIsUpdate(false);
    setIsDisabled(false);
    setIsEmailDisabled(false);
  };

  const handleViewClick = () => {
    setCurrentSection("viewEmpList");
    setError("");
  };

  const handleSubmit = () => {
    if (currentSection === "personal") {
      const inputElements = document.querySelectorAll(
        '[id^="PersonalDetails"]'
      );
      console.log(inputElements);
      inputElements.forEach((input) => {
        if (input.value === "") {
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #ccc"; // Reset to default if needed
        }
      });
    }

    if (currentSection === "professional") {
      const inputElements = document.querySelectorAll('[id^="ProfDetails"]');
      console.log(inputElements);
      inputElements.forEach((input) => {
        if (input.value === "") {
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #ccc"; // Reset to default if needed
        }
      });
    }

    if (currentSection === "project") {
      const inputElements = document.querySelectorAll('[id^="ProjDetails"]');
      console.log(inputElements);
      inputElements.forEach((input) => {
        if (input.value === "") {
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #ccc"; // Reset to default if needed
        }
      });
    }

    if (currentSection === "finance") {
      const inputElements = document.querySelectorAll('[id^="FinaDetails"]');
      console.log(inputElements);
      inputElements.forEach((input) => {
        if (input.value === "") {
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #ccc"; // Reset to default if needed
        }
      });
    }
  };

  // const handleSubmit = () => {
  //   if (
  //     !form.employment_code ||
  //     !isUniqueEmploymentCode(form.employment_code)
  //   ) {
  //     setError("Employment code must be unique and non-empty.");
  //     return;
  //   }
  //   setError("");
  //   // Submit the form data
  //   if (!form.id) {
  //     setEmployees([...employees, { ...form, id: employees.length + 1 }]);
  //   } else {
  //     setEmployees(employees.map((emp) => (emp.id === form.id ? form : emp)));
  //   }
  //   setForm(initialFormState);
  //   setCurrentSection("viewEmpList");
  // };

  const saveAndMoveToNextSection = () => {
    const sections = ["personal", "professional", "project", "finance"];
    if (currentSection === "personal" && !isUpdate) {
      if (
        !form.employment_code ||
        !isUniqueEmploymentCode(form.employment_code)
      ) {
        setError("Employment code must be unique and non-empty.");
        return;
      }
    }

    let existingEmp = employees.filter(
      (emp) => emp.employment_code === form.employment_code
    );

    if (existingEmp.length > 0) {
      // Add new employee
      setEmployees(
        employees.map((emp) => {
          if (emp.employment_code === form.employment_code) {
            return { ...form, id: form.employment_code };
          }
          return emp;
        })
      );
    } else {
      // Add new employee
      setEmployees([...employees, { ...form, id: employees.length + 1 }]);
    }

    if (currentSection === "finance") {
      setCurrentSection("viewEmpList");
      setError("");
      return;
    }

    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setCurrentSection(sections[nextIndex]);
    setError("");
  };

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setForm(employee);
    setIsUpdate(true);
    setCurrentSection("personal");
    setIsDisabled(true);
    if (employee.personal_mail) {
      setIsEmailDisabled(true);
    }
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const isUniqueEmploymentCode = (code) => {
    return !employees.some((emp) => emp.employment_code === code);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.employment_code
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employee.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, employees]);

  // const handleSave = () => {
  //   if (
  //     !form.employment_code ||
  //     !isUniqueEmploymentCode(form.employment_code)
  //   ) {
  //     setError("Employment code must be unique and non-empty.");
  //     return;
  //   }
  //   setError("");
  //   // Save the form data without submission
  //   if (!form.id) {
  //     setEmployees([...employees, { ...form, id: employees.length + 1 }]);
  //   } else {
  //     setEmployees(employees.map((emp) => (emp.id === form.id ? form : emp)));
  //   }
  // };

  // const handleActiveToggle = (id) => {
  //   setEmployees(
  //     employees.map((emp) =>
  //       emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
  //     )
  //   );
  // };

  // const nextSection = () => {
  //   const sections = ["personal", "professional", "project", "finance"];
  //   const currentIndex = sections.indexOf(currentSection);
  //   const nextIndex = (currentIndex + 1) % sections.length;
  //   setCurrentSection(sections[nextIndex]);
  // };

  const renderFormSection = () => {
    switch (currentSection) {
      case "personal":
        return (
          <div className="detailsSection">
            <h2>Personal Details</h2>
            <input
              id="PersonalDetails_1"
              type="text"
              name="employment_code"
              disabled={isDisabled}
              value={form.employment_code}
              onChange={handleChange}
              placeholder="Employment Code"
              required
            />
            <input
              id="PersonalDetails_2"
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              id="PersonalDetails_3"
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              placeholder="Date of Birth"
              required
            />
            {/* <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              placeholder="Gender"
              required
            /> */}
            <select
              id="PersonalDetails_12"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">--Please choose a gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              id="PersonalDetails_4"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            <input
              id="PersonalDetails_5"
              type="text"
              name="current_address"
              value={form.current_address}
              onChange={handleChange}
              placeholder="Current Address"
              required
            />
            <input
              id="PersonalDetails_6"
              type="text"
              name="permanent_address"
              value={form.permanent_address}
              onChange={handleChange}
              placeholder="Permanent Address"
              required
            />
            <input
              id="PersonalDetails_7"
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
            />
            <input
              id="PersonalDetails_8"
              type="email"
              name="personal_mail"
              disabled={isEmailDisabled}
              value={form.personal_mail}
              onChange={handleChange}
              placeholder="Personal Mail"
              required
            />
            <input
              id="PersonalDetails_9"
              type="email"
              name="company_mail"
              value={form.company_mail}
              onChange={handleChange}
              placeholder="Company Mail"
              required
            />
            <input
              id="PersonalDetails_10"
              type="text"
              name="emergency_contact_name"
              value={form.emergency_contact_name}
              onChange={handleChange}
              placeholder="Emergency Contact Name"
              required
            />
            <input
              id="PersonalDetails_11"
              type="tel"
              name="emergency_contact_mobile"
              value={form.emergency_contact_mobile}
              onChange={handleChange}
              placeholder="Emergency Contact Mobile"
              required
            />
          </div>
        );
      case "professional":
        return (
          <div className="detailsSection">
            <h2>Professional Details</h2>
            <input
              id="ProfDetails_1"
              type="text"
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              placeholder="Role ID"
              required
            />
            <input
              id="ProfDetails_2"
              type="text"
              name="office_phone"
              value={form.office_phone}
              onChange={handleChange}
              placeholder="Office Phone"
              required
            />
            <input
              id="ProfDetails_3"
              type="text"
              name="office_address"
              value={form.office_address}
              onChange={handleChange}
              placeholder="Office Address"
              required
            />
            <input
              id="ProfDetails_4"
              type="text"
              name="reporting_manager"
              value={form.reporting_manager}
              onChange={handleChange}
              placeholder="Reporting Manager"
              required
            />
            <input
              id="ProfDetails_5"
              type="text"
              name="hr_name"
              value={form.hr_name}
              onChange={handleChange}
              placeholder="HR Name"
              required
            />
            <input
              id="ProfDetails_6"
              type="date"
              name="date_of_joining"
              value={form.date_of_joining}
              onChange={handleChange}
              placeholder="Date of Joining"
              required
            />
            <input
              id="ProfDetails_7"
              type="text"
              name="employment_history"
              value={form.employment_history}
              onChange={handleChange}
              placeholder="Employment History"
              required
            />
          </div>
        );
      case "project":
        return (
          <div className="detailsSection">
            <h2>Project Details</h2>
            <input
              id="ProjDetails_1"
              type="text"
              name="client_name"
              value={form.client_name}
              onChange={handleChange}
              placeholder="Client Name"
              required
            />
            <input
              id="ProjDetails_2"
              type="date"
              name="project_start_date"
              value={form.project_start_date}
              onChange={handleChange}
              placeholder="Project Start Date"
              required
            />
            <input
              id="ProjDetails_3"
              type="date"
              name="project_end_date"
              value={form.project_end_date}
              onChange={handleChange}
              placeholder="Project End Date"
              required
            />
            <input
              id="ProjDetails_4"
              type="text"
              name="project_reporting_manager"
              value={form.project_reporting_manager}
              onChange={handleChange}
              placeholder="Project Reporting Manager"
              required
            />
          </div>
        );
      case "finance":
        return (
          <div className="detailsSection">
            <h2>Finance Details</h2>
            <input
              id="FinaDetails_1"
              type="text"
              name="pan_card"
              value={form.pan_card}
              onChange={handleChange}
              placeholder="PAN Card"
              required
            />
            <input
              id="FinaDetails_2"
              type="text"
              name="aadhar"
              value={form.aadhar}
              onChange={handleChange}
              placeholder="Aadhar"
              required
            />
            <input
              id="FinaDetails_3"
              type="text"
              name="bank_name"
              value={form.bank_name}
              onChange={handleChange}
              placeholder="Bank Name"
              required
            />
            <input
              id="FinaDetails_4"
              type="text"
              name="branch_name"
              value={form.branch_name}
              onChange={handleChange}
              placeholder="Branch Name"
              required
            />
            <input
              id="FinaDetails_5"
              type="text"
              name="ifsc"
              value={form.ifsc}
              onChange={handleChange}
              placeholder="IFSC"
              required
            />
            <input
              id="FinaDetails_6"
              type="text"
              name="ctc"
              value={form.ctc}
              onChange={handleChange}
              placeholder="CTC"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={handleAddClick}>Add Employee</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleViewClick}>Employees</button>
      </div>
      {currentSection && (
        <form>
          {renderFormSection()}
          {error && <p className="error">{error}</p>}
          {!isUpdate && currentSection !== "viewEmpList" && (
            <>
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
              &nbsp;&nbsp;&nbsp;
            </>
          )}
          {currentSection !== "viewEmpList" && (
            <button type="button" onClick={saveAndMoveToNextSection}>
              {isUpdate ? "Update" : "Save"}
            </button>
          )}
        </form>
      )}
      {currentSection === "viewEmpList" && (
        <div className="employee-list">
          <h2>Employee List</h2>
          <input
            type="text"
            placeholder="Search employees"
            value={searchQuery}
            onChange={handleSearch}
          />
          <table>
            <thead>
              <tr>
                <th>Employment Code</th>
                <th>Full Name</th>
                <th>Company Mail</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employment_code}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.company_mail}</td>
                  <td>{employee.mobile}</td>
                  <td>
                    <button onClick={() => handleEdit(employee.id)}>
                      Edit
                    </button>&nbsp;
                    <button onClick={() => handleDelete(employee.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
