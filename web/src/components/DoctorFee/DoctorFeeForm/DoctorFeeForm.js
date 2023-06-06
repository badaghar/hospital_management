import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  SelectField
} from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import { useState, useEffect } from 'react'
function convertObjectValuesToUpper(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // throw new Error('Input must be an object.');
    return {}
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim().toUpperCase();
    }
  }

  return obj;
}

const DoctorFeeForm = (props) => {

  const [options, setOptions] = useState([])
  // const [typeOptions,setTypeOptions] = useState([])
  const [defaultDoctorSelection, setDefaultDoctorSelection] = useState([])
  const [defaultTypeSelection,setDefaultTypeSelection] = useState([])
  const [doctorId, setDoctorId] = useState([])
  const [typeOption, setTypeOptions] = useState(['consultation', 'emergency'])
  const [type, setType] = useState('')
  useEffect(() => {

    const obj = props.users.filter((item) => item.roles == 'doctor')
    setOptions(obj)
    if (props.doctorFee?.userId) {
      const obj1 = obj.filter((item) => item.id == props.doctorFee?.userId)
      console.log('here',obj1,obj)
      setDefaultDoctorSelection(obj1)
    }
    if(props.doctorFee?.type)
    {
      setDefaultTypeSelection([props.doctorFee?.type])

    }

  }, [])
  const onSubmit = (data) => {
    data['type'] = type
    data['userId'] = doctorId
    data =convertObjectValuesToUpper(data)
    props.onSave(data, props?.doctorFee?.id)
  }

  const modifyDoctor = (name) => {
    if (name.length === 0) {
      return
    }
    // console.log(name)
    // Manufacturer = name[0].id
    setDoctorId(name[0].id)
  }
  const modifyType = (name) => {
    if (name.length === 0) {
      return
    }
    // console.log(name)
    // Manufacturer = name[0].id
    setType(name[0])

  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {/* <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.doctorFee?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" /> */}

        <div className='flex items-center mt-3  gap-x-4'>

          <Label
            className="rw-label mt-0"
          >
            Select Fees Type
          </Label>

          <div className=" flex-1">

            <Multiselect
              options={typeOption} // Options to display in the dropdown
              selectedValues={defaultTypeSelection}
              onSelect={(event) => modifyType(event)} // Function will trigger on select event
              onRemove={(event) => modifyType(event)} // Function will trigger on remove event
              selectionLimit={1}
              isObject={false}
            />
          </div>

        </div>


        <div className='flex items-center mt-3  gap-x-4'>
        <Label
          name="amount"
          className="rw-label mt-0"
          errorClassName="rw-label mt-0 rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.doctorFee?.amount}
          className="rw-input mt-0"
          errorClassName="rw-input mt-0 rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error mt-0" />
        </div>


        <div className='flex items-center mt-3  gap-x-4'>

          <Label
            className="rw-label mt-0"
          >
            Doctor Name
          </Label>

          <div className=" flex-1">

            <Multiselect
              options={options} // Options to display in the dropdown
              selectedValues={defaultDoctorSelection}
              onSelect={(event) => modifyDoctor(event)} // Function will trigger on select event
              onRemove={(event) => modifyDoctor(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

        </div>

        {/* <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.doctorFee?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DoctorFeeForm
