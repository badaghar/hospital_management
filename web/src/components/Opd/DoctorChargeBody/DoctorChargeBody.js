import { useEffect, useState } from "react"
import React from 'react'
import Select from 'react-select'
import { MdDeleteForever } from 'react-icons/md'

const DoctorChargeBody = ({doctors,item,doctorChargesArray,setDoctorChargesArray,index,del,doctorFees}) => {
  const [doctorName,setDoctorName] = useState()
  const [chargeType,setChargeType] = useState()
  const [chargeTypeArray,setchargeTypeArray] = useState([])
  const [amount,setAmount] = useState(0)
  // const [amount,setAmount]
  const doctorChange = (item) =>{
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        name: item?.value || ''
      };
      return newArray;
    });

    let ct = doctorFees.filter((it)=> it.userId==item?.id || 0)
    ct = ct.map((it)=>{
      const ob = {label:it.type,value:it.type,id:it.id}
      return ob
    })
    console.log(item)

    if(!item)
    {
      // console.log('here')
      setDoctorChargesArray((array) => {
        const newArray = [...array];
        newArray[index] = {
          ...newArray[index],
          type:'',
          amount:  0
        };
        return newArray;
      });
      setChargeType('')
    }

    // console.log(ct)
    setchargeTypeArray(ct)
    setDoctorName(item)
  }

  const chargeChange = (item) =>{
    setChargeType(item)

    const ml = doctorFees.filter((it) => it.id==item?.id)
    // console.log(ml,item)
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        type: item?.value || '',
        amount: ml[0]?.amount || 0
      };
      return newArray;
    });

    // console.log(ml[0]?.amount)
    setAmount(ml[0]?.amount || 0)



  }

   useEffect(()=>{
    if(item.name)
    {
      setDoctorName({value:item.name,label:item.name})
    }
    if(item.type)
    {
      setChargeType({value:item.type,label:item.type})
    }
    setAmount(item.amount)
    // console.log(item.amount)

  },[item])

  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select  options={doctors} isClearable={true} required onChange={doctorChange}  value={item.name!=='' ? doctorName : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">
      <Select  options={chargeTypeArray} isClearable={true} required onChange={chargeChange} value={chargeType}
        />


      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this,index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )

}
export default DoctorChargeBody
