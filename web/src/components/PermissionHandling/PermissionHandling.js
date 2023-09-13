// import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import Multiselect from 'multiselect-react-dropdown'
import { useEffect, useState } from 'react'
import { Link, navigate, routes } from '@redwoodjs/router'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      permissions
      updated_at
    }
  }
`


const PermissionHandling = ({ id, users }) => {

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User Permission  Updated')
      // if (isAuthenticated) {
      navigate(routes.home())
      // }
      // navigate(routes.Home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = () => {
    const input = {
      permissions: {
        pharmacy: covertObjectOfArrayToArray(pharmacyArrayList), //finished
        pharmacyReport: covertObjectOfArrayToArray(pharmacyOptionArray),
        pharma, //finished
        charges: covertObjectOfArrayToArray(chargesArrayList), //finished
        patientType: covertObjectOfArrayToArray(patientTypeArray), //finished
        hospitalReport: covertObjectOfArrayToArray(hospitalReportArray),
        bed: covertObjectOfArrayToArray(beds), //  finished
        // phsam\Report: covertObjectOfArrayToArray(pharmacyOptionArray),

      }
    }
    // console.log(patientTypeArray)

    console.log(input)
    updateUser({ variables: { id, input } })
  }

  const covertObjectOfArrayToArray = (aobj) => {
    console.log(aobj)
    let arr = aobj?.map((ele) => ele.name)
    return arr;
  }

  const headers = ['pharmacy', 'pharmacy payment', 'pharmacy report', 'patient', 'charges']


  // ["Return Medicines","SaleMedicines","Medicines","PurchaseMedicines","Products","Compositions","Manufacturers","Distributers","PaymentPurchaseMedicinest"]


  const pharmacyArray = [{ name: 'Distributers' }, { name: 'Manufacturers' }, { name: 'Compositions' }, { name: 'Products' }, { name: 'PurchaseMedicines' }, { name: 'SaleMedicines' }, { name: 'Return Medicines' }, { name: 'Medicines' }, { name: 'PaymentPurchaseMedicinest' }]

  const pharmacyReportArray = [{ name: 'Distributers Reports', value: 1 }, { name: 'Manufacturer Report', value: 1 }, { name: 'PurchaseMedicines Report', value: 1 }, { name: 'SaleMedicines Report', value: 1 }, { name: 'Return Medicines Report', value: 1 }, { name: 'Payment Report', value: 1 }, { name: 'Near To Expiry Medicine Report', value: 1 }]


  const Charges = [{ name: 'DoctorFees' }, { name: 'Chargeses' }, { name: 'LabChargeses' }, { name: 'operations' }]
  const Bed = [{ name: 'floors' }, { name: 'beds' }]
  const patientType = [{ name: 'IPD' }, { name: 'OPD' }, { name: 'Operations' },{name:'Certificate'}]

  const HospitalReportAyyay = [{ name: 'IPD Reports', value: 1 }, { name: 'OPD Report', value: 1 },]




  const [pharma, setPharma] = useState(false)
  const [pharmacyArrayList, setPharmacyArrayList] = useState({})
  const [pharmacyOptionArray, setPharmacyOptionArray] = useState({})
  const [chargesArrayList, setChargesArrayList] = useState({})
  const [beds, setBeds] = useState({})
  const [patientTypeArray, setPatientTypeArray] = useState({})
  const [hospitalReportArray, setHospitalReportArray] = useState({})
  // const [pharmacyOptionList,setPharmacyArrayList]


  const givepharmacypermission = (items) => {

    if (items.length == 0) {
      setPharmacyArrayList(undefined)
      return
    }
    // const objectArray = items.map((str) => ({ name: str }));
    setPharmacyArrayList(items)
    // console.log(items)

  }

  const givepharmacyReportpermission = (items) => {

    if (items.length == 0) {
      setPharmacyOptionArray(undefined)
      return
    }
    // const objectArray = items.map((str) => (str.value));
    setPharmacyOptionArray(items)
    console.log(items)

  }
  const giveHospitalReportpermission = (items) => {

    if (items.length == 0) {
      setHospitalReportArray(undefined)
      return
    }
    // const objectArray = items.map((str) => (str.value));
    // setPharmacyOptionArray(objectArray)
    // console.log(objectArray)
    console.log(items)
    setHospitalReportArray(items)

  }
  const giveHospitalChargespermission = (items) => {

    if (items.length == 0) {
      setChargesArrayList(undefined)
      return
    }
    // const objectArray = items.map((str) => (str.value));
    setChargesArrayList(items)
    // console.log(objectArray)

  }
  const giveHospitalPatientspermission = (items) => {
    console.log(items)

    if (items.length == 0) {
      setPatientTypeArray(undefined)
      return
    }
    // const objectArray = items.map((str) => (str.value));
    setPatientTypeArray(items)
    // console.log(objectArray)

  }
  const giveHospitalBedpermission = (items) => {

    if (items.length == 0) {
      setBeds(undefined)
      return
    }
    // const objectArray = items.map((str) => (str.value));
    setBeds(items)
    // console.log(objectArray)

  }




  useEffect(() => {
    console.log('users', id)
    const user = users.filter((val) => val.id == id)[0]
    console.log(user)
    const objectArray = user.permissions
      ?.pharmacy
      ?.map((str) => ({ name: str }));
    const objectArray2 = user.permissions
      ?.charges
      ?.map((str) => ({ name: str }));
    const objectArray3 = user.permissions
      ?.bed
      ?.map((str) => ({ name: str }));
    const objectArray4 = user.permissions
      ?.patientType
      ?.map((str) => ({ name: str }));
    const objectArray5 = user.permissions
      ?.pharmacyReport
      ?.map((str) => ({ name: str }));;
    const objectArray6 = user.permissions
      ?.hospitalReport
      ?.map((str) => ({ name: str }));;
    const objectArray7 = user.permissions
      ?.pharma;


    console.log(user.permissions)

    setPharmacyArrayList(objectArray)
    setChargesArrayList(objectArray2)
    setBeds(objectArray3)
    setPatientTypeArray(objectArray4)
    setPharmacyOptionArray(objectArray5)
    setHospitalReportArray(objectArray6)
    setPharma(objectArray7)

  }, [id])

  return (
    <>

      <div className='m-4'>

        <div className="flex  space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Pharmacy Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={pharmacyArray} // Options to display in the dropdown
              selectedValues={pharmacyArrayList}


              onSelect={(event) => givepharmacypermission(event)} // Function will trigger on select event
              onRemove={(event) => givepharmacypermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The Options'
            />
          </div>
        </div>
      </div>
      <div className='m-4'>

        <div className="flex items-center space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Pharmacy Report Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={pharmacyReportArray} // Options to display in the dropdown
              selectedValues={pharmacyOptionArray}
              onSelect={(event) => givepharmacyReportpermission(event)} // Function will trigger on select event
              onRemove={(event) => givepharmacyReportpermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The Options'
            />
          </div>
        </div>
      </div>



      <div className="flex items-center space-x-4 mx-3 text-black">
        <label className='text-white cursor-pointer' htmlFor='medicinePayment'>
          Select Pharmacy Payment Options
        </label>
        <div className='flex-1'>
          <input type="checkbox" name="" id="medicinePayment" value={pharma}
            checked={pharma}
            onChange={(e) => setPharma(e.target.checked)}
            defaultChecked={pharma}

          />

        </div>
      </div>


      <div className='m-4'>

        <div className="flex items-center space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Hospital Charges Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={Charges} // Options to display in the dropdown
              selectedValues={chargesArrayList}

              onSelect={(event) => giveHospitalChargespermission(event)} // Function will trigger on select event
              onRemove={(event) => giveHospitalChargespermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The Charges Options'
            />
          </div>
        </div>
      </div>


      <div className='m-4'>

        <div className="flex items-center space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Hospital Patients Type Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={patientType} // Options to display in the dropdown
              selectedValues={patientTypeArray}
              onSelect={(event) => giveHospitalPatientspermission(event)} // Function will trigger on select event

              onRemove={(event) => giveHospitalPatientspermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The Patient Type Options'
            />
          </div>
        </div>
      </div>
      <div className='m-4'>

        <div className="flex items-center space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Hospital Report Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={HospitalReportAyyay} // Options to display in the dropdown
              selectedValues={hospitalReportArray}
              onSelect={(event) => giveHospitalReportpermission(event)} // Function will trigger on select event
              onRemove={(event) => giveHospitalReportpermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select The Hospital Report Options'
            />
          </div>
        </div>
      </div>

      <div className='m-4'>

        <div className="flex items-center space-x-4 mx-3 text-black">
          <div className='text-white'>
            Select Bed Type Options
          </div>
          <div className='flex-1'>

            <Multiselect
              options={Bed} // Options to display in the dropdown
              selectedValues={beds}

              onSelect={(event) => giveHospitalBedpermission(event)} // Function will trigger on select event
              onRemove={(event) => giveHospitalBedpermission(event)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder='Select Beds Options'
            />
          </div>
        </div>
      </div>




      <div className='flex justify-center mt-2'>
        <button className='rw-button rw-button-blue' onClick={onSave}>Save Permissions</button>
      </div>



    </>
  )
}

export default PermissionHandling
