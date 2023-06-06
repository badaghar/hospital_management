import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link, routes } from '@redwoodjs/router'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { useMutation } from '@redwoodjs/web'
import React from 'react'
import Select from 'react-select'
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
const BedForm = (props) => {

  const [floors,setFloors] = useState([])
  const [defaultFloor,setDefaultFloor] = useState()
  const [floorId,setFloorId] = useState()
  const onSubmit = (data) => {
    data = convertObjectValuesToUpper(data)
    data['occupied'] = false
    data['floorId'] = floorId
    props.onSave(data, props?.bed?.id)
  }


  useEffect(() => {
    const arrFloor = props.floors.map((item) => {
      const obj = { 'label': item.floor_name, 'value': item.id }
      return obj
    })
    // // console.log(arrPat)
    setFloors(arrFloor)
  }, [])

  const changeFloorId = (item) => {
    // // console.log(item)
    setDefaultFloor(item)
    setFloorId(item.value)
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
 <div className='flex items-center mt-3  gap-x-4'>

        <Label
          name="bed_name"
          className="rw-label mt-0"
          errorClassName="rw-label mt-0 rw-label-error"
        >
          Bed name
        </Label>
        <div className=" flex-1">
        <TextField
          name="bed_name"
          defaultValue={props.bed?.bed_name}
          className="rw-input mt-0"
          errorClassName="rw-input mt-0 rw-input-error"
          validation={{ required: true }}
        />
        </div>

        <FieldError name="bed_name" className="rw-field-error mt-0" />

        </div>

        {/* <Label
          name="occupied"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Occupied
        </Label>

        <CheckboxField
          name="occupied"
          defaultChecked={props.bed?.occupied}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="occupied" className="rw-field-error" /> */}
 <div className='flex items-center mt-3  gap-x-4'>
        <Label
          name="floorId"
          className="rw-label mt-0"
          errorClassName="rw-label mt-0 rw-label-error"
        >
          Floor
        </Label>

        {/* <NumberField
          name="floorId"
          defaultValue={props.bed?.floorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}
                 <div className=" flex-1">
            <Select options={floors} onChange={changeFloorId} isClearable={true}
              value={defaultFloor}

            />
            </div>

        <FieldError name="floorId" className="rw-field-error" />
        </div>

        <div className="rw-button-group mt-0">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BedForm
