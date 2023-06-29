import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdCell'
import { DatetimeLocalField } from "@redwoodjs/forms"
const CREATE_IPD_CHAT_MUTATION = gql`
  mutation CreateIpdChatMutation($input: [CreateIpdChatInput]!) {
    createIpdChat(input: $input) {
      id
    }
  }
`

const IpdChatComponent = ({ ipd, users }) => {
  const [medicationChargeArray, setmedicationChargeArray] = useState([])
  const [createIpdChat, { loading, error }] = useMutation(
    CREATE_IPD_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdChat created')
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
    console.log(medicationChargeArray)
    const hasEmptyValue = medicationChargeArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '' || !value);
    });
    if(hasEmptyValue)
    {
      toast.error('Enter All The Details')
      return
    }
    createIpdChat({ variables: { input: medicationChargeArray } })
  }

  const addMedicationChat = () => {
    setmedicationChargeArray((item) => [...item, { date: '', drug: '', dose: '', route: '', ipdId: ipd.id }])
  }

  const deleteMedicationChat = (index) => {
    setmedicationChargeArray((array) => {
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

            <div className="flex col-span-1 justify-center">Date/Time</div>
            <div className="flex col-span-1 justify-center">Drug</div>
            <div className="flex col-span-1 justify-center">Dose</div>
            <div className="flex col-span-1 justify-center">Route</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdChat.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.date}</div>
                    <div className="flex col-span-1 justify-center">{item.drug}</div>
                    <div className="flex col-span-1 justify-center">{item.dose}</div>
                    <div className="flex col-span-1 justify-center">{item.route}</div>
                    <div className="flex col-span-1 justify-center">No Action</div>

                  </>
                )
              })
            }
            {
              medicationChargeArray.map((item, index) => {
                return (
                  <>
                    <MedicationChargeBody key={index}  item={item}
                      medicationChargeArray={medicationChargeArray}
                      setmedicationChargeArray={setmedicationChargeArray}
                      del={deleteMedicationChat}
                      index={index}
                    />
                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addMedicationChat}>Add Details</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={onSave}>Save Changes</div>
        </div>

      </div>
    </div>
  )
}
// const formatDatetime = (value) => {
//   if (value) {
//     return value.replace(/:\d{2}\.\d{3}\w/, '')
//   }
// }

const MedicationChargeBody = ({ item, medicationChargeArray, del, setmedicationChargeArray, index }) => {

  // const [labchargeType, setlabChargeType] = useState()
  const [obj, setObj] = useState([])
  const [date, setDate] = useState(new Date())
  const [drug, setDug] = useState('')
  const [dose, setDose] = useState('')
  const [route, setRoute] = useState('')



  const ipdChatChange = (name, value,func) => {
    func(value)


    setmedicationChargeArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [name]: value

      };
      return newArray;
    });
  }

  useEffect(()=>{
    setmedicationChargeArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
       date: new Date(date)

      };
      return newArray;
    });
  },[date])









  return (
    <>
      <div className="flex col-span-1 justify-center">
        <input type="datetime-local" className="border border-black p-2" name="date" id=""

        value={date.toISOString().slice(0, 16)}
        required

        // onChange={(e) => ipdChatChange(e.target.name, e.target.value,setDate)}

        />

        {/* <DatetimeLocalField
         name="date"
        //  defaultValue={date}
         className="rw-input"
         errorClassName="rw-input rw-input-error"
         validation={{ required: true }}


        /> */}
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input className="border border-black p-2" type="text" name="drug" id="" value={drug} required onChange={(e) => ipdChatChange(e.target.name, e.target.value,setDug)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="dose" className="border border-black p-2" id="" value={dose} required onChange={(e) => ipdChatChange(e.target.name, e.target.value,setDose)} />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="text" name="route" className="border border-black p-2" id="" value={route} required onChange={(e) => ipdChatChange(e.target.name, e.target.value,setRoute)} />
      </div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600 p-2' onClick={del.bind(this, index)}>
          <MdDeleteForever className="" />
        </span>
      </div>
    </>
  )
}

export default IpdChatComponent

