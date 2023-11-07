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



const Prescription = ({ ipd }) => {

  const [prescriptionArray, setPrescriptionArray] = useState([])

  const [createIpdPrescription, { loading, error }] = useMutation(
    CREATE_IPD_PRESCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdPrescription created')
        navigate(routes.ipdPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
        navigate(routes.ipdPrescriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    setPrescriptionArray((item) => [...item, { medicine: '', dosage: '', timing: '',frequency:'',duration:'', note:'',ipdId: ipd.id }])
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
          <div className=" grid grid-cols-5 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Medicine </div>
            <div className="flex col-span-1 justify-center">Dosage</div>
            <div className="flex col-span-1 justify-center">Timing</div>
            <div className="flex col-span-1 justify-center">Frequency</div>
            <div className="flex col-span-1 justify-center">Duration</div>

            {/* {
              ipd.IpdPrescription.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.date}</div>
                    <div className="flex col-span-1 justify-center">{item.drug}</div>
                    <div className="flex col-span-1 justify-center">{item.dose}</div>
                    <div className="flex col-span-1 justify-center">{item.route}</div>
                    <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                    onClick={()=>onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span></div>

                  </>
                )
              })
            } */}
            {
              prescriptionArray.map((item, index) => {
                return (
                  <>
                    <MedicationChargeBody key={index}  item={item}
                      prescriptionArray={prescriptionArray}
                      setPrescriptionArray={setPrescriptionArray}
                      del={deletePrescription}
                      index={index}
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

const MedicationChargeBody = ({ item, prescriptionArray, del, setPrescriptionArray, index }) => {

  // const [labchargeType, setlabChargeType] = useState()
  // const [obj, setObj] = useState([])
  const [medicine, setMedicine] = useState('')
  const [dosage, setDosage] = useState('')
  const [timing, setTiming] = useState('')
  const [frequency, setFrequency] = useState('')
  const [duration, setDuration] = useState('')
  const [note, setNote] = useState('')




  const ipdPrescriptionChange = (name, value,func) => {
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











  return (
    <>

      <div className="flex col-span-1 justify-center text-black">
        <input className="border border-black p-2" type="text" name="medicine" id="" value={medicine} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setMedicine)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="dosage" className="border border-black p-2" id="" value={dosage} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setDosage)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="timing" className="border border-black p-2" id="" value={timing} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setTiming)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="frequency" className="border border-black p-2" id="" value={frequency} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setFrequency)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="duration" className="border border-black p-2" id="" value={duration} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setDuration)} />
      </div>
      <div className="flex col-span-4 w-full justify-center text-black">
        <input type="text" name="note" className="border border-black p-2 w-full" id="" value={note} required onChange={(e) => ipdPrescriptionChange(e.target.name, e.target.value,setNote)} placeholder="Note" />
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
