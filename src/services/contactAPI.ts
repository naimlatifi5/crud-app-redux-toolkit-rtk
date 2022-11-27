import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Contact } from "../model/contact.model";
const baseQuery = fetchBaseQuery({
  // A small wrapper around fetch that aims to simplify requests.
  baseUrl: `http://localhost:6001`,
  prepareHeaders: (headers) => {
    console.log(headers);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

//Entry points from RTK query
export const contactsAPI = createApi({
  // Core of RTK query
  reducerPath: "contactsAPI",
  baseQuery, // is used to
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // query for get whereas for PUT and POST and Delete use mutation
    contacts: builder.query<Contact[], void>({
      query: () => ({
        url: "/contacts",
      }),
      providesTags: ["Contact"],
    }),
    // Example with pagination here
    // contacts: builder.query<Contact[], number>({
    //   query: (page = 1) => ({
    //     url: `/contacts?_page${page}&_limit=3`,
    //   }),
    //   providesTags: ["Contact"],
    // }),
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

// exported hooks to be used in functional components
export const {
  useContactsQuery,
  useSingleContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsAPI;
