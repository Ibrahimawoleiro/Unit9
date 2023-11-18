import { useState,useEffect } from 'react'
import supabase from '../config/SupabaseClient.js'
import timeAgo from '../Functions/TimeAgo.js'
function Cards(props) {
  const [count, setCount] = useState(0)

  return (
    <div className='cards' id={props.keys}>
      <p>Posted {timeAgo(new Date(props.table.created_at))}</p>
      <h3>{props.table.title}</h3>
      <p>{props.table.Upvotes} upvotes</p>
    </div>
  )
}

export default Cards