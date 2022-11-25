import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useAddContactMutation,
  useSingleContactQuery,
  useUpdateContactMutation,
} from '../services/contactAPI'

import './AddEdit.css'

const initialState = {
  name: '',
  email: '',
  contact: '',
}

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState)
  const { name, email, contact } = formValue
  const [editMode, setEditMode] = useState(false)
  const [addContact] = useAddContactMutation()
  const { id } = useParams()
  const { data, isError } = useSingleContactQuery(id!)
  const [updateContact] = useUpdateContactMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setEditMode(true)
      if (data) {
        setFormValue({ ...data })
      } else {
        setEditMode(false)
        setFormValue(initialState)
      }
    }
  }, [id, data])

  useEffect(() => {
    if (isError && id) {
      toast.error('Somethign went wrong')
    }
  }, [id, isError])

  const handleInputChange = (e: any) => {
    let { name, value } = e.target
    console.log({ [name]: value })
    setFormValue({ ...formValue, [name]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!name && !email && !contact) {
      toast.error('please add a value')
    } else {
      if (!editMode) {
        await addContact(formValue)
        navigate('/')
        toast.success('Contact added successfully')
      } else {
        console.log(formValue)
        await updateContact(formValue)
        navigate('/')
        setEditMode(false)
        toast.success('Contact updated successfully')
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        className=""
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={contact}
          onChange={handleInputChange}
        />
        <button type="submit">{editMode ? 'Updated' : 'Add'}</button>
      </form>
    </div>
  )
}

export default AddEdit
