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

import { MdDeleteForever } from 'react-icons/md'
import {
  useEffect, useState, useLayoutEffect
} from 'react'
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



const SaleMedicineNewForm = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [defaultPatient, setDefaultPatient] = useState()
  const [defaultDoctor, setDefaultDoctor] = useState()
  const [patientId, setPatientId] = useState(0)

  const [total_amount, set_total_amount] = useState(0)
  // const [total_dis_amount, set_total_dis_amount] = useState(0)
  const [total_sgst_amount, set_total_sgst_amount] = useState(0)
  const [total_cgst_amount, set_total_cgst_amount] = useState(0)
  const [grand_total, set_grand_total] = useState(0)
  const [actual_grand_total, set_actual_grand_total] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountamt, setDiscountAmt] = useState(0)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [defaultDate, setDefaultDate] = useState(formatDate(new Date()));
  const [doctors, setDoctors] = useState([])
  const [doctorName, setDoctorName] = useState()
  const [compositionToProductLsit, setCompositionToProductLsit] = useState([])
  const [gender, setGender] = useState('Male');
  const [medicine, setmedicine] = useState([])
  const [patient, setPatient] = useState([])

  const [medicineArray, setMedicineArray] = useState([])
  const [perMedicineArray, setPerMedicineArray] = useState([])
  const [homoMedicineArray, setHomoMedicineArray] = useState([])

  useEffect(() => {

    if (props.details) {
      console.log(props.details)
      let obj = { 'label': props.details.patient.name, 'value': props.details.patient.id }
      let obj2 = { 'label': props.details.consultant_doctor.split('----')[0], 'value': props.details.consultant_doctor.split('----')[0] }
      setDefaultPatient(obj)
      setDefaultDoctor(obj2)
      setDoctorName(props.details.consultant_doctor.split('----')[0])
      setPatientId(props.details.patient.id)
      // setMedicineArray((item) => [...item, { 'medicine Name': '', 'batch No': '', 'Expiry Date': '', 'mrp': '', 'quantity': '', 'cgst/sgst': '', 'amount': 0 ,'tax':0,'amountWtax':0,'productId':0,'maxQty':0}])
      let obj3 = props.details.IpdPrescription.map((item) => {
        let med = item.medicine_detail
        let total_amount = parseFloat(med.mrp) * parseInt(item.quantity)
        let ob = { 'medicine Name': med.pid.name, 'batch No': med.batch + " - " + med.quantity, 'Expiry Date': med.exp.toString().split('-')[0] + '-' + med.exp.toString().split('-')[1], 'mrp': med.mrp, 'quantity': item.quantity, 'cgst/sgst': 0, 'amount': total_amount, 'tax': 0, 'amountWtax': total_amount, 'productId': med.pid.id, 'maxQty': med.quantity, 'batch': med.batch }
        return ob

      })
      console.log(obj3)
      let obj4 = props.details.IpdHomoPrescription.map((item) => {
        let ob = { 'medicine Name': item.medicine, 'amount': item.rate }
        return ob
      })
      setMedicineArray(obj3)
      setHomoMedicineArray(obj4)

    }
  }, [props.details])

  useEffect(() => {
    // const opt =props.distributers.map((item)=>{
    //   return {label:item.name,value:item.id}
    // })
    // setSelectDistributer(opt)
    const opt2 = props.medicines.map((item) => {
      return { label: item.pid.name, value: item.id, name: item.pid.name, id: item.id, data: item }
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

    const arrDoc = props.users.filter((item) => item.roles == 'doctor').map((item) => {
      const obj = { 'label': item.name, 'value': item.name }
      return obj
    })

    // console.log(arrDoc)
    setDoctors(arrDoc)

  }, [])

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };


  const changePatienId = (item) => {
    // // console.log(item)
    setDefaultPatient(item)
    setPatientId(item.value)
  }

  const changeDoctorName = (item) => {
    setDoctorName(item.value)
    setDefaultDoctor(item)
  }

  const openModal = () => {
    setIsOpen(true)



  }

  const [createPatient, { loading, error }] = useMutation(
    CREATE_PATIENT_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createPatient.name
        const id = data.createPatient.id
        toast.success('Patient Added ')
        const value = { value: id, label: name }
        setPatient((item) => [...item, value])
        setDefaultPatient(value)
        setPatientId(id)

        // setSelectName(value)
        setIsOpen(false)

      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const addPatient = (input) => {
    input['gender'] = gender
    input = convertObjectValuesToUpper(input)
    createPatient({ variables: { input } })
  }

  const onSubmit = (data) => {
    const seen = {};

    for (let i = 0; i < medicineArray.length; i++) {
      const { productId, 'batch No': batch } = medicineArray[i];
      if (!productId || !batch) {
        continue
      }

      const key = `${productId}-${batch}`;
      console.log(key)

      if (seen[key]) {
        console.log(`Duplicate found for productId: ${productId} and batch: ${batch}`);
        toast.error(`Duplicate found for batch: ${batch}`)
        return
        // You can customize the message or perform any other action here
      } else {
        seen[key] = true;
      }
    }
    // setMedicineArray((item) => [...item, { 'medicine Name': '', 'batch No': '', 'Expiry Date': '', 'mrp': '', 'quantity': '', 'cgst/sgst': '', 'amount': 0 ,'tax':0,'amountWtax':0,'productId':0,'maxQty':0}])

    let newmedicine = medicineArray.map((item) => {
      let obj = {
        'medicine Name': item['medicine Name'],
        'batch No': item['batch No'],
        'Expiry Date': item['Expiry Date'],
        'mrp': parseFloat(item['mrp'].toFixed(5)),
        'quantity': item['quantity'],
        'cgst/sgst': parseFloat(item['cgst/sgst'].toFixed(2)),
        'amount': parseFloat((item['amount']).toFixed(5))
      }
      return obj
    })
    let newperMedicine = medicineArray.map((item) => {
      let q = item['maxQty'] - item['quantity']
      let obj = {
        'quantity': q == 0 ? -1 : q,
        'productId': item['productId'],
        'batch': item['batch']
      }
      return obj
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
      'grand_total': parseFloat(actual_grand_total.toFixed(2)),
      'patientId': patientId,
      'permedicine': newperMedicine,
      'homo_medicine':homoMedicineArray,
      'doctor_name': doctorName
    }
    props.onSave(input, isSave, props?.saleMedicine?.id)


  }

  const modifiyCompositionToProduct = (items) => {
    if (items.length == 0) {
      return
    }
    let cl = []
    let medList = []
    for (let i = 0; i < items.length; i++) {
      cl.push(items[i].id)
      for (let j = 0; j < items[i].ProductToComposition.length; j++) {
        medList.push(items[i].ProductToComposition[j].pid.name)

      }
    }
    console.log(medList)
    let actualList = {}

    for (let i = 0; i < medList.length; i++) {
      if (actualList[medList[i]]) {

        actualList[medList[i]] += 1
      } else {
        actualList[medList[i]] = 1
      }
    }

    console.log(actualList)

    let realList = []
    for (let key in actualList) {
      console.log(actualList[key])
      if (actualList[key] == cl.length) {
        realList.push({ label: key, value: key })

      }
    }
    console.log(realList)
    setCompositionToProductLsit(realList)


  }


  const addMedicine = () => {
    setMedicineArray((item) => [...item, { 'medicine Name': '', 'batch No': '', 'Expiry Date': '', 'mrp': '', 'quantity': '', 'cgst/sgst': '', 'amount': 0, 'tax': 0, 'amountWtax': 0, 'productId': 0, 'maxQty': 0, 'batch': '' }])
  }
  const addHomoMedicine = () => {
    setHomoMedicineArray((item) => [...item, { 'medicine Name': '', 'amount': '' }])
  }

  const deleteMedicine = (index) => {
    setMedicineArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }
  const deleteHomoMedicine = (index) => {
    setHomoMedicineArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }

  useEffect(() => {
    let tamt = 0, gst = 0, ta = 0
    for (let i = 0; i < medicineArray.length; i++) {
      if (medicineArray[i]['amount'] == 'NaN' || medicineArray[i]['tax'] == 'NaN' || medicineArray[i]['amountWtax'] == 'NaN') {
        continue
      }
      tamt += medicineArray[i]['amountWtax']
      gst += medicineArray[i]['tax']
      ta += medicineArray[i]['amount']

    }
    for (let i = 0; i < homoMedicineArray.length; i++) {
      if (homoMedicineArray[i]['amount'] == 'NaN') {
        continue
      }
      tamt += homoMedicineArray[i]['amount']
      ta += homoMedicineArray[i]['amount']

    }
    console.log(tamt, gst, ta)
    set_total_amount(tamt == 'NaN' ? 0 : parseFloat(tamt))
    set_total_cgst_amount(gst == 'NaN' ? 0 : gst / 2)
    set_total_sgst_amount(gst == 'NaN' ? 0 : gst / 2)
    set_actual_grand_total(ta == 'NaN' ? 0 : ta)
    set_grand_total(ta == 'NaN' ? 0 : ta)
  }, [medicineArray,homoMedicineArray])

  useEffect(() => {
    let dis = grand_total * parseFloat(discount) / 100.0
    setDiscountAmt(dis)
    set_actual_grand_total(parseFloat(parseFloat(grand_total - dis).toFixed(2)))
  }, [discount])

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
            bodyHeight="250px"
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

                <div className="flex  items-center  space-x-3 col-span-4 ">
                  <h1 className=" ">Gender Selection</h1>
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
            Patient Name
          </Label>

          <div className=" flex-1">

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
            name="doctor_name"
            className="rw-label mt-0"
            errorClassName="rw-label rw-label-error"
          >
            Doctor Name
          </Label>

          <div className=" flex-1">
            <Select options={doctors} onChange={changeDoctorName} isClearable={true} required value={defaultDoctor}
            />
            <FieldError name="doctor_name" className="rw-field-error" />

          </div>



        </div>



        <div className='flex items-center mt-3  gap-x-4'>


          <div className=" flex-1">
            <Multiselect
              options={props.compositions} // Options to display in the dropdown

              onSelect={(event) => modifiyCompositionToProduct(event)} // Function will trigger on select event
              onRemove={(event) => modifiyCompositionToProduct(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The compositions'
            />
          </div>



          <Select options={compositionToProductLsit} isClearable={true}
            placeholder="List Of Medicines"
          />


        </div>

        <div className="p-2 w-full shadow-sm bg-white text-black ">
          <div className=" grid grid-cols-13 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-4 justify-center">Medicine Name</div>
            <div className="flex col-span-3 justify-center">Batch No</div>
            <div className="flex col-span-1 justify-center">Expiry Date</div>
            <div className="flex col-span-1 justify-center">M.R.P</div>
            <div className="flex col-span-1 justify-center">Quantity</div>
            <div className="flex col-span-1 justify-center">CGST/SGST</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              medicineArray.map((item, index) => {
                return (
                  <>
                    <AddMedicineBody key={index} item={item}
                      medicineArray={medicineArray}
                      setMedicineArray={setMedicineArray}
                      del={deleteMedicine}
                      index={index}
                      medicines={props.medicines}
                    />
                  </>
                )
              })

            }







          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addMedicine}>Add Medicine</div>
          </div>
        </div>




        <div className="p-2 w-full shadow-sm bg-white text-black">
          <div className=" grid grid-cols-6 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-4 justify-center">Medicine Name</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              homoMedicineArray.map((item, index) => {
                return (
                  <>
                    <AddHomoMedicineBody key={index} item={item}
                      medicineArray={homoMedicineArray}
                      setMedicineArray={setHomoMedicineArray}
                      del={deleteHomoMedicine}
                      index={index}
                      medicines={props.homoMedicines}
                    />
                  </>
                )
              })

            }







          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addHomoMedicine}>Add Homopathy Medicine</div>
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

          <button className="rw-button rw-button-blue" onClick={() => setIsSave(true)}>
            Save

          </button>

          {/* <Submit disabled={props.loading} className="rw-button rw-button-blue" onClick={() => setIsSave(false)}>
            Save and Print
          </Submit> */}


        </div>
      </Form>


    </div>
  )
}

const AddMedicineBody = ({ item, medicineArray, del, setMedicineArray, index, medicines }) => {

  // const [labchargeType, setlabChargeType] = useState()
  // const [obj, setObj] = useState([])
  const [medicine, setMedicine] = useState('')
  const [batch, setBatch] = useState('')
  const [expDate, setExpDate] = useState('')
  const [mrp, setMrp] = useState('')
  const [cgst, setCgst] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)
  const [maxQty, setMaxQty] = useState(0)
  const [obj, setObj] = useState([])
  const [medicineName, setMedicineName] = useState()
  const [batchName, setBatchName] = useState()
  const [medicineList, setMedicineList] = useState([])
  const [batchList, setBatchList] = useState([])
  const [dublicatList, setDublicateList] = useState([])
  // const [timingObj,setTimingObj] = useState([
  //   {value:'After Food',label:'After Food'},
  //   {value:'Before Food',label:'Before Food'},
  // ])
  // const [timingObjName,setTimingObjectName] = useState()

  useLayoutEffect(() => {
    const newList = medicines
    setDublicateList(newList)
    const uniqueArray = newList.filter(
      (obj, id, self) =>
        id === self.findIndex((o) => o.pid.name === obj.pid.name)
    );
    // console.log(medicines,uniqueArray)
    const obj = uniqueArray.map((it) => {
      return {
        label: it.pid.name, value: it.pid.name
      }
    })
    setMedicineList(obj)


  }, [medicines])




  const medicineChange = (name, value, func) => {
    if (func == setQuantity) {
      value = parseInt(value)
      // console.log('hello')
      if (value > maxQty) {
        // console.log('hello2')
        return
      }
    }
    // console.log('hello3')
    func(value)


    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [name]: parseFloat(value)

      };
      return newArray;
    });
  }

  useEffect(() => {
    let total_amount = parseFloat(mrp) * parseInt(quantity)
    const taxPercentage = parseFloat(cgst)
    const taxAmount = (mrp * taxPercentage) / (100 + taxPercentage);
    const ta = total_amount + taxAmount
    setTotal(ta.toFixed(2))
    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'amountWtax': parseFloat(total_amount.toFixed(2)),
        'amount': parseFloat(ta.toFixed(2)),
        'tax': parseFloat(taxAmount.toFixed(2))
      };
      return newArray;
    });


  }, [quantity, cgst])

  useEffect(() => {

    if (item['medicine Name']) {
      console.log(item['medicine Name'])
      setMedicineName({ value: item['medicine Name'], label: item['medicine Name'] })
    }
    if (item['batch No']) {
      setBatchName({ value: item['batch No'], label: item['batch No'] })
      setMrp(item['mrp'])
      const exp = item['Expiry Date']
      setExpDate(exp)
      setQuantity(item['quantity'])
      setCgst(item['cgst/sgst'])



    }
    if (item['maxQty']) {
      setMaxQty(item['maxQty'])
    }

  }, [item])

  const medicineNameChange = (item) => {



    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'medicine Name': item?.value || ''

      };
      return newArray;
    });
    // setMaxQty(item?.qty || 0)
    const date = new Date()
    date.setMonth(date.getMonth())

    let newBatchList = dublicatList.filter((it) => (
      it.pid.name == item.value
      && it.quantity > 0
      && (new Date(it.exp) >= date)
    ))
    console.log(newBatchList)

    newBatchList = newBatchList.map((it) => {
      return { label: it.batch + " - " + it.quantity, value: it.batch + " - " + it.quantity, batch: it.batch, id: it.id, data: it }
    })
    setBatchList(newBatchList)
  }

  const batchNameChange = (item) => {


    const exp = item.data.exp.toString().split('-')[0] + '-' + item.data.exp.toString().split('-')[1]

    // setMedicineArray((item) => [...item, { 'medicine Name': '', 'batch No': '', 'Expiry Date': '', 'mrp': '', 'quantity': '', 'cgst/sgst': '', 'amount': 0 }])
    console.log(item)

    setExpDate(exp)
    setMrp(item.data.mrp)
    setMaxQty(item.data.quantity)
    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'batch No': item?.value || '',
        'batch': item.data.batch,
        'Expiry Date': exp,
        'mrp': item.data.mrp,
        'productId': item.data.productId,
        'maxQty': item.data.quantity
      };
      return newArray;
    });

  }
  return (
    <>

      <div className=" col-span-4 ">
        <Select options={medicineList} isClearable={true} required onChange={medicineNameChange} value={item['medicine Name'] !== '' ? medicineName : ''}
        />
      </div>
      <div className=" col-span-3 ">
        <Select options={batchList} isClearable={true} required onChange={batchNameChange} value={item['batch No'] !== '' ? batchName : ''}
        />
      </div>


      <div className="flex col-span-1 justify-center items-center text-black">
        <span>
          {
            expDate
          }
        </span>
      </div>
      <div className="flex col-span-1 justify-center items-center text-black">
        <span>
          {
            mrp
          }
        </span>
      </div>

      <div className="flex col-span-1 justify-center text-black">
        <input type="number" name="quantity" className="border border-black p-2 w-20" placeholder="Quantity" id="" value={quantity} required

          onChange={(e) => medicineChange(e.target.name, e.target.value, setQuantity)}
        />
      </div>
      <div className="flex col-span-1 justify-center text-black">
        <input type="number" name="cgst/sgst" className="border border-black p-2 w-20" id="" value={cgst} required onChange={(e) => medicineChange(e.target.name, e.target.value, setCgst)} />
      </div>
      <div className="flex col-span-1 justify-center items-center text-black">
        {total}
      </div>

      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600 p-2' onClick={del.bind(this, index)}>
          <MdDeleteForever className="" />
        </span>
      </div>
    </>
  )
}

const AddHomoMedicineBody = ({ item, medicineArray, del, setMedicineArray, index, medicines }) => {

  const [medicine, setMedicine] = useState('')
  const [amount, setAmount] = useState('')
  const [medicineName, setMedicineName] = useState()
  const [medicineList, setMedicineList] = useState([])
  useLayoutEffect(() => {
    // console.log(medicines,uniqueArray)
    const obj = medicines.map((it) => {
      return {
        label: it.name, value: it.name
      }
    })
    setMedicineList(obj)


  }, [medicines])

  const medicineNameChange = (item) => {
    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        'medicine Name': item?.value || ''

      };
      return newArray;
    });
  }


  const medicineChange = (name, value, func) => {
    if (func == setAmount) {
      value = parseInt(value)

    }
    // console.log('hello3')
    func(value)


    setMedicineArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [name]: parseFloat(value)

      };
      return newArray;
    });
  }

  useEffect(() => {

    if (item['medicine Name']) {
      console.log(item['medicine Name'])
      setMedicineName({ value: item['medicine Name'], label: item['medicine Name'] })
    }
    if (item['amount']) {
      setAmount(item['amount'])
    }

  }, [item])


  return (
    <>
      <div className=" col-span-4 ">
        <Select options={medicineList} isClearable={true} required onChange={medicineNameChange} value={item['medicine Name'] !== '' ? medicineName : ''}
        />
      </div>


      <div className="flex col-span-1 justify-center text-black">
        <input type="number" name="amount" className="border border-black p-2 w-24" placeholder="Amount" id="" value={amount} required

          onChange={(e) => medicineChange(e.target.name, e.target.value, setAmount)}
        />
      </div>

      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600 p-2' onClick={del.bind(this, index)}>
          <MdDeleteForever className="" />
        </span>
      </div>

    </>
  )
}



export default SaleMedicineNewForm
