import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateRoleInput } from '../../../../shared/types/Role';
import { organizationService, type CreateRoleResult } from '../services/organizationService';

export function useRolesQuery() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: organizationService.getRoles,
  });
}

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: { input: CreateRoleInput; token: string }): Promise<CreateRoleResult> =>
      organizationService.createRole(vars.input, vars.token),
    onSuccess: async result => {
      if (!result.success) return;
      await queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}
