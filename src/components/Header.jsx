import { useState,useEffect } from 'react'
import SearchBar from './SearchBar'
import {  Link } from 'react-router-dom'
import supabase from '../config/SupabaseClient.js'
function Header(props) {
  const [count, setCount] = useState(0)

  return (
    <div className='Header'>
      <Link to="/"><h1>MarvelHub</h1></Link>
      <SearchBar search={props.search} setSearch={props.setSearch}></SearchBar>
      <div className='rightOfHeader'>
        <Link to="/"><h3>Home</h3></Link><br />
        <Link to="/CreatePost"><h3>Create New Post</h3></Link><br />
      </div>
    </div>
  )
}

export default Header
