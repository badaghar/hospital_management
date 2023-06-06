import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  TextAreaField,
  NumberField,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import NewSaleMedicineTable from '../NewSaleMedicineTable/NewSaleMedicineTable'
import { toast } from '@redwoodjs/web/toast'
import React from 'react'
import Select from 'react-select'

import { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link, routes } from '@redwoodjs/router'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { useMutation } from '@redwoodjs/web'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatientMutation($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      name
    }
  }
`

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

const SaleMedicineForm = (props) => {

  const [isOpen, setIsOpen] = useState(false)

  const [no_of_medicine, setNoOfMedicine] = useState(0)
  const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  const [productList, setProductList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_amount_list, set_total_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_sgst_amount_list, set_total_sgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_cgst_amount_list, set_total_cgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [medicineObj, setmedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [permedicineObj, setPermedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const [total_amount, set_total_amount] = useState(0)
  // const [total_dis_amount, set_total_dis_amount] = useState(0)
  const [total_sgst_amount, set_total_sgst_amount] = useState(0)
  const [total_cgst_amount, set_total_cgst_amount] = useState(0)
  const [grand_total, set_grand_total] = useState(0)
  const [actual_grand_total, set_actual_grand_total] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountamt, setDiscountAmt] = useState(0)
  const [patientId, setPatientId] = useState(0)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [defaultDate, setDefaultDate] = useState(formatDate(new Date()));
  const [selectName,setSelectName] = useState()

  const [medicine,setmedicine] = useState([])
  const [product,setProduct] = useState([])
  const [patient, setPatient] = useState([])
  const [defaultPatient, setDefaultPatient] = useState()


  useEffect(()=>{
    // const opt =props.distributers.map((item)=>{
    //   return {label:item.name,value:item.id}
    // })
    // setSelectDistributer(opt)
    const opt2 = props.medicines.map((item)=>{
      return  {label:item.pid.name,value:item.id,name:item.pid.name,id:item.id,data:item}
    })
    setmedicine(opt2)
    // const opt3 = props.products.map((item)=>{
    //   return  {label:item.name,value:item.id,name:item.name,id:item.id}
    // })
    // setProduct(opt2)
    const arrPat = props.patients.map((item) => {
      const obj = { 'label': item.name, 'value': item.id }
      return obj
    })
    // // console.log(arrPat)
    setPatient(arrPat)

  },[])


  const onSubmit = (data) => {
    const newmedicine = medicineObj.filter((val) => {
      return val['medicine Name']
    })
    const newperMedicine = permedicineObj.filter((val) => {
      return val['quantity']
    })
    let input = {}
    input = {
      // 'billNo': data['billNo'],
      'date': data['date'],
      'medicine': newmedicine,
      'total': parseFloat(total_amount.toFixed(2)),
      'discount': parseFloat(discountamt.toFixed(2)),
      'sgst': parseFloat(total_sgst_amount.toFixed(2)),
      'cgst': parseFloat(total_cgst_amount.toFixed(2)),
      'grand_total': parseFloat(actual_grand_total),
      'patientId': patientId,
      'permedicine': newperMedicine,
      'doctor_name':'rahul'
    }
    console.log(input)
    props.onSave(input, props?.saleMedicine?.id)

  }

  const updateMedicineTable = (e) => {
    console.log(e.target.value)
    const val = e.target.value
    if (val == '') {
      setNoOfMedicine(0)
      setShowMedicineHeading(false)
    } else {
      setNoOfMedicine(val)
      setShowMedicineHeading(true)
    }
  }

  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
    let tamt = 0
    let sgstamt = 0
    let cgstamt = 0
    // console.log(total_amount_list,total_sgst_amount_list,total_cgst_amount_list)
    for (let i = 0; i < no_of_medicine; i++) {
      tamt += total_amount_list[i]

      sgstamt += total_sgst_amount_list[i]
      cgstamt += total_cgst_amount_list[i]
    }

    set_grand_total(Math.round(tamt + sgstamt + cgstamt))
    set_total_amount(tamt)
    set_total_sgst_amount(sgstamt)
    set_total_cgst_amount(cgstamt)
    set_actual_grand_total(parseFloat(Math.round(tamt + sgstamt + cgstamt)).toFixed(2))
  }, [total_amount_list, total_cgst_amount_list, total_sgst_amount_list])

  useEffect(() => {
    let dis = grand_total * parseFloat(discount) / 100.0
    setDiscountAmt(dis)
    // set_grand_total(grand_total-dis)
    // console.log("here")
    set_actual_grand_total(parseFloat(grand_total - dis).toFixed(2))
  }, [discount])


  const ShowHeadMedicine = () => {
    if (show_medicine_heading) {
      return <MedicineTableHeading />
    } else {
      return <></>
    }
  }

  var medicineRows = []
  for (var i = 0; i < no_of_medicine; i++) {
    medicineRows.push(<NewSaleMedicineTable key={'sale_' + i} value={i}
      patients={props.patients} productList={productList}
      setProductList={setProductList}
      set_total_amount_list={set_total_amount_list}
      set_total_sgst_amount_list={set_total_sgst_amount_list}
      set_total_cgst_amount_list={set_total_cgst_amount_list}
      setmedicineObj={setmedicineObj}
      setPermedicineObj={setPermedicineObj}
      medicines={medicine}

    />)
  }

  const changePatienId = (item) => {
    // // console.log(item)
    setDefaultPatient(item)
    setPatientId(item.value)
  }

  // const modifyPatient = (name) => {
  //   if (name.length === 0) {
  //     return
  //   }
  //   setPatientId(name[0].id)
  //   // // console.log(name)
  //   // Manufacturer = name[0].id
  // }

  const openModal = () =>{
    setIsOpen(true)



  }

  const [createPatient, { loading, error }] = useMutation(
    CREATE_PATIENT_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createPatient.name
        const id = data.createPatient.id
        toast.success('Patient Added ')
        const value = {id,name}
        setPatient((item) => [...item, value])
        setDefaultPatient(value)

        setSelectName(value)
        setIsOpen(false)

      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const addPatient = (input) => {
    input = convertObjectValuesToUpper(input)
    createPatient({ variables: { input } })
  }

  return (



    <div className="rw-form-wrapper">

      {isOpen && (
        <>
          <ReactDialogBox
            closeBox={() => {
              setIsOpen(false)
            }}
            modalWidth="50%"
            headerBackgroundColor="#2c2c2c"
            headerTextColor="white"
            headerHeight="60px"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="200px"
            headerText={<span className="flex items-end h-14 text-xl">Add Patient Details</span>}
          >
            <Form
              onSubmit={addPatient}
            >

              <div className="grid grid-cols-4 space-y-3">

                <div className='col-span-4 flex items-center space-x-3'>
              <Label
          name="name"
          className="rw-label  mt-0"
          errorClassName="rw-label rw-label-error mt-0"
          >
          Name
        </Label>

        <TextField
          name="name"

          className="rw-input mt-0"
          errorClassName="rw-input rw-input-error mt-0"
          validation={{ required: true }}
          />

        <FieldError name="name" className="rw-field-error mt-0" />
          </div>


<div className='col-span-2 flex items-center space-x-3'>


        <Label
          name="age"
          className="rw-label mt-0"
          errorClassName="rw-label rw-label-error mt-0"
        >
          Age
        </Label>

        <NumberField
          name="age"

          className="rw-input mt-0"
          errorClassName="rw-input rw-input-error mt-0"
          validation={{ required: true }}
        />

        <FieldError name="age" className="rw-field-error mt-0" />
        </div>


<div className='col-span-2 flex items-center space-x-3 pl-4'>

        <Label
          name="phone_no"
          className="rw-label mt-0 "
          errorClassName="rw-label rw-label-error mt-0"
        >
          Phone
        </Label>

        <TextField
          name="phone_no"

          className="rw-input mt-0"
          errorClassName="rw-input rw-input-error mt-0"
        />
        </div>

        <FieldError name="phone_no" className="rw-field-error mt-0" />
              </div>


              <div className="rw-button-group">
                <Submit className="rw-button bg-gray-800 text-white">
                  Add Patient
                </Submit>
              </div>
            </Form>
          </ReactDialogBox>
        </>
      )}
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />


        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="date"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Date
          </Label>
          <div className="flex">
            <DateField
              name="date"
              // defaultValue={formatDatetime(props.saleMedicine?.date)}
              className="rw-input mt-0"
              defaultValue={defaultDate}

              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
          </div>

          <FieldError name="date" className="rw-field-error" />


          <Label
            name="patientId"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Patient id
          </Label>

          <div className=" flex-1">
            {/* <Multiselect
              className="rw-input mt-0 selectname"
              name={"patientId"}
              options={props.patients} // Options to display in the dropdown
              onSelect={(event) => modifyPatient(event)} // Function will trigger on select event
              onRemove={(event) => modifyPatient(event)} // Function will trigger on remove event
              selectionLimit={1}
              // value={selectName}
              // selectedValues={selectName}
              selectedValues={selectName ? [selectName] : []}

              displayValue={'name'}// Property name to display in the dropdown options
            /> */}
                   <Select options={patient} onChange={changePatienId} isClearable={true}
              value={defaultPatient}

            />
          <FieldError name="patientId" className="rw-field-error" />

          </div>




          <div>
            <div onClick={openModal} className="rw-button rw-button-green">
              <div className="rw-button-icon">+</div> {"New Patient"}
            </div>
          </div>

        </div>


        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="no_of_medicine"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            No Of Medicine
          </Label>


          <div className=" flex">
            <NumberField
              name="no_of_medicine"
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
              onChange={updateMedicineTable}
            />
          </div>

          <FieldError name="no_of_medicine" className="rw-field-error" />
        </div>
        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-12 grid-flow-row gap-x-2 gap-y-2">

            {ShowHeadMedicine()}

            {medicineRows}
          </div>
        </div>



        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Total
          </Label>
          <div className="flex">
            <TextField
              name="total"
              defaultValue={props.saleMedicine?.total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={parseFloat(total_amount.toFixed(2))}
            />
          </div>
          <FieldError name="total" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <Label
            name="discount"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount % :-
          </Label>

          <div className='flex'>


            <TextField
              name="discount"
              defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>

          <FieldError name="discount" className="rw-field-error" />
          <Label
            name="discountamt"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Discount Amount :-
          </Label>

          <div className='flex'>


            <TextField
              name="discountamt"
              defaultValue={props.saleMedicine?.discount}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              value={parseFloat(discountamt.toFixed(2))}
              disabled={true}
            // value=
            />
          </div>

          <FieldError name="discountamt" className="rw-field-error" />
        </div>


        <div className='flex items-center mt-3 justify-end gap-x-4'>


          <Label
            name="sgst"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Sgst
          </Label>

          <div className="flex">



            <TextField
              name="sgst"
              defaultValue={props.saleMedicine?.sgst}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={parseFloat(total_sgst_amount.toFixed(2))}
            />
          </div>

          <FieldError name="sgst" className="rw-field-error" />

        </div>



        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="cgst"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Cgst
          </Label>
          <div className="flex">
            <TextField
              name="cgst"
              defaultValue={props.saleMedicine?.cgst}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={parseFloat(total_cgst_amount.toFixed(2))}
            />
          </div>

          <FieldError name="cgst" className="rw-field-error" />
        </div>



        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="grand_total"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Grand total
          </Label>
          <div className="flex">
            <TextField
              name="grand_total"
              defaultValue={props.saleMedicine?.grand_total}
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error"
              // validation={{ valueAsNumber: true, required: true }}
              disabled={true}
              value={actual_grand_total}
            />
          </div>
          <FieldError name="grand_total" className="rw-field-error" />
        </div>


        <div className="rw-button-group">


          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>

          {/* <button className="rw-button rw-button-blue" >
            Save And Print

          </button> */}
        </div>
      </Form>
    </div>
  )
}

function MedicineTableHeading() {
  return (
    <>

      <div className="flex col-span-4 justify-center">Medicine Name</div>
      <div className="flex col-span-3 justify-center">Batch No</div>
      <div className="flex col-span-1 justify-center">Expiry Date</div>
      <div className="flex col-span-1 justify-center">M.R.P</div>
      <div className="flex col-span-1 justify-center">Quantity</div>
      <div className="flex col-span-1 justify-center">CGST/SGST</div>
      <div className="flex col-span-1 justify-center">Amount</div>
    </>
  )
}

export default SaleMedicineForm
