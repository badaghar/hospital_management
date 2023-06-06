import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdsCell'
const CREATE_IPD_CONSULTATION_MUTATION = gql`
  mutation CreateIpdConsultationMutation($input: [CreateIpdConsultationInput]!) {
    createIpdConsultation(input: $input) {
      id
    }
  }
`


const IpdConsultant = ({ ipd, users, doctorFees }) => {
  const [createIpdConsultation, { loading, error }] = useMutation(
    CREATE_IPD_CONSULTATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Consultation Charges Added')

        navigate(routes.ipds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // refetchQueries: [{ query: QUERY }],
      // awaitRefetchQueries: true,
    }
  )

  const onSave = () => {
    console.log(doctorChargesArray)
    createIpdConsultation({ variables: { input:doctorChargesArray } })
  }
  const [doctors, setDoctors] = useState()
  const [doctorChargesArray, setDoctorChargesArray] = useState([])
  const addDoctorCharges = () => {
    setDoctorChargesArray((item) => [...item, { consultation_doctor: '', consultation_type: '', amount: 0,ipdId:ipd.id }])
    // setNoOfDoctorCharges((item) => item + 1)
  }
  const delectDoctorCharges = (index) => {
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });
  }

  useEffect(() => {
    let obj = users.filter((item) => item.roles == 'doctor')
    obj = obj.map((item) => {
      const obj = { 'label': item.name, 'value': item.name, 'id': item.id }
      return obj
    })
    setDoctors(obj)
  }, [])
  return (
    <div className="m-3 p-3">
      <div className="shadow-md rounded-md">

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Doctor Name</div>
            <div className="flex col-span-1 justify-center">Charges Type</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdConsultation.map((item, index) => {
                return (
                  <>
                    {/* <OtherChargeBody key={index} chargeses={props.chargeses} item={item}
                    otherChargesArray={otherChargesArray}
                    setOtherChargesArray={setOtherChargesArray}
                    del={delectOtherCharges}
                    index={index}
                  /> */}
                    <div className="flex col-span-1 justify-center">{item.consultation_doctor}</div>
                    <div className="flex col-span-1 justify-center">{item.consultation_type}</div>
                    <div className="flex col-span-1 justify-center">{item.amount}</div>
                    <div className="flex col-span-1 justify-center">No Action</div>

                  </>
                )
              })
            }
            {
              doctorChargesArray.map((item, index) => {
                return (
                  <>
                    <DoctorChargeBody key={index} item={item} doctors={doctors} index={index}
                      doctorChargesArray={doctorChargesArray}
                      setDoctorChargesArray={setDoctorChargesArray}
                      del={delectDoctorCharges}
                      doctorFees={doctorFees}

                    />


                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addDoctorCharges}>Add Doctor Charge</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <div className='bg-green-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={onSave}>Save Changes</div>
        </div>

      </div>
    </div>
  )
}

const DoctorChargeBody = ({ doctors, item, doctorChargesArray, setDoctorChargesArray, index, del, doctorFees }) => {
  const [doctorName, setDoctorName] = useState()
  const [chargeType, setChargeType] = useState()
  const [chargeTypeArray, setchargeTypeArray] = useState([])
  const [amount, setAmount] = useState(0)
  // const [amount,setAmount]
  const doctorChange = (item) => {
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        consultation_doctor: item?.value || ''
      };
      return newArray;
    });

    let ct = doctorFees.filter((it) => it.userId == item?.id || 0)
    ct = ct.map((it) => {
      const ob = { label: it.type, value: it.type, id: it.id }
      return ob
    })
    console.log(item)

    if (!item) {
      // console.log('here')
      setDoctorChargesArray((array) => {
        const newArray = [...array];
        newArray[index] = {
          ...newArray[index],
          consultation_type: '',
          amount: 0
        };
        return newArray;
      });
      setChargeType('')
    }

    // console.log(ct)
    setchargeTypeArray(ct)
    setDoctorName(item)
  }

  const chargeChange = (item) => {
    setChargeType(item)

    const ml = doctorFees.filter((it) => it.id == item?.id)
    // console.log(ml,item)
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        consultation_type: item?.value || '',
        amount: ml[0]?.amount || 0
      };
      return newArray;
    });

    // console.log(ml[0]?.amount)
    setAmount(ml[0]?.amount || 0)



  }

  useEffect(() => {
    if (item.consultation_doctor) {
      setDoctorName({ value: item.consultation_doctor, label: item.consultation_doctor })
    }
    if (item.consultation_type) {
      setChargeType({ value: item.consultation_type, label: item.consultation_type })
    }
    setAmount(item.amount)
    // console.log(item.amount)

  }, [item])

  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={doctors} isClearable={true} required onChange={doctorChange} value={item.name !== '' ? doctorName : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">
        <Select options={chargeTypeArray} isClearable={true} required onChange={chargeChange} value={chargeType}
        />


      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )

}

export default IpdConsultant
