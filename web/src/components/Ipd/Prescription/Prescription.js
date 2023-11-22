import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdCell'
import { DatetimeLocalField } from "@redwoodjs/forms"
const CREATE_IPD_PRESCRIPTION_MUTATION = gql`
  mutation CreateIpdPrescriptionMutation($input: [CreateIpdPrescriptionInput]!) {
    createIpdPrescription(input: $input) {
      id
    }
  }
`
const DELETE_IPD_PRESCRIPTION_MUTATION = gql`
  mutation DeleteIpdPrescriptionMutation($id: Int!) {
    deleteIpdPrescription(id: $id) {
      id
    }
  }
`



const Prescription = ({ ipd,medicines }) => {

  const [prescriptionArray, setPrescriptionArray] = useState([])

  const [createIpdPrescription, { loading, error }] = useMutation(
    CREATE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription created')
        // navigate(routes.ipdPrescriptions())
        setPrescriptionArray([])
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

  const onSave = (input) => {
    // createIpdPrescription({ variables: { input } })
    console.log(prescriptionArray)
    const hasEmptyValue = prescriptionArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '' || !value);
    });
    if(hasEmptyValue)
    {
      toast.error('Enter All The Details')
      return
    }
    createIpdPrescription({ variables: { input:prescriptionArray } })
  }

  const [deleteIpdPrescription] = useMutation(
    DELETE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription deleted')
        // navigate(routes.ipdPrescriptions())
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

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdPrescription ' + id + '?')
    ) {
      deleteIpdPrescription({ variables: { id } })
    }
  }

  const addPrescription = () => {
    setPrescriptionArray((item) => [...item, { medicine: '', dosage: '', timing: '',frequency:'',duration:'', note:'',quantity:0,ipdId: ipd.id }])
  }

  const deletePrescription  = (index) => {
    setPrescriptionArray((array) => {
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

            <div className="flex col-span-1 justify-center">Medicine </div>
            <div className="flex col-span-1 justify-center">Dosage</div>
            <div className="flex col-span-1 justify-center">Timing</div>
            <div className="flex col-span-1 justify-center">Frequency</div>
            <div className="flex col-span-1 justify-center">Duration</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdPrescription.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.medicine}</div>
                    <div className="flex col-span-1 justify-center">{item.dosage}</div>
                    <div className="flex col-span-1 justify-center">{item.timing}</div>
                    <div className="flex col-span-1 justify-center">{item.frequency}</div>
                    <div className="flex col-span-1 justify-center">{item.duration}</div>
                    <div className="flex col-span-4 justify-center" > Note :- {item.note}</div>
                    <div className="flex col-span-1 justify-center" > Quantity :- {item.quantity}</div>
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
              prescriptionArray.map((item, index) => {
                return (
                  <>
                    <MedicationChargeBody key={index}  item={item}
                      prescriptionArray={prescriptionArray}
                      setPrescriptionArray={setPrescriptionArray}
                      del={deletePrescription}
                      index={index}
                      medicines={medicines}
                    />
                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addPrescription}>Add Prescription</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={onSave}>Save Changes</div>
        </div>

      </div>
    </div>
  )
}

const MedicationChargeBody = ({ item, prescriptionArray, del, setPrescriptionArray, index,medicines }) => {

  // const [labchargeType, setlabChargeType] = useState()
  // const [obj, setObj] = useState([])
  const [medicine, setMedicine] = useState('')
  const [dosage, setDosage] = useState('')
  const [timing, setTiming] = useState('')
  const [frequency, setFrequency] = useState('')
  const [duration, setDuration] = useState('')
  const [note, setNote] = useState('')
  const [quantity,setQuantity] = useState(0)
  const [maxQty,setMaxQty] = useState(0)
  const [obj, setObj] = useState([])
  const [medicineName, setMedicineName] = useState()
  const [timingObj,setTimingObj] = useState([
    {value:'After Food',label:'After Food'},
    {value:'Before Food',label:'Before Food'},
  ])
  const [timingObjName,setTimingObjectName] = useState()




  const ipdPrescriptionChange = (name, value,func) => {
    if(func==setQuantity)
    {
      value = parseInt(value)
      // console.log('hello')
      if(value>maxQty)
      {
        // console.log('hello2')
        return
      }
    }
    // console.log('hello3')
    func(value)


    setPrescriptionArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [name]: value

      };
      return newArray;
    });
  }

  useEffect(() => {

    if (item.medicine) {
      setMedicineName({ value: item.medicine, label: item.medicine })
    }
    if(item.timing) {
      setTimingObjectName({ value: item.timing, label: item.timing })

    }

    const obj = medicines.map((char) => {
      const ob = { value:`${char.pid.name} - ${char.batch} - ${char.quantity}`, label: `${char.pid.name} - ${char.batch} - ${char.quantity}`,qty:char.quantity }
      return ob
    })
    setObj(obj)
    console.log(item)
  }, [item])

  const medicineNameChange = (item) => {



    setPrescriptionArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        medicine:item?.value || ''

      };
      return newArray;
    });
    setMaxQty(item?.qty || 0)
  }

  const timingChange = (item) => {


    setPrescriptionArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        timing:item?.value || ''

      };
      return newArray;
    });
  }












  return (
    <>

<div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={medicineNameChange} value={item.name !== '' ? medicineName : ''}
        />
      </div>

      {/* <div className="flex col-span-1 justify-center text-black">
        <input className="border border-black p-2" type="text" name="medicine" id="" value={medicine} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setMedicine)} />
      </div> */}
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="dosage" className="border border-black p-2" id="" value={dosage} placeholder="Ex : 1-0-1" required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setDosage)} />
      </div>


      <div className="flex col-span-1 justify-center">
        <Select options={timingObj} isClearable={true} required onChange={timingChange} value={item.name !== '' ? timingObjName : ''}
        />
      </div>


      {/* <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="timing" className="border border-black p-2" id="" value={timing} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setTiming)} />
      </div> */}
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="frequency" className="border border-black p-2" id="" value={frequency} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setFrequency)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="duration" className="border border-black p-2" id="" value={duration} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setDuration)} />
      </div>
      <div className="flex col-span-4 w-full justify-center text-black">
        <input type="text" name="note" className="border border-black p-2 w-full" id="" value={note} required
        onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setNote)}
        placeholder="Note" />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="number" name="quantity" className="border border-black p-2" placeholder="Quantity" id="" value={quantity} required
        onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setQuantity)}
         />
      </div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600 p-2' onClick={del.bind(this, index)}>
          <MdDeleteForever className="" />
        </span>
      </div>
    </>
  )
}

export default Prescription
