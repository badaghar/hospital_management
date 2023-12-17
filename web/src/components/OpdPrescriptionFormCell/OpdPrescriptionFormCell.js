import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { toast } from '@redwoodjs/web/dist/toast'
export const QUERY = gql`
  query FindOpdPrescriptionFormQuery{
    opdPrescriptionForm: ipds(type: "OPD"){
      id
      patient{
        id
        name
        phone_no
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ opdPrescriptionForm }) => {
  const [obj, setObj] = useState([])
  const [opdId,setOpdId] = useState(0)
  useEffect(()=>{
    const uniquePatientIds = new Set();

// Use the filter method to create a new array with unique objects based on patient ID
const uniqueArray = opdPrescriptionForm.filter((item) => {
  const patientId = item.patient.id;

  // Check if the patient ID is already in the Set
  if (!uniquePatientIds.has(patientId)) {
    // If not, add it to the Set and include the item in the uniqueArray
    uniquePatientIds.add(patientId);
    return true;
  }

  // If the patient ID is already in the Set, skip this item (filter it out)
  return false;
});
    console.log(opdPrescriptionForm)
    const obj1 = uniqueArray.map((item)=>{
      const ob = { value: item.id, label:item.patient.name+' '+item.patient.phone_no + ' '+ item.id,id:item.id }
      return ob
    })
    setObj(obj1)
  },[opdPrescriptionForm])
  const opdIdchange = (item) =>{
    setOpdId(item)
  }
  const onSubmit = () => {
    if(!opdId)
    {
      toast.error('Invalid Patient')
      return
    }
    let id = opdId.value
    navigate(routes.opdPrescripdeCell({id}))

  }
  return (
    <>
    <div className='flex justify-center text-white font-bold uppercase mt-4 underline'>
      <span>Prescribed Medicine</span>
    </div>
    <Form  className="max-w-md mx-auto mt-8">


    <FormError

          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />


      <div className="mb-4">
      <Label
          name="opdId"
          className="rw-label text-white font-bold"
          errorClassName="rw-label rw-label-error"
        >
          Select OPD Patient
        </Label>
      <div className="rw-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      {<Select options={obj} isClearable={true} required onChange={opdIdchange} value={opdId}
        />

        }
      </div>

        {/* <Label
          name="opdId"
          className="rw-label text-white font-bold"
          errorClassName="rw-label rw-label-error"
        >
          Enter OPD ID
        </Label>


        <TextField
          name="opdId"

          className="rw-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          errorClassName="rw-input rw-input-error"
          placeholder="Enter Opd ID"
          validation={{ required: true,valueAsNumber:true }}
        />

        <FieldError name="opdId" className="rw-field-error" /> */}

      </div>

      {/* Add other form fields as needed */}

      <Submit onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </Submit>
    </Form>
    </>
  )
}
