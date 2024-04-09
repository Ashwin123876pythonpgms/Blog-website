import { Link } from 'react-router-dom'

import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


const Navbar = () => {
  const { dispatch } = useWorkoutsContext()

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  // const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const toggle = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, body}
    
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setBody('')
      toggle()
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>CreativeHomeInspire</h1>
        </Link>
        <button onClick={toggle}>Add New Blog</button>
      </div>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add a New Post</ModalHeader>
        <ModalBody>
        <form className="create" onSubmit={handleSubmit}> 
      {/* <h3>Add a New Workout</h3> */}

      <label>Blog Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Blog Description:</label>
      <Input 
        type="textarea" 
        style={{height:'400px', marginBottom: "10px"}}
        onChange={(e) => setBody(e.target.value)} 
        value={body}
        className={emptyFields.includes('body') ? 'error' : ''}
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
        </ModalBody>
      </Modal>

    </header>
  )
}

export default Navbar