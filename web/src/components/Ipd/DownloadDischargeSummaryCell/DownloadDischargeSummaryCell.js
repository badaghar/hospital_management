export const QUERY = gql`
  query FindDownloadDischargeSummaryQuery($id: Int!) {
    downloadDischargeSummary: ipdSummary(id: $id) {
      id
      summary
      ipd{
        date_of_admission
        discharge_date
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
  console.log(downloadDischargeSummary.ipd.IpdConsultation)

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
        className="border-black border"
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
                  <span className="ml-3 flex-1">
                    {downloadDischargeSummary.ipd.patient.name.split('(')[0]}
                  </span>
                  <span >
                    Age :
                  </span>
                  <span className="mx-3">
                    {downloadDischargeSummary.ipd.patient.age}
                  </span>
                  <span >
                    Sex :
                  </span>
                  <span className="mx-3 w-24">
                    {downloadDischargeSummary.ipd.patient.gender}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/> */}

                </div>
                <div className="flex my-3">
                  <span>
                    Address :
                  </span>
                  <span className="mx-3">
                    {downloadDischargeSummary.summary.address}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2 flex-1" onChange={(e)=>change('address',e.target.value)}  value={obj.address}/> */}
                </div>



                <div className="flex justify-between">
                  <span>
                    PID NO :
                  </span>
                  <span className="ml-3 ">
                    SHM6745{downloadDischargeSummary.ipd.patient.name.split('(')[1].split(')')[0].trim()}
                  </span>
                  <span >
                    IP. NO :
                  </span>
                  <span className="mx-3">
                    SHM7960{downloadDischargeSummary.id}
                  </span>
                  <span >
                    Ward :
                  </span>
                  <span className="mx-3 w-24">
                    {/* {downloadDischargeSummary.ipd.Bed.bed_name} */}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2" onChange={(e)=>change('gender',e.target.value)} value={obj.gender}/> */}

                </div>










                <div className="flex my-3 justify-between">
                  <div>

                    <span>
                      Date of Admission :
                    </span>
                    <span className="ml-3 ">
                      {downloadDischargeSummary.ipd.date_of_admission.split('T')[0]}
                    </span>
                  </div>
                  <div>

                    <span>
                      Date of Discharge :
                    </span>
                    <span className="ml-3 ">
                      {downloadDischargeSummary.ipd.discharge_date.split('T')[0]}
                    </span>
                  </div>
                </div>
                <div className="flex my-3">
                  <span>
                    Ref by Dr  :
                  </span>
                  <span className="mx-3">
                    {downloadDischargeSummary.summary.refByDr}
                  </span>
                  {/* <input type="text" className="border border-black  ml-3 px-2 flex-1"  onChange={(e)=>change('refByDr',e.target.value)}  value={obj.refByDr} /> */}
                </div>

                <div className="flex my-3">
                  <span>
                    Consultante (S)  :
                  </span>

                  <div className="flex flex-wrap space-x-2 ">

                    {
                      downloadDischargeSummary.ipd.IpdConsultation?.map((ele) => {
                        return (

                          <div>
                            Dr. {ele.consultation_doctor}

                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                <div className="flex flex-col">
                  <span>Diagnosis</span>
                  <span>
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
                  <span className="">
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
                  <span className="">
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
                  <span className="">
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
                  <span>
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
                  <span>
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
