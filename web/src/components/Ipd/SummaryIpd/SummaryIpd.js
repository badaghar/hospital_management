import { navigate, routes } from "@redwoodjs/router"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/dist/toast"
import { useState,useLayoutEffect } from "react"
// import { useLayoutEffect } from "react-js-dialog-box"

const CREATE_IPD_SUMMARY_MUTATION = gql`
  mutation CreateIpdSummaryMutation($input: CreateIpdSummaryInput!) {
    createIpdSummary(input: $input) {
      id
    }
  }
`

const SummaryIpd = ({ ipd }) => {
  const [obj, setObj] = useState({})

  useLayoutEffect(()=>{
    if(ipd.IpdSummary[0])
    {
      // console.log(ipd.IpdSummary[0])

      setObj(()=>{
         return { ...ipd.IpdSummary[0].summary}
      })

    }
  },[ipd])
  const [createIpdSummary, { loading, error }] = useMutation(
    CREATE_IPD_SUMMARY_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdSummary created')
        navigate(routes.ipds({type:'IPD'}))
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
    // const yes = confirm("Are You sure you want to save the changes . Once Changed it Cannot be Modified")
    // if(yes)
    // {
      const input = {
        ipdId : ipd.id,
        summary: obj
      }
      createIpdSummary({ variables: { input } })
    // }

  }
  return (
    <div className="m-3">
      <div className="flex justify-center">
        <h1 className="uppercase bg-black text-white p-2">discharge summary</h1>
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
            <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/>

          </div>
          <div className="flex my-3">
            <span>
              Address :
            </span>
            <input type="text" className="border border-black  ml-3 px-2 flex-1" onChange={(e)=>change('address',e.target.value)}  value={obj.address}/>
          </div>
          <div className="flex my-3">
            <span>
              Date of Admission :
            </span>
            <span className="ml-3 flex-1">
              {ipd.date_of_admission.split('T')[0]}
            </span>
            <span>
              Date of Discharge :
            </span>
            <span className="ml-3 flex-1">
              {ipd.discharge_date.split('T')[0]}
            </span>
          </div>
          <div className="flex my-3">
            <span>
              Ref by Dr  :
            </span>
            <input type="text" className="border border-black  ml-3 px-2 flex-1"  onChange={(e)=>change('refByDr',e.target.value)}  value={obj.refByDr} />
          </div>

          <div className="flex flex-col">
            <span>Diagnosis</span>
            <textarea name="" id=""  rows="2" className="border border-black  px-2 flex-1" onChange={(e)=>change('diagnosis',e.target.value)}   value={obj.diagnosis} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Chief Complaint & History : </span>
            <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('chief',e.target.value)}   value={obj.chief} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Clinical Findings : </span>
            <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('clinical',e.target.value)}   value={obj.clinical} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Investigations : </span>
            <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('investigations',e.target.value)}  value={obj.investigations} ></textarea>
          </div>
          <div className="flex flex-col">
            <span>Treatement / Surgery / Delivery Notes : </span>
            <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('surgery',e.target.value)}  value={obj.surgery}></textarea>
          </div>
          <div className="flex flex-col">
            <span>Treatement Advised at the time of Discharge : </span>
            <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('treatement',e.target.value)}   value={obj.treatement}></textarea>
          </div>

          <div className="flex justify-center m-2">
            <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400" onClick={save}>Save</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SummaryIpd
