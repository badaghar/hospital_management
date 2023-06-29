import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
// import { QUERY } from 'src/components/Ipd/IpdsCell'
import { QUERY } from 'src/components/Ipd/IpdCell'

const CREATE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation CreateIpdOperationPaymentMutation(
    $input: [CreateIpdOperationPaymentInput]!
  ) {
    createIpdOperationPayment(input: $input) {
      id
    }
  }
`

const IpdOperation = ({ ipd, users, operations }) => {
  const [operationChargesArray, setoperationChargesArray] = useState([])
  const [createIpdOperationPayment, { loading, error }] = useMutation(
    CREATE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment Added')
        navigate(routes.ipd({id:ipd.id}))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY,  variables: {
        id: ipd.id,
      }, }],
      awaitRefetchQueries: true,
    }
  )
  const onSave = () => {
    console.log(operationChargesArray)
    const hasEmptyValue = operationChargesArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '' || !value);
    });
    if(hasEmptyValue)
    {
      toast.error('Enter All The Details')
      return
    }
    createIpdOperationPayment({ variables: { input: operationChargesArray } })
  }

  const addOperationCharge = () => {
    setoperationChargesArray((item) => [...item, { operation_name: '', amount: 0, ipdId: ipd.id }])
  }

  const deleteLabCharges = (index) => {
    setoperationChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }
  return (
    <div className="m-3 p-3">
      <div className="shadow-md rounded-md">

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Operation Type</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdOperationPayment.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.operation_name}</div>
                    <div className="flex col-span-1 justify-center">{item.amount}</div>
                    <div className="flex col-span-1 justify-center">No Action</div>

                  </>
                )
              })
            }
            {
              operationChargesArray.map((item, index) => {
                return (
                  <>
                    <OperationChargeBody key={index} operations={operations} item={item}
                      operationChargesArray={operationChargesArray}
                      setoperationChargesArray={setoperationChargesArray}
                      del={deleteLabCharges}
                      index={index}
                    />
                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOperationCharge}>Add Operation Charge</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={onSave}>Save Changes</div>
        </div>

      </div>
    </div>
  )
}

const OperationChargeBody = ({ operations, item, operationChargesArray, del, setoperationChargesArray, index }) => {

  // const [labchargeType, setlabChargeType] = useState()
  const [obj, setObj] = useState([])
  const [amount, setAmount] = useState(0)



  const operationChargeTypeChange = (item) => {


    setoperationChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        operation_name: item?.name || '',

      };
      return newArray;
    });
  }

  useEffect(()=>{
    setoperationChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        amount: parseInt(amount),

      };
      return newArray;
    });

  },[amount])







  useEffect(() => {

    // if (item.charge_type) {
    //   setlabChargeType({ value: item.name, label: item.name })
    // }
    // setAmount(item.amount)

    const obj = operations.map((char) => {
      const ob = { value: char.name, label: char.name,name:char.name }
      return ob
    })
    setObj(obj)
    console.log(item)
  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={operationChargeTypeChange}

        // value={item.name !== '' ? labchargeType : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="number" onChange={(e)=>setAmount(e.target.value)} value={amount} />
      </div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )
}

export default IpdOperation

