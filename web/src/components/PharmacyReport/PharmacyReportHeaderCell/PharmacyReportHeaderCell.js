import { Form, Label } from "@redwoodjs/forms"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"

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

export const Success = ({ distributers,changeId,text,id }) => {
  const [options,setOptions] = useState([])
  useEffect(() => {
    if(id==1)
    {
      setOptions(distributers)
    }
    else if(id==2)
    {
        setOptions([])
    }
  },[id])
  // const [data, setDatas] = useState(0)

  const modifyData = (name) => {
    if (name.length === 0) {
      changeId(0)
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    // setDatas(name[0].id)
    changeId(name[0].id)
  }
  return (
    <>


        <div className="">


            <Multiselect

              options={options} // Options to display in the dropdown
              // selectedValues={props?.defaultDistributer}
              onSelect={(event) => modifyData(event)} // Function will trigger on select event
              onRemove={(event) => modifyData(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
              placeholder={text}
              showArrow
              // closeOnSelect={true}
              closeOnSelect={true}

            />

        </div>

    </>
  )
}
