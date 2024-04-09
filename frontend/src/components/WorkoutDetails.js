import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useState } from 'react';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import { Link } from 'react-router-dom';


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const [editing, setEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({
    title: workout.title,
    body: workout.body,
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleClick = async () => {
    const response = await fetch('/api/blogs/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const handleEditClick = () => {
    // Handle edit functionality here
    console.log('edit');
    setEditing(true);
    toggle();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout({
      ...editedWorkout,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    // You need to implement your API call to update the workout here
    // For simplicity, let's assume a mock function
    const response = await fetch(`/api/blogs/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedWorkout),
    });
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_WORKOUT', payload: json})
    }
    setEditing(false);
    toggle(); // Close the modal after submitting
  }

  const handleCancel = () => {
    setEditing(false);
    // Reset editedWorkout state to the original workout values
    setEditedWorkout({
      title: workout.title,
      body: workout.body,
    });
    toggle(); // Close the modal after canceling
  }

  return (
    <>
      <div className="workout-details" onClick={() => {console.log("Onclick")}}>
        <h4>{workout.title}</h4>
        {
          workout.body.length > 300 ? (
            <p>{workout.body.substring(0, 300)}...</p>
          ) : (<p>{workout.body}</p>)
        }
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <Link to={`blog/${workout._id}`}><button>Read More</button></Link>
        </div>
        <div>
          <span className="material-symbols-outlined edit" onClick={handleEditClick}>edit</span>
          <span className="material-symbols-outlined delete" onClick={handleClick}>delete</span>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Blog Post</ModalHeader>
        <ModalBody>
          <form>
            <label>Blog Title:</label>
            <input 
              type="text" 
              name="title"
              value={editedWorkout.title}
              onChange={handleChange}
            />
            <label>Blog Content:</label>
            <Input 
              type="textarea" 
              name="body"
              value={editedWorkout.body}
              onChange={handleChange}
              style={{height:'400px'}}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button color="primary" onClick={handleSubmit}>Save</button>
          <button color="secondary" onClick={handleCancel}>Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default WorkoutDetails