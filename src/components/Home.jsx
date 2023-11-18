import { useState, useEffect } from 'react'
import OrderBy from './OrderBy'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import supabase from '../config/SupabaseClient.js'

function Home(props) {
  const [fetchError, setFetchError] = useState(null)
  const [count, setCount] = useState(0)
  const [table, setTable] = useState(null)
  const [sort, setSort] = useState("")
  const [upvotes, setUpvote] = useState(100)
  useEffect(() => {
    const fetchTable = async () => {
      let resolvedResponse;
      if (!sort) {
        resolvedResponse = await supabase
          .from("PostsMade")
          .select()
      } else {
        resolvedResponse = await supabase
          .from('PostsMade')
          .select()
          .order(sort, { ascending: true })
      }

      if (resolvedResponse.error) {
        setFetchError("Could not fech from table")
        setTable(null)
        console.log(resolvedResponse.error)
      }

      if (resolvedResponse.data) {
        setFetchError(null)
        setTable(resolvedResponse.data)
      }

    }

    fetchTable()
  }, [sort])

  const handleOrder = (e) => {
    const currentState = e;
    setSort(currentState)


  }

  return (
    <div className='Home'>
      <OrderBy handleOrder={handleOrder}></OrderBy>
      {fetchError && (<p>{fetchError}</p>)}
      {(table && !props.search) ? table &&
        table.map(
          card => (<Link to={"/PostPage/" + card.id} key={card.id} ><Cards table={card} key={card.id} keys={card.id}></Cards></Link>)) :

        (table &&
          table.filter(curr => curr.title == props.search)
            .map(
              card => (<Link to={"/PostPage/" + card.id} key={card.id} ><Cards table={card} key={card.id} keys={card.id}></Cards></Link>)))
      }

    </div>
  )
}

export default Home