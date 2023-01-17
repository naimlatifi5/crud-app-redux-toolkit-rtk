import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Contact } from "../model/contact.model";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:6001`,
  prepareHeaders: (headers) => {
    console.log(headers);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const contactsAPI = createApi({
  reducerPath: "contactsAPi",
  baseQuery,
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // query for get whereas for PUT and POST and Delte use mutation
    contacts: builder.query<any, any>({
      query: (args) => {
        const { page, debouncedSearchQuery } = args;
        return {
          url: `/contacts?q=${debouncedSearchQuery}&_page=${page}&_limit=${2}`,
        };
      },
      providesTags: ["Contact"],
    }),
    searchContacts: builder.query<Contact, string>({
      query: (searchQuery) => `contacts?q=${searchQuery}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation<{}, Contact>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    singleContact: builder.query<Contact, string>({
      query: (id) => `contacts/${id}`,
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useContactsQuery,
  useSingleContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useSearchContactsQuery,
} = contactsAPI;
