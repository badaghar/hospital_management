import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
// import { QUERY } from 'src/components/Ipd/IpdsCell'
import { QUERY } from 'src/components/Ipd/IpdCell'
import {FiEdit} from 'react-icons/fi'

const CREATE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation CreateIpdOperationPaymentMutation(
    $input: [CreateIpdOperationPaymentInput]!
  ) {
    createIpdOperationPayment(input: $input) {
      id
    }
  }
`

const DELETE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation DeleteIpdOperationPaymentMutation($id: Int!) {
    deleteIpdOperationPayment(id: $id) {
      id
    }
  }
`
const UPDATE_IPD_OPERATION_PAYMENT_MUTATION = gql`
  mutation UpdateIpdOperationPaymentMutation(
    $id: Int!
    $input: UpdateIpdOperationPaymentInput!
  ) {
    updateIpdOperationPayment(id: $id, input: $input) {
      id
      operation_name
      amount
      created_at
      updated_at
      ipdId
    }
  }
`

const IpdOperation = ({ ipd, users, operations }) => {
  console.log(operations)
  const [operationChargesArray, setoperationChargesArray] = useState([])

  // useEffect
  // useEffect(()=>{
  //     const data = ipd.IpdOperationPayment.map((item, index) => {
  //       return { operation_name: item.operation_name, amount: item.amount, ipdId: ipd.id,extra:{} }
  //      })
  //      setoperationChargesArray(data)
  // },[ipd])

  const [deleteIpdOperationPayment] = useMutation(
    DELETE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment deleted')
        // navigate(routes.ipdOperationPayments())
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

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdOperationPayment ' + id + '?')
    ) {
      deleteIpdOperationPayment({ variables: { id } })
    }
  }

  const [createIpdOperationPayment, { loading, error }] = useMutation(
    CREATE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment Added')
        setoperationChargesArray([])
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

  const [updateIpdOperationPayment, { loading2, error2 }] = useMutation(
    UPDATE_IPD_OPERATION_PAYMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdOperationPayment updated')
        setoperationChargesArray([])
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


  const [editId,setEditId] = useState(0)
  const [editAmount,setEditAmount] = useState(0)
  const onEditClick = (id,amt) => {
    setEditId(id)
    setEditAmount(amt)

  }

  const addOperationCharge = () => {
    setoperationChargesArray((item) => [...item, { operation_name: '', amount: 0, ipdId: ipd.id,extra:{} }])
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
          <div className=" grid grid-cols-6 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-3 justify-center">Operation Type</div>


            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Date & Time</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdOperationPayment.map((item, index) => {
                // new Date().toISOString()
                let date = new Date(item.extra?.date).toUTCString()

                return (
                  <>
                    <div className="flex col-span-3 justify-center">{item.operation_name}</div>
                   {
                   item.id != editId ?
                   <div className="flex col-span-1 justify-center">{item.amount}</div>
                  :
                  <div className="flex col-span-1 justify-center text-black">
                  <input type="number" onChange={(e)=>setEditAmount(e.target.value)} value={editAmount} />
                </div>
                  }
                    <div className="flex col-span-1 justify-center">{date || ''}</div>

                    <div className="flex col-span-1 justify-center items-center space-x-3">
                    {
                        item.id != editId ?
                      <span className='cursor-pointer text-xl text-green-600'
                      onClick={()=>onEditClick(item.id,item.amount)}
                      >
                      <FiEdit />
                    </span>
                    :                       <span className='cursor-pointer text-lg text-green-600'
                    onClick={()=>
                      {
                      updateIpdOperationPayment({ variables: { id:item.id, input:{'amount':parseFloat(editAmount)} } })
                      setEditAmount(0);
                      setEditId(0);
                    }

                    }
                    >
                      Save
                  </span>
                    }
                     <span className='cursor-pointer text-xl text-red-600'
                    onClick={()=>onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span>

                    </div>


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

          <div className={`flex justify-center mt-2 ${editId!=0 && 'hidden'}`}>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOperationCharge}>Add Operation Charge</div>
          </div>

        </div>
        <div className={`flex justify-center mt-2 pb-3 ${editId!=0 && 'hidden'}`}>
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
  const [date,setDate] = useState(new Date())



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
        extra : {date:new Date(date)}

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
      <div className=" col-span-3  w-full">
        <Select options={obj} isClearable={true} required onChange={operationChargeTypeChange}
        />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="number" onChange={(e)=>setAmount(e.target.value)} value={amount} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="datetime-local" onChange={(e)=>setDate(e.target.value)} value={date} />
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

