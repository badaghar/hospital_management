import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
  DateField,
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
import { MdDeleteForever } from 'react-icons/md'


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


const IpdForm = (props) => {
  const [patient, setPatient] = useState([])
  const [patientId, setPatientId] = useState(0)
  const [defaultPatient, setDefaultPatient] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [doctors, setDoctors] = useState()
  const [doctorName, setDoctorName] = useState()
  const [doctorChargesArray, setDoctorChargesArray] = useState([])
  const [otherChargesArray, setOtherChargesArray] = useState([])
  // const [paymentOption, setPaymentOption] = useState([
  //   { value: 'phonepe', label: 'phonepe' }, { value: 'cash', label: 'cash' }
  // ])
  const [bedOptions, setBedOptions] = useState([])
  const [payment, setPayment] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [advancePayment, setAdvancePayment] = useState(0)
  const [bedName, setBedName] = useState()
  const [isOPD, setIsOpd] = useState(props.type == 'OPD')
  console.log(isOPD)
  const [gender, setGender] = useState('Male');
  const [isChecked, setIsChecked] = useState(false);

  // Handler function for the checkbox onChange event
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [isChecked2, setIsChecked2] = useState(false);

  // Handler function for the checkbox onChange event
  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const [paymentOption, setPaymentOption] = useState('balance');

  const changePayment = (e) => {
    setPaymentOption(e.target.value);
  };


  // logic by vinay
  // const
  const [extraInfo, setExtraInfo] = useState({})
  const thermo = ['BP', 'Pulse', 'Saturation', 'Grbs', 'Weight']
  const handleExtraInfo = (name, value) => {
    setExtraInfo((det) => {
      return {
        ...det,
        [name]: value
      }
    })

  }


  // end

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  // const []

  const onSubmit = (data) => {
    data['patientId'] = patientId
    data['consultant_doctor'] = isOPD ? doctorName.value + '----' : doctorName.value + '----' + bedName.value
    data['patientType'] = props.type


    // data['paymentMode'] = payment
    // data['bed'] = bedName.id
    data['paid_amount'] = 0

    if (isOPD) {
      data['date_of_admission'] = new Date()
    }
    else {
      data['date_of_admission'] = data['date_of_admission']
    }

    data['extra_data'] = {
      'DoctorCharges': doctorChargesArray,
      'OtherCharges': otherChargesArray,
      'IpdPayment': {
        amount: 0,
        'payment_mode': paymentOption
      },
      'bed': isOPD == false ? bedName.id : -1
    }
    data['extra'] = {
      'thermo': extraInfo,
      'isWaiting': isChecked2
    }
    delete data['amount']
    delete data['amount1']
    console.log(data)
    props.onSave(data, props?.opd?.id, isChecked)
  }

  useEffect(() => {
    const arrPat = props.patients.map((item) => {
      const obj = { 'label': item.name, 'value': item.id, data: item }
      return obj
    })
    // // console.log(arrPat)
    setPatient(arrPat)

    let obj = props.users.filter((item) => item.roles == 'doctor')
    obj = obj.map((item) => {
      const obj = { 'label': item.name, 'value': item.name, 'id': item.id }
      return obj
    })
    setDoctors(obj)
    let obj2 = props.beds.filter((item) => !item.occupied).map((it) => {
      let text = 'Bed ' + it.bed_name + ' Floor ' + it.floor.floor_name

      return { 'label': text, 'value': text, 'id': it.id }
    })
    // console.log(obj2)
    setBedOptions(obj2)
    // console.log(obj2)
  }, [])

  useEffect(() => {

    let total_amount = 0
    otherChargesArray.map((it) => {
      total_amount += it.total
    })
    doctorChargesArray.map((it) => {
      total_amount += it.amount
    })
    setTotalAmount(total_amount)

  }, [otherChargesArray, doctorChargesArray])

  useEffect(() => {
    // console.log(otherChargesArray)
  })

  const changePatienId = (item) => {
    // // console.log(item)
    setDefaultPatient(item)
    setPatientId(item.value)
    setDoctorName(item.data.extra?.drName)
  }

  useEffect(() => {
    if (props.id) {
      const arrPat = props.patients.filter((it) => it.id == props.id).map((item) => {
        const obj = { 'label': item.name, 'value': item.id, data: item }
        return obj
      })
      changePatienId(arrPat[0])
    }


  }, [props.id])

  const changeDoctor = (item) => {
    setDoctorName(item)

  }
  const changeBed = (item) => {

    setBedName(item)

  }

  const openModal = () => {
    setIsOpen(true)



  }

  const addDoctorCharges = () => {
    setDoctorChargesArray((item) => [...item, { consultation_doctor: '', consultation_type: '', amount: 0 }])
    // setNoOfDoctorCharges((item) => item + 1)
  }

  const addOtherCharges = () => {
    setOtherChargesArray((item) => [...item, { charge_type: '', quantity: 0, charge: 0, total: 0 }])
  }

  const delectDoctorCharges = (index) => {
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });



  }
  const delectOtherCharges = (index) => {
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }

  // const changePayment = (item) => {
  //   if (!item) {
  //     setPayment('')
  //     return
  //   }
  //   // console.log(item.value)
  //   setPayment(item.value)
  // }

  const [createPatient, { loading, error }] = useMutation(
    CREATE_PATIENT_MUTATION,
    {
      onCompleted: (data) => {
        const name = data.createPatient.name
        const id = data.createPatient.id
        console.log(data)
        // toast.success('Patient Added ')
        toast.success(name)
        const value = { 'label': name, 'value': id }
        setPatient((item) => [...item, value])
        setDefaultPatient(value)
        setPatientId(id)
        setIsOpen(false)

      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const addPatient = (input) => {
    input['gender'] = gender
    input['extra'] = {
      drName:doctorName
    }


    input = convertObjectValuesToUpper(input)
    createPatient({ variables: { input } })
  }

  return (

    <>

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
            bodyHeight="350px"
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
                    validation={{ required: true }}
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

              <div className='flex items-center mt-3  gap-x-4'>
                <Label
                  className="rw-label mt-0"
                >
                  Consultant Doctor Name
                </Label>
                <div className={`flex-1`}>
                  <Select options={doctors} onChange={changeDoctor} isClearable={true} value={doctorName}
                    required
                  />
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
      {/* <div className='flex bg-gray-800 text-white p-2 space-x-5 rounded-3xl justify-around'>
        <div>
          OverView
        </div>
        <div>
          Operations
        </div>
        <div>
          consultant Registration
        </div>
        <div>
          Charges
        </div>
        <div>
          Payment
        </div>

      </div> */}

      <div className="rw-form-wrapper">








        {/* <Form onSubmit={onSubmit} error={props.error}>
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label
            name="consultant_doctor"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Consultant doctor
          </Label>

          <TextField
            name="consultant_doctor"
            defaultValue={props.ipd?.consultant_doctor}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="consultant_doctor" className="rw-field-error" />



          <Label
            name="paid_amount"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Paid amount
          </Label>

          <TextField
            name="paid_amount"
            defaultValue={props.ipd?.paid_amount}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true, required: true }}
          />

          <FieldError name="paid_amount" className="rw-field-error" />

          <Label
            name="patientId"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Patient id
          </Label>

          <NumberField
            name="patientId"
            defaultValue={props.ipd?.patientId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="patientId" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit disabled={props.loading} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        </Form> */}

        <Form onSubmit={onSubmit} error={props.error}>
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <div className='flex items-center mt-3  gap-x-4'>
            <Label
              name="patientId"
              className="rw-label mt-0"
              errorClassName="rw-label rw-label-error"
            >
              Patient id
            </Label>

            <div className=" flex-1">
              <Select options={patient} onChange={changePatienId} isClearable={true}
                value={defaultPatient} required

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
              className="rw-label mt-0"
            >
              Consultant Doctor Name
            </Label>
            <div className={`${isOPD && 'flex-1'}`}>
              <Select options={doctors} onChange={changeDoctor} isClearable={true} value={doctorName}
              />
            </div>


            <Label
              name="date_of_admission"
              className={`rw-label mt-0 ${isOPD && 'hidden'}`}
              errorClassName="rw-label rw-label-error mt-0"
            >
              Date of admission
            </Label>
            <div className="">
              <DateField
                name="date_of_admission"
                // defaultValue={formatDatetime(props.ipd?.date_of_admission)}
                // defaultValue={defaultDateTransfer(new Date())}
                className={`rw-label mt-0 ${isOPD && 'hidden'}`}
                errorClassName="rw-input rw-input-error mt-0"
                validation={{ required: !isOPD }}
              />
            </div>

            <FieldError name="date_of_admission" className="rw-field-error mt-0" />

            <Label
              className={`rw-label mt-0 ${isOPD && 'hidden'}`}
            >
              Select Bed
            </Label>
            <div className={`w-72 ${isOPD && 'hidden'}`}>
              <Select options={bedOptions} onChange={changeBed} isClearable={true} value={bedName}
              />
            </div>

          </div>



          {/* code by vinay */}

          <div className=" grid grid-cols-5 mt-3">
            {
              thermo.map((item) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">


                      {item}


                    </div>

                  </>
                )
              })
            }
            {
              thermo.map((it) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center ">
                      <input type="text" className="bg-slate-900 text-white p-2"
                        onChange={(item) => handleExtraInfo(it, item.target.value)} />
                    </div>

                  </>
                )
              })
            }

            {/* <div className="flex col-span-1 justify-center ">
        <input type="number" className="bg-slate-900 text-white p-2" name="" id="" value={quantity} onChange={(item) => setQuantity(item.target.value)} required />

      </div> */}

          </div>
          {/* end */}

          <div className='flex justify-center mt-3  gap-x-4'>
            <div className='font-bold text-2xl underline'>
              Other Charges
            </div>
          </div>

          {/* <div className="p-2 w-full shadow-sm bg-white ">
            <div className=" grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2">

              <DoctorChargeHeader />

              {
                doctorChargesArray.map((item, index) => {
                  return (
                    <>
                      <DoctorChargeBody key={index} item={item} doctors={doctors} index={index}
                        doctorChargesArray={doctorChargesArray}
                        setDoctorChargesArray={setDoctorChargesArray}
                        del={delectDoctorCharges}
                        doctorFees={props.doctorFees}

                      />


                    </>
                  )
                })
              }
            </div>

            <div className='flex justify-center mt-2'>
              <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addDoctorCharges}>Add Doctor Charge</div>
            </div>
          </div> */}

          <div className="p-2 w-full shadow-sm bg-white ">
            <div className=" grid grid-cols-5 grid-flow-row gap-x-2 gap-y-2">

              <OtherChargeHeader />

              {
                otherChargesArray.map((item, index) => {
                  return (
                    <>
                      <OtherChargeBody key={index} chargeses={props.chargeses} item={item}
                        otherChargesArray={otherChargesArray}
                        setOtherChargesArray={setOtherChargesArray}
                        del={delectOtherCharges}
                        index={index}
                      />


                    </>
                  )
                })
              }
            </div>

            <div className='flex justify-center mt-2'>
              <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addOtherCharges}>Add Other Charge</div>
            </div>
          </div>








          {/* <Label
          name="consultant_doctor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Consultant doctor
        </Label>

        <TextField
          name="consultant_doctor"
          defaultValue={props.opd?.consultant_doctor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="consultant_doctor" className="rw-field-error" /> */}

          {/* <Label
          name="charges"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Charges
        </Label>

        <TextAreaField
          name="charges"
          defaultValue={JSON.stringify(props.opd?.charges)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="charges" className="rw-field-error" /> */}

          <div className='flex items-center mt-3 justify-end gap-x-4'>

            <Label
              name="amount"
              className="rw-label mt-0"
              errorClassName="rw-label mt-0 rw-label-error"
            >
              Total Amount
            </Label>
            <div className="flex">

              <TextField
                name="amount"
                defaultValue={props.opd?.amount}
                value={totalAmount}
                className="rw-input mt-0"
                // disabled={true}
                errorClassName="rw-input mt-0 rw-input-error"
                validation={{ valueAsNumber: true, required: true }}
              />
            </div>
            <FieldError name="amount" className="rw-field-error mt-0" />
          </div>


          <div className='flex items-center mt-3 justify-end gap-x-4'>
            <Label
              name="paymentMode"
              className="rw-label mt-0"
              errorClassName="rw-label mt-0 rw-label-error"
            >
              Payment mode
            </Label>
            <div className="flex">

            </div>
            {/* <Select options={paymentOption} onChange={changePayment} isClearable={true} required /> */}
            {/* <div> */}
            <label>
              <input
                type="radio"
                value="paid"
                checked={paymentOption === "paid"}
                onChange={changePayment}
                required
              />
              Paid
            </label>
            <label>
              <input
                type="radio"
                value="balance"
                checked={paymentOption === "balance"}
                onChange={changePayment}
                required
              />
              Balance
            </label>
            {/* </div> */}

            <FieldError name="paymentMode" className="rw-field-error mt-0" />
          </div>



          {/* <div className='flex items-center mt-3 justify-end gap-x-4'>

            <Label
              name="amount1"
              className="rw-label mt-0"
              errorClassName="rw-label mt-0 rw-label-error"
            >
              Advance Payment
            </Label>
            <div className="flex">

              <TextField
                name="amount1"
                defaultValue={props.opd?.amount}
                value={advancePayment}
                onChange={(e) => setAdvancePayment(e.target.value)}
                className="rw-input mt-0"
                errorClassName="rw-input mt-0 rw-input-error"
                validation={{ valueAsNumber: true, required: true }}
              />
            </div>
            <FieldError name="amount1" className="rw-field-error mt-0" /> */}
          {/* </div> */}

          {/* <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.opd?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" /> */}
          <div className="p-3">
            <label className='flex items-center'>
              <input
                type="checkbox"

                className='mr-2'
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className='text-lg text-gray-700'>
                Print The Form
              </span>
            </label>
          </div>
          <div className="p-3">
            <label className='flex items-center'>
              <input
                type="checkbox"

                className='mr-2'
                checked={isChecked2}
                onChange={handleCheckboxChange2}
              />
              <span className='text-lg text-gray-700'>
                Add The Patient To Waiting List
              </span>
            </label>
          </div>

          <div className="rw-button-group">
            <Submit disabled={props.loading} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

const DoctorChargeHeader = () => {
  return (
    <>
      <div className="flex col-span-1 justify-center">Doctor Name</div>
      <div className="flex col-span-1 justify-center">Charges Type</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Action</div>
    </>
  )
}
const OtherChargeHeader = () => {
  return (
    <>
      <div className="flex col-span-1 justify-center">Charges Type</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Quantity</div>
      <div className="flex col-span-1 justify-center">Net Amount</div>
      <div className="flex col-span-1 justify-center">Action</div>
    </>
  )
}

const OtherChargeBody = ({ chargeses, item, otherChargesArray, del, setOtherChargesArray, index }) => {

  const [chargeType, setChargeType] = useState()
  const [obj, setObj] = useState([])
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [net_amount, set_net_amount] = useState(0)


  const chargeTypeChange = (item) => {


    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        charge_type: item?.value || '',
        charge: item?.amount || 0
      };
      return newArray;
    });
    // setAmount(item?.amount || 0)
    // setChargeType(item)
    // console.log(item)



  }

  useEffect(() => {
    set_net_amount(quantity * amount)
    setOtherChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        quantity: parseInt(quantity),
        total: quantity * amount
      };
      return newArray;
    });
    // setQuantity(quantity)


  }, [quantity])






  useEffect(() => {

    if (item.charge_type) {
      setChargeType({ value: item.charge_type, label: item.charge_type })
    }
    // setQuantity(item.qunatity)
    setAmount(item.qunatity * item.charge)

    const obj = chargeses.map((char) => {
      const ob = { value: char.name, label: char.name, amount: char.amount }
      return ob
    })
    setObj(obj)
    setAmount(item.charge)
    console.log(item)



  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={chargeTypeChange} value={item.type !== '' ? chargeType : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center ">
        <input type="number" className="bg-slate-900 text-white p-2" name="" id="" value={quantity} onChange={(item) => setQuantity(item.target.value)} required />

      </div>
      <div className="flex col-span-1 justify-center">{net_amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )
}

const DoctorChargeBody = ({ doctors, item, doctorChargesArray, setDoctorChargesArray, index, del, doctorFees }) => {
  const [doctorName, setDoctorName] = useState()
  const [chargeType, setChargeType] = useState()
  const [chargeTypeArray, setchargeTypeArray] = useState([])
  const [amount, setAmount] = useState(0)
  // const [amount,setAmount]
  const doctorChange = (item) => {
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        consultation_doctor: item?.value || ''
      };
      return newArray;
    });

    let ct = doctorFees.filter((it) => it.userId == item?.id || 0)
    ct = ct.map((it) => {
      const ob = { label: it.type, value: it.type, id: it.id }
      return ob
    })
    console.log(item)

    if (!item) {
      // console.log('here')
      setDoctorChargesArray((array) => {
        const newArray = [...array];
        newArray[index] = {
          ...newArray[index],
          consultation_type: '',
          amount: 0
        };
        return newArray;
      });
      setChargeType('')
    }

    // console.log(ct)
    setchargeTypeArray(ct)
    setDoctorName(item)
  }

  const chargeChange = (item) => {
    setChargeType(item)

    const ml = doctorFees.filter((it) => it.id == item?.id)
    // console.log(ml,item)
    setDoctorChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        consultation_type: item?.value || '',
        amount: ml[0]?.amount || 0
      };
      return newArray;
    });

    // console.log(ml[0]?.amount)
    setAmount(ml[0]?.amount || 0)



  }

  useEffect(() => {
    if (item.consultation_doctor) {
      setDoctorName({ value: item.consultation_doctor, label: item.consultation_doctor })
    }
    if (item.consultation_type) {
      setChargeType({ value: item.consultation_type, label: item.consultation_type })
    }
    setAmount(item.amount)
    // console.log(item.amount)

  }, [item])

  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={doctors} isClearable={true} required onChange={doctorChange} value={item.name !== '' ? doctorName : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">
        <Select options={chargeTypeArray} isClearable={true} required onChange={chargeChange} value={chargeType}
        />


      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )

}

export default IpdForm
