import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactAPI";
import { Contact } from "../model/contact.model";
import { toast } from "react-toastify";
import "./Home.css";

const useDebounce = (value: any, delay: any = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const {
    data: allContacts = [],
    isLoading,
    isError,
  } = useContactsQuery({ page, debouncedSearchQuery });
  const [contacts, setContacts] = useState<any>([]);
  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
    setContacts(allContacts);
  }, [isError, allContacts]);

  const handleDelete = async (id: any) => {
    await deleteContact(id);
    toast.success("Successfully remote one item");
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }
  //console.log(searchResult);
  const handleLoadMore = () => {
    setPage(page + 1);
    //TODO check total count and disable load more button.
    setContacts((contacts: any) => [...contacts, ...(allContacts as [])]);
  };

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <>
      <Link to="/addContact">
        <button>Add Contact</button>
      </Link>
      <form>
        <label>Search contacts:</label>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search contacts.."
        />
      </form>
      <table className="styled-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Contact</td>
            <td>Action</td>
          </tr>
        </thead>
        {contacts?.length ? (
          <tbody>
            {contacts?.map((item: Contact) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/editContact/${item.id}`}>
                      <button type="button" className="btn btn-edit">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      type="button"
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                    <Link to={`info/${item.id}`}>
                      <button type="button" className="btn btn-view">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </table>
      <button type="button" onClick={handleLoadMore}>
        Load more...
      </button>
    </>
  );
};

export default Home;
