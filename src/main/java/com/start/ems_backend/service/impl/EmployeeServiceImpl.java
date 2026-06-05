package com.start.ems_backend.service.impl;

import com.start.ems_backend.dto.EmployeeDTO;
import com.start.ems_backend.entity.Employee;
import com.start.ems_backend.exception.ResourceNotFoundException;
import com.start.ems_backend.mapper.EmployeeMapper;
import com.start.ems_backend.repository.EmployeeRepository;
import com.start.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
        Employee saved = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(saved);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        // An empty list is a valid result, not an error
        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long empId, EmployeeDTO updatedEmployee) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + empId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee saved = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(saved);
    }

    @Override
    public void deleteEmployee(Long empId) {
        // Verify existence before deleting
        if (!employeeRepository.existsById(empId)) {
            throw new ResourceNotFoundException("Employee not found with id: " + empId);
        }
        employeeRepository.deleteById(empId);
    }
}
