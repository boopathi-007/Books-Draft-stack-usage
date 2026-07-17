import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "#/lib/queryClient";
import { customerKeys, type ICustomerParams } from "../api/customer.keys";
import CustomerServices from "../api/customer.service";

import type {
  CustomerFormType,
  CustomersDetailSchemaType,
} from "../schemas/customer.schema";

const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = CustomerServices;

const { list, detail, lists } = customerKeys;

const useGetCustomers = (params: ICustomerParams) =>
  useQuery({
    queryKey: list(params),
    queryFn: () => getCustomers(params),
  });

const useGetCustomerById = (id: string) =>
  useQuery({
    queryKey: detail(id),
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });

const useCreateCustomer = () =>
  useMutation({
    mutationFn: createCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: lists(),
      });
    },
  });

const useUpdateCustomer = () =>
  useMutation({
    mutationFn: updateCustomer,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: lists(),
      });
    },
  });

const useDeleteCustomer = () =>
  useMutation({
    mutationFn: deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: lists(),
      });
    },
  });

export {
  useGetCustomers,
  useGetCustomerById,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
};
