import { useEffect, useState ,useLayoutEffect} from 'react'
// import { useLayoutEffect } from 'react-js-dialog-box'
import IpdsCell from 'src/components/Ipd/IpdsCell'

const IpdsPage = ({type}) => {
  // const [tp,setTp] = useState()
  const [load,setLoad] = useState(false)
  useLayoutEffect(()=>{
    setLoad(false)
    const timeoutId = setTimeout(() => {
      setLoad(true)
    }, 10);

    // Cleanup the timeout when the component unmounts
    console.log(type)
    return () => clearTimeout(timeoutId);

  },[type])
  return (


    load && <IpdsCell type={type} />

   )
}

export default IpdsPage
