package com.start.ems_backend.service;

import com.start.ems_backend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO getEmployeeById(Long employeeId);
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO updateEmployee(Long empId,EmployeeDTO updatedEmployee);
    void deleteEmployee(Long empId);
}
