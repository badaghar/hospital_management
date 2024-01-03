import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { timeTag } from 'src/lib/formatters'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
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


const DISCHARGE_PATIENT = gql`
  mutation DischargePatient($input: Int!) {
    dischargePatient(id: $input) {
      id
    }
  }
`

const UPDATE_IPD_MUTATION = gql`
  mutation UpdateIpdMutation($id: Int!, $input: UpdateIpdInput!) {
    updateIpd(id: $id, input: $input) {
      date_of_admission
    }
  }
`

const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatientMutation($id: Int!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      age
      phone_no
      gender
      address
      created_at
      updated_at
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

const IpdOverview = ({ ipd, totalAmount}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [changeDateOpen, setIsChangeDateOpen] = useState(false)
  const [gender, setGender] = useState(ipd.patient.gender);
  const [disAmt, setDisAmt] = useState(0)
  const handleGenderChange = (event) => {
    setGender(event.target.value.toUpperCase());
  };

  const [updatePatient, { loading2, error2 }] = useMutation(
    UPDATE_PATIENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Patient updated')
        // navigate(routes.patients())
        setTimeout(() => { document.location.reload(); }, 10);
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  useEffect(() => {
    let dis =0
    ipd.IpdPayment.map((item) => {
      if (item.payment_mode == 'disc') {
        dis += item.amount

      }
    })
    setDisAmt(dis)


  })

  const [updateIpd, { loading1, error1 }] = useMutation(UPDATE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Discharge Date Updated')
      setTimeout(() => { document.location.reload(); }, 10);
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // console.log(gender)



  function getPDF(id) {
    return axios.get(
      `http://13.233.126.41/:1000/downloadOpdForm?id=` +
      id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = (id) => {
    return getPDF(id) // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        var blobURL = URL.createObjectURL(blob)
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
        toast.success('Download Complete')
      })
      .catch((err) => {
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }

  const [dischargePatients, { loading, error }] = useMutation(
    DISCHARGE_PATIENT,
    {
      onCompleted: () => {
        toast.success('Discharged Done Successfully')
        // navigate(routes.ipds({type:ipd.patientType}))
        setTimeout(() => { document.location.reload(); }, 10);
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const dischargePatient = () => {
    if (confirm('Are you sure you want to discharge this patient')) {
      dischargePatients({ variables: { input: ipd.id } })
      console.log('here')
    }
    console.log('here2')
  }

  const printForm = () => {
    printPDF(ipd.id)
  }

  const editPatient = (data) => {
    data['gender'] = gender
    data['name'] = data['name'].split('(')[0]
    data = convertObjectValuesToUpper(data)
    updatePatient({ variables: { id: ipd.patient.id, input: data } })

  }
  const changedischargePatientDate = (data) =>{

    console.log(data)
    updateIpd({ variables: { id:ipd.id, input:data } })

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
            bodyHeight="250px"
            headerText={<span className="flex items-end h-14 text-xl">Add Patient Details</span>}
          >
            <Form
              onSubmit={editPatient}
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
                    defaultValue={ipd.patient.name}
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
                    defaultValue={ipd.patient.age}
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
                    defaultValue={ipd.patient.phone_no}
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
                        checked={gender === 'MALE'}
                        onChange={handleGenderChange}
                        className="form-radio mr-2"
                      />
                      Male
                    </label>
                    <label className="inline-flex items-center ml-3">
                      <input
                        type="radio"
                        value="Female"
                        checked={gender === 'FEMALE'}
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
                  Edit Patient Details
                </Submit>
              </div>
            </Form>
          </ReactDialogBox>
        </>
      )}
      {changeDateOpen && (
        <>
          <ReactDialogBox
            closeBox={() => {
              setIsChangeDateOpen(false)
            }}
            modalWidth="25%"
            headerBackgroundColor="#2c2c2c"
            headerTextColor="white"
            headerHeight="60px"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="150px"
            headerText={<span className="flex items-end h-14 text-xl">change Discharge Date</span>}
          >
            <Form
              onSubmit={changedischargePatientDate}
            >

              <div className="grid grid-cols-4 space-y-3">

                <div className='col-span-4 flex items-center space-x-3'>
                  <Label
                    name="discharge_date"
                    className="rw-label  mt-0"
                    errorClassName="rw-label rw-label-error mt-0"
                  >
                    Change Date
                  </Label>

                  <DateField
                    name="discharge_date"

                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                    defaultValue={ipd.discharge_date}
                  />

                  <FieldError name="discharge_date" className="rw-field-error mt-0" />
                </div>










              </div>


              <div className="rw-button-group">
                <Submit className="rw-button bg-gray-800 text-white">
                  change Discharge Date
                </Submit>
              </div>
            </Form>
          </ReactDialogBox>
        </>
      )}

      <div className="m-3 p-4">

        <div className="shadow-lg p-3 rounded-md">


          <div className="flex items-center space-x-3">
            <span>
              Patient Name :-
            </span>
            <span>
              {ipd.patient.name}
            </span>
            <button className='bg-red-800 text-white hover:opacity-40 p-1 px-3 rounded-xl' onClick={() => setIsOpen(true)}>
              Edit Patient
            </button>
            {
              ipd.patientType == 'IPD' &&
              (!ipd.discharge_date ?
                <span className="bg-green-800 p-1 px-3 text-white rounded-3xl hover:bg-white hover:text-green-800 cursor-pointer " onClick={dischargePatient}>
                  Discharge Patient
                </span> :
                <>
                  <span className="bg-green-800 p-1 px-3 text-white rounded-3xl hover:bg-white hover:text-green-800 cursor-pointer ">
                    Patient is Discharged At {            ipd.discharge_date.split('T')[0].split('-')[2]+'-'+
            ipd.discharge_date.split('T')[0].split('-')[1]+'-'+
            ipd.discharge_date.split('T')[0].split('-')[0]}
                  </span>
                  <span className="bg-green-800 p-1 px-3 text-white rounded-3xl hover:bg-white hover:text-green-800 cursor-pointer " onClick={()=>setIsChangeDateOpen(true)}>
                  Change Discharge Patient Date
                </span>




                </>
              )

            }
          </div>





          <div className="flex items-center space-x-3">
            <span>
              Age :-
            </span>
            <span>
              {ipd.patient.age}
            </span>
            <span>
              Phone No :-
            </span>
            <span>
              {ipd.patient.phone_no}
            </span>
            <span>
              Gender :-
            </span>
            <span>
              {ipd.patient.gender || 'Not Entered'}

            </span>

          </div>

          <div className="flex items-center space-x-3">
            <span>Address :- </span>
            <span>{ipd.patient.address || 'Not Entered'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Total Charges Till Now</span>
            <span>{totalAmount}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>Total Charges After Discount</span>
            <span>{totalAmount+disAmt}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Total Charges Paid Till Now</span>
            <span>{ipd.paid_amount}</span>
          </div>

          {ipd.patientType == 'IPD' && <div className="flex items-center space-x-3">
            <span>Date Of Admitted :- </span>
            <span>{

            ipd.date_of_admission.split('T')[0].split('-')[2]+'-'+
            ipd.date_of_admission.split('T')[0].split('-')[1]+'-'+
            ipd.date_of_admission.split('T')[0].split('-')[0]



            } </span>

          </div>}

          <div className='flex justify-center mt-2 pb-3'>
            <button className='bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2' onClick={printForm}>Print Form</button>

          </div>




        </div>
      </div>
    </>
  )
}

export default IpdOverview
