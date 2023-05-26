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


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PurchaseMedicineForm = (props) => {

  const [no_of_medicine, setNoOfMedicine] = useState(0)
  const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  const [manufacturersList,setManufacturerList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [productList,setProductList] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [total_amount_list,set_total_amount_list] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [total_dis_amount_list,set_total_dis_amount_list] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [total_sgst_amount_list,set_total_sgst_amount_list] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [total_cgst_amount_list,set_total_cgst_amount_list] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [medicineObj,setmedicineObj] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [permedicineObj,setPermedicineObj] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

  const [total_amount,set_total_amount]= useState(0)
  const [total_dis_amount,set_total_dis_amount]= useState(0)
  const [total_sgst_amount,set_total_sgst_amount]= useState(0)
  const [total_cgst_amount,set_total_cgst_amount]= useState(0)
  const [grand_total,set_grand_total] = useState(0)

  const [Distributers,setDistributers] = useState(0)

  const modifiyDistributer = (name) =>{
    if(name.length===0){
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    setDistributers(name[0].id)
  }
  const onSubmit = (data) => {
    data['DistributerId'] = Distributers
    console.log("here")

    // console.log(medicineObj)
    const newmedicine = medicineObj.filter((val)=>{
      return val!==0
    })

    const newperMedicine = permedicineObj.filter((val)=>{
      return val!==0
    })
    let input = {}
    input = {
      'invoiceNo':data['invoiceNo'],

      'distributerId':Distributers,
      'date':data['date'],
      'medicine':newmedicine,
      'total':total_amount,
      'discount':total_dis_amount,
      'sgst':total_sgst_amount,
      'cgst':total_cgst_amount,
      'grand_total':grand_total,
      'permedicine':newperMedicine
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
  useEffect(()=>{
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
  },[productList,manufacturersList])
  useEffect(()=>{
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
    let tamt = 0
    let damt = 0
    let sgstamt =0
    let cgstamt = 0
    for(let i=0;i<no_of_medicine;i++)
    {
      tamt += total_amount_list[i]
      damt += total_dis_amount_list[i]
      sgstamt += total_sgst_amount_list[i]
      cgstamt += total_cgst_amount_list[i]
    }

    set_grand_total(tamt+sgstamt+cgstamt-damt)
    set_total_amount(tamt)
    set_total_dis_amount(damt)
    set_total_sgst_amount(sgstamt)
    set_total_cgst_amount(cgstamt)
  },[total_amount_list,total_dis_amount_list,total_cgst_amount_list,total_sgst_amount_list])

  var medicineRows = []
  for (var i = 0; i < no_of_medicine; i++) {
    medicineRows.push(<NewPurchaseMedicineTable key={'grade_' + i} value={i}
    manufacturers={props.manufacturers} manufacturersList={manufacturersList} products={props.products} productList={productList}
     setManufacturerList={setManufacturerList} setProductList={setProductList}
    set_total_amount_list={set_total_amount_list}
    set_total_dis_amount_list={set_total_dis_amount_list}
    set_total_sgst_amount_list={set_total_sgst_amount_list}
    set_total_cgst_amount_list={set_total_cgst_amount_list}
    setmedicineObj={setmedicineObj}
    setPermedicineObj={setPermedicineObj}

    />)
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

        <Label
          name="invoiceNo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Invoice no
        </Label>

        <TextField
          name="invoiceNo"
          defaultValue={props.purchaseMedicine?.invoiceNo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="invoiceNo" className="rw-field-error" />

        <Label
          className="rw-label"
        >
          Distributer Name
        </Label>

        <Multiselect
          options={props.distributers} // Options to display in the dropdown
          // selectedValues={props?.defaultDistributer}
          onSelect={(event) => modifiyDistributer(event)} // Function will trigger on select event
          onRemove={(event) => modifiyDistributer(event)} // Function will trigger on remove event
          selectionLimit={1}
          displayValue="name" // Property name to display in the dropdown options
        />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DateField
          name="date"
          defaultValue={formatDatetime(props.purchaseMedicine?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="no_of_medicine"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          No Of Medicine
        </Label>

        <NumberField
          name="no_of_medicine"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          onChange={updateMedicineTable}
        />

        <FieldError name="no_of_medicine" className="rw-field-error" />


        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-18 grid-flow-row gap-x-2 gap-y-2">

            {ShowHeadMedicine()}

            {medicineRows}
          </div>
        </div>

        {/* <Label
          name="medicine"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Medicine
        </Label>

        <TextAreaField
          name="medicine"
          defaultValue={JSON.stringify(props.purchaseMedicine?.medicine)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="medicine" className="rw-field-error" /> */}

        <Label
          name="total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total
        </Label>

        <TextField
          name="total"
          defaultValue={props.purchaseMedicine?.total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}
          value={total_amount}
          // validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="total" className="rw-field-error" />

        <Label
          name="discount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Discount
        </Label>

        <TextField
          name="discount"
          defaultValue={props.purchaseMedicine?.discount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}
          value={total_dis_amount}
          // validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="discount" className="rw-field-error" />

        <Label
          name="sgst"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sgst
        </Label>

        <TextField
          name="sgst"
          defaultValue={props.purchaseMedicine?.sgst}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}
          value={total_sgst_amount}
          // validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="sgst" className="rw-field-error" />

        <Label
          name="cgst"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cgst
        </Label>

        <TextField
          name="cgst"
          defaultValue={props.purchaseMedicine?.cgst}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}
          value={total_cgst_amount}
          // validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="cgst" className="rw-field-error" />

        <Label
          name="grand_total"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Grand total
        </Label>

        <TextField
          name="grand_total"
          defaultValue={props.purchaseMedicine?.grand_total}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          disabled={true}
          value={grand_total}
          // validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="grand_total" className="rw-field-error" />

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
