import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdsCell'
const CREATE_IPD_CHARGES_MUTATION = gql`
  mutation CreateIpdChargesMutation($input: [CreateIpdChargesInput]!) {
    createIpdCharges(input: $input) {
      id
    }
  }
`


const IpdOtherCharges = ({ ipd, users, chargeses }) => {
  const [otherChargesArray, setOtherChargesArray] = useState([])
  const [createIpdCharges, { loading, error }] = useMutation(
    CREATE_IPD_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdCharges added')
        navigate(routes.ipds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const onSave = () => {
    // console.log(doctorChargesArray)
    createIpdCharges({ variables: { input: otherChargesArray } })
  }

  const addOtherCharges = () => {
    setOtherChargesArray((item) => [...item, { charge_type: '', quantity: 0, charge: 0, total: 0, ipdId: ipd.id }])
  }

  const delectOtherCharges = (index) => {
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }
  return (
    <div className="m-3 p-3">
      <div className="shadow-md rounded-md">

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-5 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Charges Type</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Quantity</div>
            <div className="flex col-span-1 justify-center">Net Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdCharges.map((item, index) => {
                return (
                  <>
                    {/* <OtherChargeBody key={index} chargeses={props.chargeses} item={item}
                    otherChargesArray={otherChargesArray}
                    setOtherChargesArray={setOtherChargesArray}
                    del={delectOtherCharges}
                    index={index}
                  /> */}
                    <div className="flex col-span-1 justify-center">{item.charge_type}</div>
                    <div className="flex col-span-1 justify-center">{item.charge}</div>
                    <div className="flex col-span-1 justify-center">{item.quantity}</div>
                    <div className="flex col-span-1 justify-center">{item.total}</div>
                    <div className="flex col-span-1 justify-center">No Action</div>

                  </>
                )
              })
            }
            {
              otherChargesArray.map((item, index) => {
                return (
                  <>
                    <OtherChargeBody key={index} chargeses={chargeses} item={item}
                      otherChargesArray={otherChargesArray}
                      setOtherChargesArray={setOtherChargesArray}
                      del={delectOtherCharges}
                      index={index}
                    />
                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOtherCharges}>Add Charge</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={onSave}>Save Changes</div>
        </div>

      </div>
    </div>
  )
}

const OtherChargeBody = ({ chargeses, item, otherChargesArray, del, setOtherChargesArray, index }) => {

  const [chargeType, setChargeType] = useState()
  const [obj, setObj] = useState([])
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [net_amount, set_net_amount] = useState(0)


  const chargeTypeChange = (item) => {


    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        charge_type: item?.value || '',
        charge: item?.amount || 0
      };
      return newArray;
    });
    // setAmount(item?.amount || 0)
    // setChargeType(item)
    // console.log(item)



  }

  useEffect(() => {
    set_net_amount(quantity * amount)
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        quantity: parseInt(quantity),
        total: quantity * amount
      };
      return newArray;
    });
    // setQuantity(quantity)


  }, [quantity])






  useEffect(() => {

    if (item.charge_type) {
      setChargeType({ value: item.charge_type, label: item.charge_type })
    }
    // setQuantity(item.qunatity)
    setAmount(item.qunatity * item.charge)

    const obj = chargeses.map((char) => {
      const ob = { value: char.name, label: char.name, amount: char.amount }
      return ob
    })
    setObj(obj)
    setAmount(item.charge)
    console.log(item)



  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={chargeTypeChange} value={item.type !== '' ? chargeType : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center ">
        <input type="number" className="bg-slate-900 text-white p-2" name="" id="" value={quantity} onChange={(item) => setQuantity(item.target.value)} required />

      </div>
      <div className="flex col-span-1 justify-center">{net_amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )
}

export default IpdOtherCharges


// export default IpdOtherCharges
