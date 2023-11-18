import { useState,useEffect } from 'react'
import supabase from '../config/SupabaseClient.js'

function OrderBy(props) {
  const [count, setCount] = useState(0)

  return (
    <div className='OrderBy' >
      <h4 style={{margin:"0 20px"}}>Order By: </h4>
      <button onClick={()=>props.handleOrder("created_at")}>created_at</button>
      <button onClick={()=>props.handleOrder("Upvotes")}>Upvotes</button>
    </div>
  )
}

export default OrderBy