import { Form, Label } from "@redwoodjs/forms"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import React from 'react'
import Select from 'react-select'
export const QUERY = gql`
  query FindPharmacyPaymentHeaderQuery {
    paymentPurchaseMedicines{
      id
      purchaseMedicine{
        invoiceNo
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ paymentPurchaseMedicines,changeId }) => {
  const [options,setOptions] = useState([])

  // const [data, setDatas] = useState(0)

  useState(()=>{
    const convertedArray = paymentPurchaseMedicines.map(({ id, purchaseMedicine }) => ({
      id,
      invoiceNo: purchaseMedicine.invoiceNo,
      label:purchaseMedicine.invoiceNo,
      value:purchaseMedicine.id
    }));
    setOptions(convertedArray)
  },[])

  const modifyData = (name) => {
    if (name.length === 0) {
      changeId(0)
      return
    }
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
              displayValue="invoiceNo" // Property name to display in the dropdown options
              placeholder={"Enter The Invoice No"}
              showArrow
              // closeOnSelect={true}
              closeOnSelect={true}

            /> */}
                    <Select options={options} onChange={modifyData} isClearable={true}

/>

        </div>

    </>
  )
}
