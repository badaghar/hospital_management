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
import { useState,useEffect, useLayoutEffect } from 'react'
import { ReactDialogBox} from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import React from 'react'
import Select from 'react-select'
import ManufacturersList from 'src/components/Manufacturer/Manufacturers/Manufacturers'

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


const CREATE_MANUFACTURER_MUTATION = gql`
  mutation CreateManufacturerMutation($input: CreateManufacturerInput!) {
    createManufacturer(input: $input) {
      id
      name
    }
  }
`

const CREATE_COMPOSITION_MUTATION = gql`
  mutation CreateCompositionMutation($input: CreateCompositionInput!) {
    createComposition(input: $input) {
      id
      name
    }
  }
`

const ProductForm = (props) => {


  // const [compositionList,setCompositionList] = useState([])
  const [compositionList, setCompositionList] = useState([])
  // const [Manufacturer, setManufacturerList] = useState(props?.defaultManufacturer ? { value:props.defaultManufacturer[0]?.id,label:'hello' }: 0)
  const [Manufacturer, setManufacturerList] = useState()
  const [ddefaultComposition,setDefaultComposition] = useState()

  const [manufacturerModelIsOpen, setManufacturerModelIsOpen] = useState(false)
  const [manufacturerName, setManufacturerName] = useState()
  const [compositionIsOpen,setCompositionIsOpen] = useState(false)
  const [compositionName,setCompositionName] = useState()
  const [manufacturerOption,setManufacturerOption] = useState()
  useEffect(()=>{

    const updatedDefaultComposition = [];
    for (let i = 0; i < props.product?.ProductToComposition.length; i++) {
      updatedDefaultComposition.push({
        id: props.product?.ProductToComposition[i].cid.id,
        name: props.product?.ProductToComposition[i].cid.name,
      });
    }
    setCompositionList(updatedDefaultComposition.map((item) =>{
      return item.id
    }))
    setDefaultComposition(updatedDefaultComposition.map((item) =>{
      return {id:item.id,name:item.name}
    }))

    setManufacturerList({value:props.product?.mid.id,label:props.product?.mid.name})
    // setDefaultComposition(updatedDefaultComposition);
    // setDefaultManufacutrer([{id:product.mid.id,name:product.mid.name}])





    const opt = props.manufacturers.map((item)=>{
      return {label:item.name,value:item.id}
    })
    // console.log(props)
    console.log(props.compostions,'hello')
    setManufacturerOption(opt)

  },[])

  const onSubmit = (data) => {

    data['compositionList'] = compositionList
    data['manufacturerId'] = Manufacturer.value
    data = convertObjectValuesToUpper(data)
    // console.log(data['compositionList'])
    props.onSave(data, props?.product?.id)
  }

  const modifiyComposition = (items) => {
    let cl = []
    for (let i = 0; i < items.length; i++) {
      cl.push(items[i].id)
    }

    // compositionList = [...cl]
    // console.log(compositionList)
    setCompositionList(cl)
  }
  const modifiyManufacturer = (name) => {
    if (name.length === 0) {
      return
    }
    setManufacturerList(name)
    // console.log(name)
    // Manufacturer = name[0].id
    // setManufacturerList(name[0].id)
  }
  // console.log("here")

  const openManufacturerModal = () => {
    setManufacturerModelIsOpen(true)
  }

  const openCompositionModal = () => {
    setCompositionIsOpen(true)
  }

  const [createManufacturer, { loading, error }] = useMutation(
    CREATE_MANUFACTURER_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createManufacturer.name
        const id = data.createManufacturer.id
        const value = { value:id, label:name }
        toast.success('Manufacturer created')
        console.log(data.createManufacturer)
        setManufacturerList(value)
        setManufacturerModelIsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [createComposition, { loading1, error1 }] = useMutation(
    CREATE_COMPOSITION_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Composition created')
        const name = data.createComposition.name
        const id = data.createComposition.id
        const value = { id, name }
        setCompositionName(value)
        setCompositionIsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )


  const addManufacturer = (input) => {
    input = convertObjectValuesToUpper(input)
    createManufacturer({ variables: { input } })
  }
  const addComposition = (input) => {
    input = convertObjectValuesToUpper(input)
    createComposition({ variables: { input } })
  }



  return (
    <div className="rw-form-wrapper">

      {
        manufacturerModelIsOpen && (
          <>
            <ReactDialogBox
              closeBox={setManufacturerModelIsOpen.bind(this, false)}
              modalWidth='50%'
              headerBackgroundColor='#000000'
              headerTextColor='white'
              headerHeight='60px'
              closeButtonColor='white'
              bodyBackgroundColor='#2c2c2c'
              bodyTextColor='white'
              bodyHeight='200px'

              headerText={<span className="flex items-end h-14 text-xl">Add Manufacturer Details</span>}

            >


              <Form onSubmit={addManufacturer} error={props.error}>
                <FormError
                  error={props.error}
                  wrapperClassName="rw-form-error-wrapper"
                  titleClassName="rw-form-error-title"
                  listClassName="rw-form-error-list"
                />

                <Label
                  name="name"
                  className="rw-label mt-0"
                  errorClassName="rw-label mt-0 rw-label-error"
                >
                  Name
                </Label>

                <TextField
                  name="name"
                  defaultValue={props.manufacturer?.name}
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  placeholder='Enter Manufacturer Name'
                  validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />

                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">
                    Save
                  </Submit>
                </div>
              </Form>

            </ReactDialogBox>
          </>
        )




      }


      {
        compositionIsOpen && (
          <>
            <ReactDialogBox
              closeBox={setCompositionIsOpen.bind(this, false)}
              modalWidth='50%'
              headerBackgroundColor='#000000'
              headerTextColor='white'
              headerHeight='60px'
              closeButtonColor='white'
              bodyBackgroundColor='#2c2c2c'
              bodyTextColor='white'
              bodyHeight='200px'

              headerText={<span className="flex items-end h-14 text-xl">Add Composition Details</span>}

            >

<Form onSubmit={addComposition} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label mt-0"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.composition?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit  className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>


            </ReactDialogBox>
          </>)

        }
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

        <div className='flex items-center mt-3  gap-x-4'>

          <Label
            className="rw-label mt-0"
          >
            Manufacturer Name
          </Label>

          <div className=" flex-1">

            {/* <Multiselect
              options={ma} // Options to display in the dropdown
              selectedValues={props?.defaultManufacturer || manufacturerName ? [manufacturerName] : []}
              onSelect={(event) => modifiyManufacturer(event)} // Function will trigger on select event
              onRemove={(event) => modifiyManufacturer(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
            /> */}
             <Select options={manufacturerOption} onChange={modifiyManufacturer} isClearable={true} value={Manufacturer}
            />


          </div>

          <div>
            <div onClick={openManufacturerModal} className="rw-button mt-0 rw-button-green">
              <div className="rw-button-icon">+</div> {"New Manufacturer"}
            </div>
          </div>
        </div>
        <Label

          className="rw-label mb-2"

        >
          Select Compositions
        </Label>

        <Multiselect
          options={props.compostions} // Options to display in the dropdown
          selectedValues={ddefaultComposition}
          onSelect={(event) => modifiyComposition(event)} // Function will trigger on select event
          onRemove={(event) => modifiyComposition(event)} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />

<div>
            <div onClick={openCompositionModal} className="rw-button mt-0 rw-button-green">
              <div className="rw-button-icon">+</div> {"New Composition"}
            </div>
          </div>

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
