import { useLayoutEffect } from 'react'
import NewIpd from 'src/components/Ipd/NewIpd'
import NewIpdCell from 'src/components/Ipd/NewIpdCell'

const NewIpdPage = ({type,id}) => {

  return <NewIpdCell type={type} id={id} />
}

export default NewIpdPage
