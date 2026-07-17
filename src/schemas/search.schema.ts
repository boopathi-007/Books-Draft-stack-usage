import z from "zod";

const SearchSchema = z.object({
  q: z.string().default(""),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;

export default SearchSchema;
