import { useLayoutEffect } from 'react'
import NewIpd from 'src/components/Ipd/NewIpd'
import NewIpdCell from 'src/components/Ipd/NewIpdCell'

const NewIpdPage = ({type}) => {

  return <NewIpdCell type={type} />
}

export default NewIpdPage
