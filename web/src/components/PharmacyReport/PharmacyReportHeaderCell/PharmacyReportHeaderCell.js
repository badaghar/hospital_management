import { Form, Label } from "@redwoodjs/forms"
import { useLocation } from "@redwoodjs/router"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import { useLayoutEffect } from "react-js-dialog-box"
import React from 'react'
import Select from 'react-select'

export const QUERY = gql`
  query FindPharmacyReportHeaderQuery {
    distributers{
      id
      name
    }
    manufacturers{
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

export const Success = ({ distributers, changeId, text, id, SetComponentRender, manufacturers,users }) => {
  console.log(users)
  const [options, setOptions] = useState([])
  const location = useLocation();
  useEffect(() => {
    // Cleanup the timeout when the component unmounts

    if (id == 1) {
      const obj = distributers.map((item)=>{
        return {id:item.id,name:item.name,value:item.id,label:item.name}
      })
      setOptions(obj)
    }
    else if (id == 4) {
      setOptions([{ id: 1, name: 'Complete Payments',label:'Complete Payments',value:1 }, { id: 2, name: 'Pending Payments',label:'Pending Payments',value:2 }])

    }
    else if (id == 12) {
      // setOptions(manufacturers)
      const obj = manufacturers.map((item)=>{
        return {id:item.id,name:item.name,value:item.id,label:item.name}
      })
      setOptions(obj)
    }
    else if (id == 32) {
      // setOptions(manufacturers)
      const obj = users.map((item)=>{
        return {id:item.id,name:item.name,value:item.id,label:item.name}
      })
      setOptions(obj)
    }
    else {
      setOptions([])
    }
    // return () => setOptions([]);
  }, [id])
  // const [data, setDatas] = useState(0)

  const modifyData = (name) => {
    if (name.length==0) {
      changeId(0)
      SetComponentRender(0)
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    // setDatas(name[0].id)
    changeId(name.id)
  }
  return (
    <>


      <div className="text-gray-950">


        {/* <Multiselect

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

            /> */}
        <Select options={options} onChange={modifyData} isClearable={true}

        />

      </div>

    </>
  )
}
