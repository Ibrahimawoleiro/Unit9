import { useState,useEffect } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import supabase from '../config/SupabaseClient.js'
function UpdatePost(props) {
    const {id} = useParams()
    const Navigate=useNavigate()
    const [formError,setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!props.title || !props.content || !props.image) {
            setFormError("Please fill in the form correctly")
            return
        }

        const { data, error } = await supabase
            .from("PostsMade")
            .update([{ title: props.title, content: props.content, image_URL:props.image }])
            .eq("id", id)
            .select()

        if (error) {
            setFormError("Please Fill in all the fields correctly")
        }

        if (data) {
            setFormError(null)
            Navigate("/")
        }

    }

    const setChar = (e) =>{
        setCharacter(e.target.value)
    }

    useEffect(()=>{
        const fetchTable = async ()=>
        {
          const {data, error} = await supabase
            .from("PostsMade")
            .select()
            .eq("id",id)
            .single()
    
            if(error){
              Navigate("/",{replace: true})
            }
        
            if(data){
              props.setTitle(data.title)
              props.setContent(data.content)
              props.setImage(data.Image_URL)
              
            }
              
        }
    
        fetchTable()
      },[id,Navigate])

    return (
        <div className='UpdatePost' >
            <form action="" className='form' onSubmit={handleSubmit}>
                <input type="text" value={props.title} name="Title" placeholder='Title' id="" className='write' onChange={(e) => props.setTitle(e.target.value)} />
                <textarea name="Content" value={props.content} placeholder='Content(Optional)' id="" cols="30" rows="10" onChange={(e) => props.setContent(e.target.value)}></textarea>
                <input type="text" value={props.image} placeholder='Image URL (Optional)' id="" name='Url' className='write' onChange={(e) => props.setImage(e.target.value)} />

                <input type="Submit" value="Update Post" readOnly />
            </form>
            {formError && <p className='error'>{formError}</p>}
        </div>
    )
}

export default UpdatePost