export interface ICustomerParams {
  page: number;
  limit: number;
  q: string;
  sort: string;
}

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,

  list: (params: ICustomerParams) => [...customerKeys.lists(), params] as const,

  details: () => [...customerKeys.all, "detail"] as const,

  detail: (id: string) => [...customerKeys.details(), id] as const,
};
