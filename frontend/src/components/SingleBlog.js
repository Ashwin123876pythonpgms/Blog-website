import { useEffect, useState } from 'react';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useParams } from 'react-router';
import axios from 'axios'


const SingleBlog = ({ workout }) => {
    const {id} = useParams()
    console.log(id);

    const [blog, setBlog] = useState();

    const fetchBlog = async() => {
        try {
            const response = await axios.get(`/api/blogs/${id}`);
            // Assuming the response contains the blog data
            setBlog(response.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    }

    useEffect(()=> {
        fetchBlog()
    },[id]);

    useEffect(()=>{
        console.log(blog);
    },[blog])

  return (
    <>
      {blog && (
      <div className="workout-details">
        <h4>{blog.title}</h4>
        <p>{blog.body}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <p>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
        </div>
      </div>
    )} 
    </>
  )
}

export default SingleBlog