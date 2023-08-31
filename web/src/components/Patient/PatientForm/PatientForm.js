import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react';
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
const PatientForm = (props) => {

  const [gender, setGender] = useState('Male');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const onSubmit = (data) => {
    data['gender'] = gender
    data = convertObjectValuesToUpper(data)
    props.onSave(data, props?.patient?.id)
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

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.patient?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="age"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Age
        </Label>

        <NumberField
          name="age"
          defaultValue={props.patient?.age}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="age" className="rw-field-error" />

        <Label
          name="phone_no"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone no
        </Label>

        <TextField
          name="phone_no"
          defaultValue={props.patient?.phone_no}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="phone_no" className="rw-field-error" />

        {/* <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>

        <TextField
          name="gender"
          defaultValue={props.patient?.gender}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="gender" className="rw-field-error" /> */}
        <div className="flex  items-center  space-x-3 ">
          <h1 className="text-xl font-bold ">Gender Selection</h1>
          <div className="text-lg ">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Male"
                checked={gender === 'Male'}
                onChange={handleGenderChange}
                className="form-radio mr-2"
              />
              Male
            </label>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                value="Female"
                checked={gender === 'Female'}
                onChange={handleGenderChange}
                className="form-radio mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.patient?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="address" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PatientForm
