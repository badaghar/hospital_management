import { useEffect, useState } from "react"
import React from 'react'
import Select from 'react-select'
import { MdDeleteForever } from 'react-icons/md'
const OtherChargeBody = ({ chargeses, item, otherChargesArray, del, setOtherChargesArray,index }) => {

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
        type: item?.value || '',
        amount: item?.amount || 0
      };
      return newArray;
    });
    // setAmount(item?.amount || 0)
    // setChargeType(item)
    // console.log(item)



  }

  useEffect(() => {
    set_net_amount(quantity* amount )
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        quantity: parseInt(quantity),
        net_amount: quantity*amount
      };
      return newArray;
    });
    // setQuantity(quantity)


  }, [quantity])






  useEffect(() => {

    if (item.type) {
      setChargeType({ value: item.type, label: item.type })
    }
    // setQuantity(item.qunatity)
    setAmount(item.qunatity * item.amount)

    const obj = chargeses.map((char) => {
      const ob = { value: char.name, label: char.name, amount: char.amount }
      return ob
    })
    setObj(obj)
    setAmount(item.amount)
    console.log(item)



  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={chargeTypeChange} value={item.type!=='' ? chargeType : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center ">
        <input type="number"  className="bg-slate-900 text-white p-2" name="" id="" value={quantity} onChange={(item) => setQuantity(item.target.value)}  required/>

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

export default OtherChargeBody
