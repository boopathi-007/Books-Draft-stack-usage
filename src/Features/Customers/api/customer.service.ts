import api from "#/api/client";
import ApiRoutes from "#/api/endpoint";

import {
  CustomerDetailSchema,
  type CustomerFormType,
  type CustomersDetailSchemaType,
  CustomersSchema,
} from "../schemas/customer.schema";

import type { ICustomerParams } from "./customer.keys";

const { GET_CUSTOMER_DETAILS, GET_CUSTOMER_BY_ID } = ApiRoutes;

const CustomerServices = {
  async getCustomers(params: ICustomerParams) {
    try {
      const response = await api.get(GET_CUSTOMER_DETAILS, {
        params,
      });

      const data = CustomersSchema.parse(response.data);

      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async getCustomerById(id: string) {
    console.log(id, "id");

    const response = await api.get(GET_CUSTOMER_BY_ID.replace("{id}", id));

    return CustomerDetailSchema.parse(response.data);
  },

  async createCustomer(data: CustomerFormType) {
    const response = await api.post(GET_CUSTOMER_DETAILS, data);

    return CustomerDetailSchema.parse(response.data);
  },

  async updateCustomer({ id, data }: { id: string; data: CustomerFormType }) {
    const response = await api.put(
      GET_CUSTOMER_BY_ID.replace("{id}", id),
      data,
    );

    return CustomerDetailSchema.parse(response.data);
  },

  async deleteCustomer(id: string) {
    await api.delete(GET_CUSTOMER_BY_ID.replace("{id}", id));
  },
};

export default CustomerServices;
