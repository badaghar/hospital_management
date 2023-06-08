import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  TextAreaField,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import NewPurchaseMedicineTable from '../NewPurchaseMedicineTable/NewPurchaseMedicineTable'
import { useEffect, useState } from 'react'
// import { db } from 'src/lib/db'
import React from 'react'
import Select from 'react-select'
import { toast } from '@redwoodjs/web/dist/toast'
// import
// import { useQuery } from '@redwoodjs/web'
// import { gql } from 'graphql-tag'

// const GET_INVOICE_BILL = gql`
//   query checkInvoiceNumber($invoiceNo: String!) {
//     checkInvoiceNumber(invoiceNo: $invoiceNo) {
//       id
//     }
//   }
// `


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PurchaseMedicineForm = (props) => {

  const [no_of_medicine, setNoOfMedicine] = useState(0)
  const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  const [manufacturersList, setManufacturerList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [productList, setProductList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_amount_list, set_total_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_dis_amount_list, set_total_dis_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_sgst_amount_list, set_total_sgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_cgst_amount_list, set_total_cgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [medicineObj, setmedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [permedicineObj, setPermedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const [total_amount, set_total_amount] = useState(0)
  const [total_dis_amount, set_total_dis_amount] = useState(0)
  const [total_sgst_amount, set_total_sgst_amount] = useState(0)
  const [total_cgst_amount, set_total_cgst_amount] = useState(0)
  const [grand_total, set_grand_total] = useState(0)

  const [Distributers, setDistributers] = useState(0)
  const [selectDistributer,setSelectDistributer] = useState()

  const [manufacturers,setManufacturers] = useState([])
  const [product,setProduct] = useState([])

  useEffect(()=>{
    const opt =props.distributers.map((item)=>{
      return {label:item.name,value:item.id}
    })
    setSelectDistributer(opt)
    const opt2 = props.manufacturers.map((item)=>{
      return  {label:item.name,value:item.id,name:item.name,id:item.id}
    })
    setManufacturers(opt2)
    const opt3 = props.products.map((item)=>{
      return  {label:item.name,value:item.id,name:item.name,id:item.id}
    })
    setProduct(opt3)

  },[])



  const modifiyDistributer = (name) => {
    if (name.length === 0) {
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    setDistributers(name.value)
  }
  const onSubmit = (data) => {
    data['DistributerId'] = Distributers
    console.log("here")

    // console.log(medicineObj)
    const newmedicine = medicineObj.filter((val) => {
      return val !== 0
    })

    const newperMedicine = permedicineObj.filter((val) => {
      return val !== 0
    })
    let input = {}
    input = {
      'invoiceNo': data['invoiceNo'],

      'distributerId': Distributers,
      'date': data['date'],
      'medicine': newmedicine,
      'total': total_amount,
      'discount': total_dis_amount,
      'sgst': total_sgst_amount,
      'cgst': total_cgst_amount,
      'grand_total': grand_total,
      'permedicine': newperMedicine
    }

    // medInput = newperMedicine

    console.log(input)

    props.onSave(input, props?.purchaseMedicine?.id)

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

  const ShowHeadMedicine = () => {
    if (show_medicine_heading) {
      return <MedicineTableHeading />
    } else {
      return <></>
    }
  }
  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
  }, [productList, manufacturersList])
  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
    let tamt = 0
    let damt = 0
    let sgstamt = 0
    let cgstamt = 0
    for (let i = 0; i < no_of_medicine; i++) {
      tamt += total_amount_list[i]
      damt += total_dis_amount_list[i]
      sgstamt += total_sgst_amount_list[i]
      cgstamt += total_cgst_amount_list[i]
    }

    set_grand_total(Math.round(tamt + sgstamt + cgstamt - damt))
    set_total_amount(tamt)
    set_total_dis_amount(damt)
    set_total_sgst_amount(sgstamt)
    set_total_cgst_amount(cgstamt)
  }, [total_amount_list, total_dis_amount_list, total_cgst_amount_list, total_sgst_amount_list])

  var medicineRows = []
  for (var i = 0; i < no_of_medicine; i++) {
    medicineRows.push(<NewPurchaseMedicineTable key={'purchase_' + i} value={i}
      manufacturers={manufacturers} manufacturersList={manufacturersList} products={product} productList={productList}
      setManufacturerList={setManufacturerList} setProductList={setProductList}
      set_total_amount_list={set_total_amount_list}
      set_total_dis_amount_list={set_total_dis_amount_list}
      set_total_sgst_amount_list={set_total_sgst_amount_list}
      set_total_cgst_amount_list={set_total_cgst_amount_list}
      setmedicineObj={setmedicineObj}
      setPermedicineObj={setPermedicineObj}

    />)
  }

  // const { data, error, loading } = useQuery(GET_INVOICE_BILL, {
  //   variables: { invoiceNo:  },
  // })

  const chequeInvoiceNo = async (val) =>{
    console.log(val.target.value)

    const data = props.purchaseMedicines.find((item)=> item.invoiceNo==val.target.value)
    console.log(data)
    if(data!=undefined)
    {
      toast.error("Purchase Bill Added Already")

    }
    else{
    }
    // const { data, error, loading } = useQuery(GET_INVOICE_BILL, {
    //   variables: { invoiceNo: val.target.value },
    // })
    // const data = await getBill(val.target.value)
    // if(data.length)
    // {
    //   toast.error("Purchase Bill Already")

    // }

  }

  return (
    <div className="rw-form-wrapper text-xs">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className='flex items-center mt-3  gap-x-4'>
          <Label
            name="invoiceNo"
            className="rw-label mt-0"
            errorClassName="rw-label mt-0 rw-label-error"
          >
            Invoice no
          </Label>
          <div className="flex">
            <TextField
              name="invoiceNo"
              defaultValue={props.purchaseMedicine?.invoiceNo}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              validation={{ required: true }}
              onBlur={chequeInvoiceNo}
            />
          </div>
          <FieldError name="invoiceNo" className="rw-field-error" />
          <Label
            className="rw-label mt-0"
          >
            Distributer Name
          </Label>
          <div className="flex-1">
            {/* <Multiselect
              options={props.distributers} // Options to display in the dropdown
              // selectedValues={props?.defaultDistributer}
              onSelect={(event) => modifiyDistributer(event)} // Function will trigger on select event
              onRemove={(event) => modifiyDistributer(event)} // Function will trigger on remove event
              selectionLimit={1}
              displayValue="name" // Property name to display in the dropdown options
            /> */}
                  <Select options={selectDistributer} onChange={modifiyDistributer} isClearable={true}


            />
          </div>
          <Label
            name="date"
            className="rw-label mt-0"
            errorClassName="rw-label mt-0 rw-label-error"
          >
            Date
          </Label>
          <div className="flex">
            <DateField
              name="date"
              defaultValue={formatDatetime(props.purchaseMedicine?.date)}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              validation={{ required: true }}
            />
          </div>
          <FieldError name="date" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3  gap-x-4'>

          <Label
            name="no_of_medicine"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error mt-0"
          >
            No Of Medicine
          </Label>
          <div className="flex">

            <NumberField
              name="no_of_medicine"
              className="rw-input mt-0"
              errorClassName="rw-input rw-input-error mt-0"
              validation={{ required: true }}
              onChange={updateMedicineTable}
            />
          </div>

          <FieldError name="no_of_medicine" className="rw-field-error" />

        </div>
        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-18 grid-flow-row gap-x-2 gap-y-2">

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
              defaultValue={props.purchaseMedicine?.total}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              disabled={true}
              value={total_amount}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="total" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="discount"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Discount
          </Label>
          <div className="flex">
            <TextField
              name="discount"
              defaultValue={props.purchaseMedicine?.discount}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              disabled={true}
              value={total_dis_amount}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="discount" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="sgst"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Sgst
          </Label>
          <div className="flex">
            <TextField
              name="sgst"
              defaultValue={props.purchaseMedicine?.sgst}
              className="rw-input mt-0"
              errorClassName="rw-input mt-0 rw-input-error"
              disabled={true}
              value={total_sgst_amount}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="sgst" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="cgst"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Cgst
          </Label>
          <div className="flex">
            <TextField
              name="cgst"
              defaultValue={props.purchaseMedicine?.cgst}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              disabled={true}
              value={total_cgst_amount}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="cgst" className="rw-field-error" />
        </div>

        <div className='flex items-center mt-3 justify-end gap-x-4'>
          <Label
            name="grand_total"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Grand total
          </Label>
          <div className="flex">
            <TextField
              name="grand_total"
              defaultValue={props.purchaseMedicine?.grand_total}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              disabled={true}
              value={grand_total}
            // validation={{ valueAsNumber: true, required: true }}
            />
          </div>
          <FieldError name="grand_total" className="rw-field-error" />
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

function MedicineTableHeading() {
  return (
    <>

      <div className="flex col-span-3 justify-center">Mfr</div>
      <div className="flex col-span-3 justify-center">Product Name</div>
      <div className="flex col-span-1 justify-center">Batch</div>
      <div className="flex col-span-1 justify-center">Paid Qty</div>
      <div className="flex col-span-1 justify-center">Free Qty</div>
      <div className="flex col-span-1 justify-center">Pack</div>
      <div className="flex col-span-1 justify-center">Exp</div>
      <div className="flex col-span-1 justify-center">M.R.P</div>
      <div className="flex col-span-1 justify-center">Rate</div>
      <div className="flex col-span-1 justify-center">Dis</div>
      <div className="flex col-span-1 justify-center">SGST</div>
      <div className="flex col-span-1 justify-center">CGST</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Net Amount</div>
    </>
  )
}

export default PurchaseMedicineForm
