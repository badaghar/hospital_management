import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdCell'
import axios from "axios"
const CREATE_IPD_CHARGES_MUTATION = gql`
  mutation CreateIpdChargesMutation($input: [CreateIpdChargesInput]!,$isOpd: Boolean) {
    createIpdCharges(input: $input,isOpd: $isOpd) {
      id
    }
  }
`

const DELETE_IPD_CHARGES_MUTATION = gql`
  mutation DeleteIpdChargesMutation($id: Int!) {
    deleteIpdCharges(id: $id) {
      id
    }
  }
`


const IpdOtherCharges = ({ ipd, users, chargeses }) => {
  const [otherChargesArray, setOtherChargesArray] = useState([])
  const [isPrint, setIsPrint] = useState(false)
  const isOpd = ipd.patientType=='OPD'

  const [deleteIpdCharges] = useMutation(DELETE_IPD_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('Charges deleted')
      // navigate(routes.ipd({ id: ipd.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{
      query: QUERY, variables: {
        id: ipd.id,
      },
    }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete Charges ' + id + '?')) {
      deleteIpdCharges({ variables: { id } })
    }
  }

  // kehnfwei
  function getPDF(id) {
    return axios.get(
      `http://localhost:1000/downloadOtherCharges?id=` +
      // `${'/api/'}downloadOtherCharges?id=` +
      id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = (id) => {
    return getPDF(id) // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        var blobURL = URL.createObjectURL(blob)
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
        toast.success('Download Complete')
      })
      .catch((err) => {
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }


  const [createIpdCharges, { loading, error }] = useMutation(
    CREATE_IPD_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('Charges added')
        setOtherChargesArray([])
        if (isPrint) {
          printPDF(ipd.id)


        }
        navigate(routes.ipd({ id: ipd.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{
        query: QUERY, variables: {
          id: ipd.id,
        },
      }],
      awaitRefetchQueries: true,
    }
  )
  const onSave = () => {
    // console.log(doctorChargesArray)
    // const hasEmptyValue = otherChargesArray.some((obj) => {
    //   // Check if any value in the object is empty
    //   return Object.values(obj).some((value) => value === null || value === '' || !value);
    // });
    // if (hasEmptyValue) {
    //   toast.error('Enter All The Details')
    //   return
    // }
    createIpdCharges({ variables: { input: otherChargesArray,isOpd } })
  }
  const onSaveAndPrint = () => {
    // console.log(doctorChargesArray)
    // const hasEmptyValue = otherChargesArray.some((obj) => {
    //   // Check if any value in the object is empty
    //   return Object.values(obj).some((value) => value === null || value === '' || !value);
    // });
    // if (hasEmptyValue) {
    //   toast.error('Enter All The Details')
    //   return
    // }
    setIsPrint(true)
    createIpdCharges({ variables: { input: otherChargesArray ,isOpd} })
  }

  const addOtherCharges = () => {
    setOtherChargesArray((item) => [...item, { charge_type: '', quantity: 0, charge: 0, total: 0, ipdId: ipd.id}])
    // const arr = chargeses.map((item)=>{
    //   return { charge_type: item.name, quantity: 0, charge: item.amount, total: 0, ipdId: ipd.id }
    // })
    // setOtherChargesArray(arr)

  }
  useEffect(()=>{
    // console.log('hello         \n\n\n\n\n\n\n',ipd.IpdCharges)
    // if(ipd.IpdCharges.length != 0)
    // {
      // console.log('here')

      const arr2 = ipd.IpdCharges.map((item)=>{
        return { charge_type: item.charge_type, quantity: item.quantity, charge: item.charge, total: item.total, ipdId: ipd.id }
      })
    //   console.log(arr)
    //   setOtherChargesArray(arr)

    // }
    // else{
      // console.log('here2')

    //   const arr = chargeses.map((item)=>{
    //     return { charge_type: item.name, quantity: item.quantity || 0, charge: item.amount, total: 0, ipdId: ipd.id }
    //   })
    //   setOtherChargesArray(arr)
    // }
    let arr = chargeses.map((item)=>{
      // console.log('here3')
          for(let i=0;i<arr2.length;i++)
          {
            // console.log('helllo')
            if(arr2[i].charge_type==item.name)
            {
              // return
              // console.log('called')
              return { charge_type: arr2[i].charge_type, quantity: arr2[i].quantity, charge: arr2[i].charge, total: 0, ipdId: ipd.id }
            }
          }
          return { charge_type: item.name, quantity: item.quantity || 0, charge: item.amount, total: 0, ipdId: ipd.id }
        })
    setOtherChargesArray(arr)
    if(ipd.patientType=='OPD')
    {
            const arr = chargeses.map((item)=>{
        return { charge_type: item.name, quantity: item.quantity || 0, charge: item.amount, total: 0, ipdId: ipd.id }
      })
      setOtherChargesArray([])


    }

  },[ipd])

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
          <div className={` grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2 ${ipd.patientType=='OPD' ?'grid-cols-5' :'grid-cols-4 '}`}>

            <div className="flex col-span-1 justify-center">Charges Type</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Quantity</div>
            <div className="flex col-span-1 justify-center">Net Amount</div>
           {ipd.patientType=='OPD' && <div className="flex col-span-1 justify-center">Action</div>}

            {ipd.patientType=='OPD' &&
              ipd.IpdCharges.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.charge_type}</div>
                    <div className="flex col-span-1 justify-center">{item.charge}</div>
                    <div className="flex col-span-1 justify-center">{item.quantity}</div>
                    <div className="flex col-span-1 justify-center">{item.total}</div>
                    <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                    onClick={()=>onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span></div>
                  </>
                )
              })
            }
            {
              otherChargesArray.map((item, index) => {
                return (
                  // <React.Fragment key={index}>
                    <OtherChargeBody key={index} chargeses={chargeses} item={item}
                      otherChargesArray={otherChargesArray}
                      setOtherChargesArray={setOtherChargesArray}
                      del={delectOtherCharges}
                      index={index}
                      chargename={otherChargesArray[index].charge_type}
                      quantity={otherChargesArray[index].quantity}
                      amt={otherChargesArray[index].charge}
                      ipd={ipd}
                      // amt = {}
                    />
                  // </>
                )
              })

            }
          </div>

{ ipd.patientType=='OPD'  &&        <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOtherCharges}>Add Charge</div>
          </div>}

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <button className='bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2' onClick={onSave}>Save Changes</button>
          <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2" onClick={onSaveAndPrint}>Save & Print</button>
        </div>

      </div>
    </div>
  )
}

const OtherChargeBody = ({ chargeses, item, otherChargesArray, del, setOtherChargesArray, index ,chargename,quantity,amt,ipd}) => {

  const [chargeType, setChargeType] = useState()
  const [obj, setObj] = useState([])
  const [amount, setAmount] = useState(0)
  const [quantity1, setQuantity] = useState(quantity || 0)
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
    setAmount(item?.amount || 0)
    setChargeType(item)
    // console.log(item)



  }

  useEffect(() => {
    set_net_amount(quantity1 * amount)
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        quantity: parseInt(quantity1),
        total: quantity1 * amount
      };
      return newArray;
    });
    // setQuantity(quantity1)


  }, [quantity1])






  useEffect(() => {
    if(ipd.patientType=='OPD')
    {
          const obj = chargeses.map((char) => {
      const ob = { value: char.name, label: char.name, amount: char.amount }
      return ob
    })
    setObj(obj)
    }

    // if (item.charge_type) {
    //   setChargeType({ value: item.charge_type, label: item.charge_type })
    // }
    // setQuantity(item.qunatity)
    setAmount(amt)
    set_net_amount(amt*quantity)

    // const obj = chargeses.map((char) => {
    //   const ob = { value: char.name, label: char.name, amount: char.amount }
    //   return ob
    // })
    // setObj(obj)
    // setAmount(item.charge)
    // console.log(item)



  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
      { ipd.patientType=='OPD' ?  <Select options={obj} isClearable={true} required onChange={chargeTypeChange} value={item.type !== '' ? chargeType : ''}
        /> :
        <div>
          {chargename}
        </div>}
      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center ">
        <input type="number" className="bg-slate-900 text-white p-2" name="" id="" value={quantity1} onChange={(item) => setQuantity(item.target.value)} required />

      </div>
      <div className="flex col-span-1 justify-center">{net_amount}</div>
 {ipd.patientType=='OPD' &&     <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>}
    </>
  )
}

export default IpdOtherCharges


// export default IpdOtherCharges
