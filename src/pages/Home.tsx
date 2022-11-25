import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  useContactsQuery,
  useDeleteContactMutation,
} from '../services/contactAPI'
import { Contact } from '../model/contact.model'
import { toast } from 'react-toastify'
import './Home.css'

const Home = () => {
  const { data, isLoading, isError } = useContactsQuery()
  const [deleteContact] = useDeleteContactMutation()

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong')
    }
  }, [isError])

  const handleDelete = async (id: any) => {
    await deleteContact(id)
    toast.success('Successfully remote one item')
  }

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <Link to="/addContact">
        <button>Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Contact</td>
            <td>Action</td>
          </tr>
        </thead>

        {data?.length && (
          <tbody>
            {data?.map((item: Contact) => {
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
              )
            })}
          </tbody>
        )}
      </table>
    </>
  )
}

export default Home
