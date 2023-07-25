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
  return (
    <>
      <section
        className="border-black border"
        style={{ width: '21cm', height: '29.7cm', padding: '1cm 1cm' }}
      >
        <section
          className=""
          style={{ width: '18cm', height: '27.1cm' }}
        >
          <div style={{ padding: '' }}>
            <img src="/sd.jpg" alt="" srcset="" />
          </div>
          <div className="m-3">
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
                    {downloadDischargeSummary.summary.gender}
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

                <div className="flex flex-col h-24">
                  <span>Diagnosis</span>
                  <span>
                    {downloadDischargeSummary.summary.diagnosis}
                  </span>
                  {/* <textarea name="" id=""  rows="2" className="border border-black  px-2 flex-1" onChange={(e)=>change('diagnosis',e.target.value)}   value={obj.diagnosis} ></textarea> */}
                </div>
                <div className="flex flex-col h-60">
                  <span>Chief Complaint & History : </span>
                  <span className="">
                    {downloadDischargeSummary.summary.chief}
                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('chief',e.target.value)}   value={obj.chief} ></textarea> */}
                </div>
                <div className="flex flex-col h-56">
                  <span>Clinical Findings : </span>
                  <span className="">
                    {downloadDischargeSummary.summary.clinical}
                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('clinical',e.target.value)}   value={obj.clinical} ></textarea> */}
                </div>
                <div className="flex flex-col">
                  <span>Investigations : </span>
                  <span className="">
                    {downloadDischargeSummary.summary.investigations}
                  </span>
                  {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('investigations',e.target.value)}  value={obj.investigations} ></textarea> */}
                </div>



              </div>

            </div>

          </div>
        </section>
      </section >

      <section
        className="border-black border"
        style={{ width: '21cm', height: '29.7cm', padding: '1cm 1cm' }}
      >
        <section
          className=""
          style={{ width: '18cm', height: '27.1cm' }}
        >
          <div className="flex flex-col h-96">
            <span>Treatement / Surgery / Delivery Notes : </span>
            <span>
            {downloadDischargeSummary.summary.surgery}

            </span>
            {/* <textarea name="" id=""  rows="7" className="border border-black  px-2 flex-1" onChange={(e)=>change('surgery',e.target.value)}  value={obj.surgery}></textarea> */}
          </div>
          <div className="flex flex-col">
            <span>Treatement Advised at the time of Discharge : </span>
            <span>
            {downloadDischargeSummary.summary.treatement}
            </span>

          </div>


        </section>
      </section >

    </>
  )
}
