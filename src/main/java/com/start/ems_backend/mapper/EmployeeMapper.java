package com.start.ems_backend.mapper;

import com.start.ems_backend.dto.EmployeeDTO;
import com.start.ems_backend.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDTO mapToEmployeeDTO(Employee employee) {
        return EmployeeDTO.builder().id(employee.getId()).firstName(employee.getFirstName()).lastName(employee.getLastName()).email(employee.getEmail()).build();
    }

    public static Employee mapToEmployee(EmployeeDTO employeeDTO) {
        return Employee.builder().id(employeeDTO.getId()).firstName(employeeDTO.getFirstName()).lastName(employeeDTO.getLastName()).email(employeeDTO.getEmail()).build();
    }
}
