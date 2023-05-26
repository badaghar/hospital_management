import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import { useState } from 'react'

const ProductForm = (props) => {
  // const [compositionList,setCompositionList] = useState([])
  let compositionList = props?.defaultComposition?.map((item)=>item.id)
  let Manufacturer = props?.defaultManufacturer ? props.defaultManufacturer[0]?.id : 0

  const onSubmit = (data) => {
    data['compositionList'] = compositionList
    data['manufacturerId'] = Manufacturer
    // console.log(data['compositionList'])
    props.onSave(data, props?.product?.id)
  }

  const modifiyComposition = (items) => {
    let cl = []
    for (let i = 0; i < items.length; i++) {
      cl.push(items[i].id)
    }

    compositionList = [...cl]
    console.log(compositionList)
  }
  const modifiyManufacturer = (name) =>{
    if(name.length===0){
      return
    }
    // console.log(name)
    Manufacturer = name[0].id
  }
  // console.log("here")



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
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          className="rw-label"
        >
          Manufacturer Name
        </Label>

        <Multiselect
          options={props.manufacturers} // Options to display in the dropdown
          selectedValues={props?.defaultManufacturer}
          onSelect={(event) => modifiyManufacturer(event)} // Function will trigger on select event
          onRemove={(event) => modifiyManufacturer(event)} // Function will trigger on remove event
          selectionLimit={1}
          displayValue="name" // Property name to display in the dropdown options
        />

        <Label

          className="rw-label mb-2"

        >
          Select Compositions
        </Label>

        <Multiselect
          options={props.compostions} // Options to display in the dropdown
          selectedValues={props?.defaultComposition}
          onSelect={(event) => modifiyComposition(event)} // Function will trigger on select event
          onRemove={(event) => modifiyComposition(event)} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm
