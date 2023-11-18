import { useState,useEffect } from 'react'
import CreatePost from './CreatePost'
import Home from './Home'
import UpdatePost from './UpdatePost'
import PostPage from './PostPage'
import { Route, Routes } from 'react-router-dom'
import supabase from '../config/SupabaseClient.js'

function Body(props) {
  const [createPostTitle, setCreatePostTitle] = useState("");
  const [createPostContent, setCreatePostContent] = useState("");
  const [createPostImage, setCreatePostImage] = useState("");

  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState("");
  const [updatePostImage, setUpdatePostImage] = useState("");

  return (
    <div className='body'>
      <Routes>
        <Route path='/' element={<Home search={props.search} />}></Route>
        <Route
          path='/CreatePost'
          element={
            <CreatePost
              title={createPostTitle}
              content={createPostContent}
              image={createPostImage}
              setTitle={setCreatePostTitle}
              setContent={setCreatePostContent}
              setImage={setCreatePostImage}
            />
          }
        ></Route>
        <Route
          path='/UpdatePost/:id'
          element={
            <UpdatePost
              title={updatePostTitle}
              content={updatePostContent}
              image={updatePostImage}
              setTitle={setUpdatePostTitle}
              setContent={setUpdatePostContent}
              setImage={setUpdatePostImage}
            />
          }
        ></Route>
        <Route path='/PostPage/:id' element={<PostPage />}></Route>
      </Routes>
    </div>
  );
}


export default Body