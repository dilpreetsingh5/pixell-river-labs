import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateEmployeeInput } from '../../../../shared/types/Employees';
import { employeeService, type CreateEmployeeResult } from '../services/employeeService';

export function useDepartmentsQuery() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: employeeService.getDepartments,
  });
}

export function useEmployeesQuery() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getEmployees,
  });
}

export function useCreateEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: { input: CreateEmployeeInput; token: string }): Promise<CreateEmployeeResult> =>
      employeeService.createEmployee(vars.input, vars.token),
    onSuccess: async result => {
      if (!result.success) return;
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['employees'] }),
        queryClient.invalidateQueries({ queryKey: ['departments'] }),
      ]);
    },
  });
}
