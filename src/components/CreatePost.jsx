import { useState } from 'react';
import supabase from '../config/SupabaseClient.js';

function CreatePost(props) {
  const [formError, setFormError] = useState(null);
  const [Upvote, setUpvote] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!props.title || !props.content || !props.image) {
      setFormError("Please fill in the form correctly");
      return;
    }

    const { data, error } = await supabase
      .from('PostsMade')
      .insert([{ title: props.title, content: props.content, image_URL: props.image, Upvotes: Upvote }]);

    if (error) {
      console.log(error);
      setFormError("Please Fill in all the fields correctly");
    }

    if (data) {
      console.log(data);
      setFormError(null);

      // Reset form fields after successful submission
      props.setTitle('');
      props.setContent('');
      props.setImage('');
    }

    console.log(props.title, props.content, props.image);
  };

  return (
    <div className='CreatePost'>
      <form action='' className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={props.title}
          name='Title'
          placeholder='Title'
          id=''
          className='write'
          onChange={(e) => props.setTitle(e.target.value)}
        />
        <textarea
          name='Content'
          value={props.content}
          placeholder='Content(Optional)'
          id=''
          cols='30'
          rows='10'
          onChange={(e) => props.setContent(e.target.value)}
        ></textarea>
        <input
          type='text'
          value={props.image}
          placeholder='Image URL (Optional)'
          name='Url'
          className='write'
          onChange={(e) => props.setImage(e.target.value)}
        />
        <input type='Submit' value='Create Post' readOnly />
      </form>
    </div>
  );
}

export default CreatePost;
