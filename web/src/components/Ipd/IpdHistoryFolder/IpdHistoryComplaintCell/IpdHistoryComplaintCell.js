import { useEffect, useState } from "react"

export const QUERY = gql`
  query FindIpdHistoryComplaintQuery($id: Int!) {
    ipdHistoryComplaint: patient(id: $id) {
      id
      Ipd{
        date_of_admission
        Complaints{
          id
          note
        }
        File{
        id
        title
        url
      }
      IpdPrescription{
        id
        medicine
        dosage
        timing
        frequency
        duration
        note
        quantity
      }
      IpdHomoPrescription{
        id
        medicine
        dosage
        timing
        frequency
        duration
        note
        rate
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

export const Success = ({ ipdHistoryComplaint }) => {
  const [array, setArray] = useState(ipdHistoryComplaint.Ipd)
  useEffect(() => {
    let arr = [...ipdHistoryComplaint.Ipd]
    arr.reverse()
    console.log(arr)
    setArray(arr)
  }, [ipdHistoryComplaint])
  return (
    <>
      <div className="mt-4 p-4">
        {
          array.map((ipd) => {
            return (
              <>
                <div className="text-xl font-bold flex justify-center">
                  <span>

                    Date :- {ipd.date_of_admission.split('T')[0]}
                  </span>
                </div>

                <div>


                  {
                    ipd.Complaints.map((com) => {
                      return (
                        <>
                          <span className="font-bold">Complaints</span>
                          <div dangerouslySetInnerHTML={{ __html: com.note }} />
                          {/* {com.note} */}
                        </>
                      )
                    })
                  }

                </div>

                <span className="font-bold">Prescription</span>

                <div className="p-2 w-full shadow-sm bg-white ">
                  <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">

                    <div className="flex col-span-1 justify-center">Medicine </div>
                    <div className="flex col-span-1 justify-center">Dosage</div>
                    <div className="flex col-span-1 justify-center">Quantity/Amount</div>
                    {/* <div className="flex col-span-1 justify-center">Timing</div> */}
                    {/* <div className="flex col-span-1 justify-center">Frequency</div> */}
                    {/* <div className="flex col-span-1 justify-center">Duration</div> */}
                    {
                      ipd.IpdPrescription.map((item) => {
                        return (
                          <>
                            <div className="flex col-span-1 justify-center">{item.medicine}</div>
                            <div className="flex col-span-1 justify-center">{item.dosage}</div>
                            {/* <div className="flex col-span-1 justify-center">{item.timing}</div> */}
                            {/* <div className="flex col-span-1 justify-center">{item.frequency}</div> */}
                            {/* <div className="flex col-span-1 justify-center">{item.duration}</div> */}
                            <div className="flex col-span-1 justify-center" > Quantity :- {item.quantity}</div>
                            {<div className="flex col-span-3 justify-center" > {item.note && 'Note :-'} {item.note}</div>}
                          </>
                        )
                      })
                    }
                    {
                      ipd.IpdHomoPrescription.map((item, index) => {
                        return (
                          <>
                            <div className="flex col-span-1 justify-center">{item.medicine}</div>
                            <div className="flex col-span-1 justify-center">{item.dosage}</div>
                            {/* <div className="flex col-span-1 justify-center">{item.timing}</div> */}
                            {/* <div className="flex col-span-1 justify-center">{item.frequency}</div> */}
                            {/* <div className="flex col-span-1 justify-center">{item.duration}</div> */}
                            <div className="flex col-span-1 justify-center" > MRP :- {item.rate}</div>
                            {<div className="flex col-span-3 justify-center" > {item.note && 'Note :-'} {item.note}</div>}
                          </>
                        )
                      })
                    }
                  </div>
                </div>

                <div className=" w-full shadow-sm bg-white ">
                  <div className=" grid grid-cols-1 grid-flow-row gap-x-2 gap-y-1">
                    <span className="font-bold">Documents</span>

                    {/* <div className="flex col-span-1 ">Name </div> */}
                    {/* <div className="flex col-span-1 justify-center">url</div> */}

                    {
                      ipd.File.map((item) => {
                        return (
                          <>
                            <div className="flex col-span-1 ">
                              <a href={item.url} target='_blank'>{item.title}</a>
                            </div>


                          </>
                        )
                      })
                    }
                  </div>
                </div>

              </>
            )
          })
        }
      </div>
    </>
  )
}
