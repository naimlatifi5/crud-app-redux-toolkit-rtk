import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSingleContactQuery } from '../services/contactAPI'

import './Info.css'

const Info = () => {
  const { id } = useParams()
  const { data, isError } = useSingleContactQuery(id!)

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong')
    }
  }, [isError])

  console.log(useSingleContactQuery(id!))

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <p>User details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <br />
          <strong>Name:</strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{data && data.contact}</span>
          <br />
          <br />
          <br />
          <strong>Email:</strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit" type="button">
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Info
