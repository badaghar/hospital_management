import { Form, Label } from "@redwoodjs/forms"
import { useLocation } from "@redwoodjs/router"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import { useLayoutEffect } from "react-js-dialog-box"

export const QUERY = gql`
  query FindPharmacyReportHeaderQuery {
    distributers{
      id
      name
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ distributers,changeId,text,id,SetComponentRender }) => {
  const [options,setOptions] = useState([])
  const location = useLocation();
  useEffect(() => {
    // Cleanup the timeout when the component unmounts

    if(id==1)
    {
      setOptions(distributers)
    }
    else if(id==4)
    {
      setOptions([{id:1,name:'Complete Payments'},{id:2,name:'Pending Payments'}])
    }
    else
    {
        setOptions([])
    }
    // return () => setOptions([]);
  },[id])
  // const [data, setDatas] = useState(0)

  const modifyData = (name) => {
    if (name.length === 0) {
      changeId(0)
      SetComponentRender(0)
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    // setDatas(name[0].id)
    changeId(name[0].id)
  }
  return (
    <>


        <div className="text-gray-950">


            <Multiselect

              options={options} // Options to display in the dropdown
              // selectedValues={props?.defaultDistributer}
              onSelect={(event) => modifyData(event)} // Function will trigger on select event
              onRemove={(event) => modifyData(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
              placeholder={text}
              showArrow
              // selectedValues={[]}

              // closeOnSelectSingle={true}

            />

        </div>

    </>
  )
}
