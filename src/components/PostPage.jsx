import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/SupabaseClient.js'
import { useParams, useNavigate } from 'react-router-dom'
import timeAgo from '../Functions/TimeAgo.js'
function PostPage(props) {
    const { id } = useParams();
    const [formError, setFormError] = useState(null);
    const [table, setTable] = useState(null);
  
    useEffect(() => {
      const fetchTable = async () => {
        const { data, error } = await supabase
          .from("PostsMade")
          .select()
          .eq("id", id);
  
        if (error) {
          setFormError("Could not fetch from table");
          setTable(null);
          console.log(error);
        }
        if (data) {
          setFormError(null);
          setTable(data);
        }
      };
  
      fetchTable();
    }, [id]); // Include 'id' as a dependency to re-fetch when the 'id' changes.
  
    const handleDelete = async function () {
      const { data, error } = await supabase
        .from("PostsMade")
        .delete()
        .eq("id", id);
  
      if (error) {
        console.log(error);
      }
      // Consider what you want to do after deletion.
    };
  
    const handleUpvotes = async () => {
      if (table && table.length === 1) {
        const post = table[0];
        const updatedUpvotes = post.Upvotes + 1;
  
        // Update UI optimistically
        setTable([{ ...post, Upvotes: updatedUpvotes }]);
  
        // Update in the database
        const { data, error } = await supabase
          .from("PostsMade")
          .update([{ Upvotes: updatedUpvotes }])
          .eq("id", id)
          .select();
  
        if (error) {
          console.log(error);
          setFormError("Error updating upvotes");
        }
  
        // Handle success if needed
        if (data) {
          console.log(data);
          setFormError(null);
        }
      }
    };
    return (
        <div className='PostPage'>
            {table && (table.map(tablee => (
                <section className='postpagemain' key={id}>
                    <p>Posted {timeAgo(new Date(tablee.created_at))}</p>
                    <h3>{tablee.title}</h3>
                    <p>{tablee.content}</p>
                    <div className="postPhoto">
                        <img src={tablee.image_URL} alt="" />
                    </div>
                    <div >
                        <div>
                            <h2 onClick={handleUpvotes}>👍</h2>
                            <h2>{tablee.Upvotes} Upvotes</h2>
                        </div>
                        <div>
                            <Link to={"/UpdatePost/" + id}><h2>✏️</h2></Link><br />

                            <h2 onClick={handleDelete}>🗑</h2>
                        </div>
                    </div>
                    <div id='activities'>
                        <p>-Did you forget about Ben Franklin?</p>
                        <p>-It's got to be George Washington!</p>
                        <input type="text" name="Comment" id="" placeholder='Leave a comment...' />
                    </div>
                </section>)))}
        </div >
    )
}

export default PostPage