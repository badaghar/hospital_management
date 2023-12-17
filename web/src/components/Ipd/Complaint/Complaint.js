import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { useRef } from 'react'
import JoditEditor from 'jodit-react';
import { QUERY } from 'src/components/Ipd/IpdCell'

const UPDATE_COMPLAINTS_MUTATION = gql`
  mutation UpdateComplaintsMutation($id: Int!, $input: UpdateComplaintsInput!) {
    updateComplaints(id: $id, input: $input) {
      id
      note
      created_at
      updated_at
      ipdId
    }
  }
`


const Complaint = ({ipd}) => {

  const editor = useRef(null);
	const [content, setContent] = useState(ipd.Complaints[0].note);

  const [updateComplaints, { loading, error }] = useMutation(
    UPDATE_COMPLAINTS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Complaints updated')
        // navigate(routes.ipd({ id: ipd.id }))
      },
      onError: (error) => {
        toast.success('Complaints updated')
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = () => {
    if(content=='')
    {
      toast.error("Fill The Details")
      return
    }
    let id = ipd.Complaints[0].id
    let input = {
      note: content
    }
    // console.log(typeof parseInt(id))
    updateComplaints({ variables: { id , input } })
  }
  return (
    <div className='p-3'>
      	<JoditEditor
			ref={editor}
			value={content}

			onChange={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons

		/>

<div className='flex justify-center mt-2'>

    <button className='rw-button rw-button-blue' onClick={onSave} >Save Complaint</button>
</div>



    </div>
  )
}

export default Complaint
