import { navigate, routes } from "@redwoodjs/router"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/dist/toast"
import axios from "axios"
import { useState, useLayoutEffect } from "react"
import { useAuth } from "src/auth"
// import { useLayoutEffect } from "react-js-dialog-box"

const CREATE_IPD_SUMMARY_MUTATION = gql`
  mutation CreateIpdSummaryMutation($input: CreateIpdSummaryInput!) {
    createIpdSummary(input: $input) {
      id
    }
  }
`

const UN_DISCHARGE_PATIENT = gql`
  mutation undischargePatient($id: Int!,$bed: Int!) {
    undischargePatient(id: $id,bed: $bed ) {
      id
    }
  }
`

const SummaryIpd = ({ ipd,floors }) => {

  const [obj, setObj] = useState({})
  const [isPrint, setIsPrint] = useState(false)
  const [isUpdate, setIsUpdate] = useState(!!ipd.IpdSummary[0])
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const isAdmin = currentUser?.roles == 'admin'
  function getPDF(id) {
    return axios.get(
      `/.redwood/functions/downloadDischargeSummary?id=` +
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

  useLayoutEffect(() => {
    if (ipd.IpdSummary[0]) {
      setObj(() => {
        return { ...ipd.IpdSummary[0].summary }
      })

    }
  }, [ipd])
  const [createIpdSummary, { loading, error }] = useMutation(
    CREATE_IPD_SUMMARY_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('IpdSummary created')
        if (isPrint) {
          printPDF(data.createIpdSummary.id)


        }
        navigate(routes.ipds({ type: 'IPD' }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [undischargePatient, { loading1, error1 }] = useMutation(
    UN_DISCHARGE_PATIENT,
    {
      onCompleted: () => {
        toast.success('Readmited Done Successfully')
        navigate(routes.ipds({type:ipd.patientType}))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const change = (name, val) => {
    setObj((obj2) => {
      return {
        ...obj2,
        [name]: val
      };
    });
  }
  const save = () => {
    let input = {
      ipdId: ipd.id,
      summary: obj
    }
    if (isUpdate) {
      // console.log(ipd.IpdSummary[0])
      input['update'] = 1
      input['id'] = ipd.IpdSummary[0].id
    }
    else {
      input['update'] = 0
      input['id'] = 0
    }
    createIpdSummary({ variables: { input } })
  }
  const saveAndPrint = () => {
    const input = {
      ipdId: ipd.id,
      summary: obj
    }
    if (isUpdate) {
      // console.log(ipd.IpdSummary[0])
      input['update'] = 1
      input['id'] = ipd.IpdSummary[0].id
    }
    else {
      input['update'] = 0
      input['id'] = 0
    }
    setIsPrint(true)
    createIpdSummary({ variables: { input } })
  }


  const undischarge = () => {

    const bed = ipd.consultant_doctor.split('----')[1].trim()
    let floor_name = bed.split('Floor')[1].trim()
    let bed_name = bed.split('Floor')[0].split('Bed')[1].trim()
    // console.log(floor_name,bed_name)
    let floorId = floors.filter((ele,ind)=>{
      return ele.floor_name == floor_name
    })
    // .filter((ele,ind)=>{
    //   return ele.Bed.bed_name == bed_name
    // })
    let bedId = floorId[0].Bed.filter((ele,ind)=>{
      return ele.bed_name == bed_name

    })

    bedId = bedId[0].id

    // let bedId = 0;
    console.log(bedId)
    if (confirm('Are you sure you want to readmit the patient')) {
      undischargePatient({ variables: { id:ipd.id,bed:bedId } })
    }

  }




  return (
    <div className="m-3">
      <div className="flex justify-center space-x-3">
        <h1 className="uppercase bg-black text-white p-2">discharge summary</h1>
        <h1 className="uppercase bg-red-700 text-white p-2 cursor-pointer hover:opacity-40" onClick={undischarge}>Un discharge Patient</h1>


      </div>
      <div className="my-3">
        <div>
          <div className="flex">
            <span>
              Name :
            </span>
            <span className="ml-3 flex-1">
              {ipd.patient.name}
            </span>
            <span>
              Age :
            </span>
            <span className="mx-3">
              {ipd.patient.age}
            </span>
            <span>
              Sex :
            </span>
            <span className="mx-3">
              {ipd.patient.gender}
            </span>
            <span>
              Ph .NO :
            </span>
            <span>
              {ipd.patient.phone_no}
            </span>
            {/* <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/> */}

          </div>
          <div className="flex my-3">
            <span>
              Address :
            </span>
            <input type="text" className="border border-black  ml-3 px-2 flex-1" onChange={(e) => change('address', e.target.value)} value={obj.address} />
          </div>





          <div className="flex my-3">
            <span>
              Date of Admission :
            </span>
            <span className="ml-3 flex-1">
              {
              ipd.date_of_admission.split('T')[0].split('-')[2]+'-'+
              ipd.date_of_admission.split('T')[0].split('-')[1]+'-'+
              ipd.date_of_admission.split('T')[0].split('-')[0]



              }
            </span>
            <span>
              Date of Discharge :
            </span>
            <span className="ml-3 flex-1">
              {
              // ipd.discharge_date.split('T')[0]
              ipd.discharge_date.split('T')[0].split('-')[2]+'-'+
              ipd.discharge_date.split('T')[0].split('-')[1]+'-'+
              ipd.discharge_date.split('T')[0].split('-')[0]

              }
            </span>
          </div>
          <div className="flex my-3">
            <span>
              Ref by Dr  :
            </span>
            <input type="text" className="border border-black  ml-3 px-2 flex-1" onChange={(e) => change('refByDr', e.target.value)} value={obj.refByDr} />
          </div>
          <div className="flex my-3">
            <span>
              Consultant (S)  :
            </span>
            <span className="px-3">
            {ipd.consultant_doctor.split('----')[0]}
            </span>

            {/* <div className="flex flex-wrap space-x-2 ">

              {
                ipd.IpdConsultation?.map((ele) => {
                  return (

                    <div>
                      {ele.consultation_doctor}

                    </div>
                  )
                })
              }
            </div> */}
          </div>



          <div className="flex flex-col">
            <span>Diagnosis</span>
            <textarea name="" id="" rows="2" className="border border-black  px-2 flex-1" onChange={(e) => change('diagnosis', e.target.value)} value={obj.diagnosis} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Chief Complaint & History : </span>
            <textarea name="" id="" rows="2" className="border border-black  px-2 flex-1" onChange={(e) => change('chief', e.target.value)} value={obj.chief} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Clinical Findings : </span>
            <textarea name="" id="" rows="2" className="border border-black  px-2 flex-1" onChange={(e) => change('clinical', e.target.value)} value={obj.clinical} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Investigations : </span>
            <textarea name="" id="" rows="2" className="border border-black  px-2 flex-1" onChange={(e) => change('investigations', e.target.value)} value={obj.investigations} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Treatement / Surgery / Delivery Notes : </span>
            <textarea name="" id="" rows="3" className="border border-black  px-2 flex-1" onChange={(e) => change('surgery', e.target.value)} value={obj.surgery}></textarea>
          </div>
          <div className="flex flex-col">
            <span>Treatement Advised at the time of Discharge : </span>
            <textarea name="" id="" rows="6" className="border border-black  px-2 flex-1" onChange={(e) => change('treatement', e.target.value)} value={obj.treatement}></textarea>
          </div>

          <div className="flex justify-center m-2">
            <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2" onClick={save}>Save</button>
            <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2" onClick={saveAndPrint}>Save & Print</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SummaryIpd
