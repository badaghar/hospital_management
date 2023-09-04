export const QUERY = gql`
  query FindDownloadDischargeSummaryQuery($id: Int!) {
    downloadDischargeSummary: ipdSummary(id: $id) {
      id
      summary
      ipd{
        date_of_admission
        discharge_date
        consultant_doctor
        patient{
        name
        age
        address
        phone_no
        gender
        }
        IpdConsultation{
          consultation_doctor
          consultation_type
          amount
        }

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ downloadDischargeSummary }) => {
  console.log(downloadDischargeSummary.ipd.consultant_doctor)

  const addNewLine = (value) => {
    // if(typeof val!=='string'){
    //   return []
    // }
    let val
    try {
      val = value.split('\n')

    } catch (error) {
      val = []

    }
    return val
  }



  return (
    <>
      <section
        className="border-black border font-bold"
        style={{ width: '21cm', height: '29.7cm', padding: '1cm 1cm' }}
      >
        <section
          className="relative"
          style={{ width: '18cm', height: '27.1cm' }}
        >
          <div style={{ padding: '' }}>
            <img src="/sd.jpg" alt="" srcset="" />
          </div>
          <div className="m-3 ">
            <div className="flex justify-center">

            </div>
            <div className="my-3">
              <div>
                <div className="flex">
                  <span>
                    Name :
                  </span>
                  <span className="ml-3 flex-1 font-normal">
                    {downloadDischargeSummary.ipd.patient.name.split('(')[0]}
                  </span>
                  <span >
                    Age :
                  </span>
                  <span className="mx-3 font-normal">
                    {downloadDischargeSummary.ipd.patient.age}
                  </span>
                  <span >
                    Sex :
                  </span>
                  <span className="mx-3  font-normal">
                    {downloadDischargeSummary.ipd.patient.gender}
                  </span>
                  <span >
                    Ph .No :
                  </span>
                  <span className="mx-3 font-normal">
                    {downloadDischargeSummary.ipd.patient.phone_no}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/> */}

                </div>
                <div className="flex my-3">
                  <span>
                    Address :
                  </span>
                  <span className="mx-3 font-normal">
                    {downloadDischargeSummary.summary.address}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2 flex-1" onChange={(e)=>change('address',e.target.value)}  value={obj.address}/> */}
                </div>



                <div className="flex justify-between flex-wrap">
                  <span>
                    PID NO :
                  </span>
                  <span className="ml-3 font-normal">
                    SHM6745{downloadDischargeSummary.ipd.patient.name.split('(')[1].split(')')[0].trim()}
                  </span>
                  <span >
                    IP. NO :
                  </span>
                  <span className="mx-3 font-normal">
                    SHM7960{downloadDischargeSummary.id}
                  </span>

                  {/* <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/> */}

                </div>

                <div className="flex my-3">
                <span >
                    Ward :
                  </span>
                  <span className="mx-3 font-normal">
                    {
                      downloadDischargeSummary.ipd.consultant_doctor?.split('----')[1]?.split('Floor')[0]?.split('Bed')[1]?.trim()
                      // downloadDischargeSummary.ipd.consultant_doctor.split('----')[1]

                    }
                    {/* {downloadDischargeSummary.ipd.Bed.bed_name} */}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2 flex-1"  onChange={(e)=>change('refByDr',e.target.value)}  value={obj.refByDr} /> */}
                </div>










                <div className="flex my-3 justify-between">
                  <div>

                    <span>
                      Date of Admission :
                    </span>
                    <span className="ml-3 font-normal ">
                      {
                      // downloadDischargeSummary.ipd.date_of_admission.split('T')[0]
                      downloadDischargeSummary.ipd.date_of_admission.split('T')[0].split('-')[2]+'-'+
                      downloadDischargeSummary.ipd.date_of_admission.split('T')[0].split('-')[1]+'-'+
                      downloadDischargeSummary.ipd.date_of_admission.split('T')[0].split('-')[0]

                      }
                    </span>
                  </div>
                  <div>

                    <span>
                      Date of Discharge :
                    </span>
                    <span className="ml-3 font-normal">
                      {
                      // downloadDischargeSummary.ipd.discharge_date.split('T')[0]
                      downloadDischargeSummary.ipd.discharge_date.split('T')[0].split('-')[2]+'-'+
                      downloadDischargeSummary.ipd.discharge_date.split('T')[0].split('-')[1]+'-'+
                      downloadDischargeSummary.ipd.discharge_date.split('T')[0].split('-')[0]
                      }
                    </span>
                  </div>
                </div>
                <div className="flex my-3">
                  <span>
                    Ref by Dr  :
                  </span>
                  <span className="mx-3 font-normal">
                    {downloadDischargeSummary.summary.refByDr}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2 flex-1"  onChange={(e)=>change('refByDr',e.target.value)}  value={obj.refByDr} /> */}
                </div>

                <div className="flex my-3">
                  <span>
                    Consultant (S)  :
                  </span>
                  <span className="mx-3 font-normal">
                    {downloadDischargeSummary.ipd.consultant_doctor.split('----')[0]}
                  </span>


                  {/* <div className="flex flex-wrap space-x-2 font-normal">

                    {
                      downloadDischargeSummary.ipd.IpdConsultation?.map((ele) => {
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
                  <span className="font-normal">
                    {/* {downloadDischargeSummary.summary.diagnosis} */}
                    {addNewLine(downloadDischargeSummary.summary.diagnosis)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }
                  </span>
                  {/* <textarea name="" id=""  rows="2" className="border border-black  px-2 flex-1" onChange={(e)=>change('diagnosis',e.target.value)}   value={obj.diagnosis} ></textarea> */}
                </div>
                <div className="flex flex-col">
                  <span>Chief Complaint & History : </span>
                  <span className="font-normal">
                    {/* {downloadDischargeSummary.summary.chief} */}
                    {addNewLine(downloadDischargeSummary.summary.chief)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }

                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('chief',e.target.value)}   value={obj.chief} ></textarea> */}
                </div>
                <div className="flex flex-col">
                  <span>Clinical Findings : </span>
                  <span className="font-normal">
                    {/* {downloadDischargeSummary.summary.clinical} */}
                    {addNewLine(downloadDischargeSummary.summary.clinical)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }
                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('clinical',e.target.value)}   value={obj.clinical} ></textarea> */}
                </div>
                <div className="flex flex-col">
                  <span>Investigations : </span>
                  <span className="font-normal">
                    {/* {downloadDischargeSummary.summary.investigations} */}
                    {addNewLine(downloadDischargeSummary.summary.investigations)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }
                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('investigations',e.target.value)}  value={obj.investigations} ></textarea> */}
                </div>

                <div className="flex flex-col">
                  <span>Treatement / Surgery / Delivery Notes : </span>
                  <span className="font-normal">
                    {addNewLine(downloadDischargeSummary.summary.surgery)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }

                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('surgery',e.target.value)}  value={obj.surgery}></textarea> */}
                </div>

                <div className="flex flex-col">
                  <span>Treatement Advised at the time of Discharge : </span>
                  <span className="font-normal">
                    {addNewLine(downloadDischargeSummary.summary.treatement)?.map((ele, ind, arr) => {
                      return (
                        <>
                          {ele.trim()}
                          {ind < arr.length - 1 && <br />}
                        </>
                      )
                    })
                    }
                  </span>

                </div>



                <div className="absolute bottom-0 w-full">
                  <div className="grid grid-cols-2 ">
                    <div>
                      <span>
                        consultant
                      </span>
                      <div>
                        Date :
                      </div>
                    </div>



                    <div className="justify-self-end">

                      <span>
                        Registrar/Resident M.O

                      </span>
                      <div>
                        Ph No:
                      </div>
                    </div>




                  </div>

                </div>



              </div>

            </div>






          </div>
        </section>
      </section >


    </>
  )
}
