import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employment_code: '458969',
      full_name: 'Rohit',
      date_of_birth: '2003-11-06',
      gender: 'Male',
      age: 21,
      current_address: 'Hyd,city',
      permanent_address: 'Hyd,town',
      mobile: '1234567890',
      personal_mail: 'rohit.xyz@example.com',
      company_mail: 'rohit.xyz@company.com',
      emergency_contact_name: 'ramu',
      emergency_contact_mobile: '0987654321',
      role_id: 1,
      office_phone: '9876543210',
      office_address: '789 Office St',
      reporting_manager: 'hari',
      hr_name: 'priya',
      date_of_joining: '2020-01-01',
      employment_history: 'Associate developer',
      client_name: 'hari',
      project_start_date: '2021-01-01',
      project_end_date: '2021-12-31',
      project_reporting_manager: 'hari',
      pan_card: 'WECD5896',
      aadhar: '123456789012',
      bank_name: 'Bank of sbi',
      branch_name: 'Gachibowli',
      ifsc: 'CBA1234567',
      ctc: '1000000'
    }
  ]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};