import { useEffect, useState } from "react"

export const QUERY = gql`
  query FindIpdHistoryPrescriptionQuery($id: Int!) {
    ipdHistoryPrescription:patient(id: $id) {
      id
      Ipd{
        date_of_admission
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

export const Success = ({ ipdHistoryPrescription }) => {
  const [array, setArray] = useState(ipdHistoryPrescription.Ipd)
  useEffect(() => {
    let arr = [...ipdHistoryPrescription.Ipd]
    arr.reverse()
    console.log(arr)
    setArray(arr)
  }, [ipdHistoryPrescription])
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

                <div className="p-2 w-full shadow-sm bg-white ">
                  <div className=" grid grid-cols-5 grid-flow-row gap-x-2 gap-y-2">

                    <div className="flex col-span-1 justify-center">Medicine </div>
                    <div className="flex col-span-1 justify-center">Dosage</div>
                    <div className="flex col-span-1 justify-center">Timing</div>
                    <div className="flex col-span-1 justify-center">Frequency</div>
                    <div className="flex col-span-1 justify-center">Duration</div>
                    {
                      ipd.IpdPrescription.map((item) => {
                        return (
                          <>
                            <div className="flex col-span-1 justify-center">{item.medicine}</div>
                            <div className="flex col-span-1 justify-center">{item.dosage}</div>
                            <div className="flex col-span-1 justify-center">{item.timing}</div>
                            <div className="flex col-span-1 justify-center">{item.frequency}</div>
                            <div className="flex col-span-1 justify-center">{item.duration}</div>
                            {<div className="flex col-span-4 justify-center" > {item.note && 'Note :-'} {item.note}</div>}
                            <div className="flex col-span-1 justify-center" > Quantity :- {item.quantity}</div>
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
                            <div className="flex col-span-1 justify-center">{item.timing}</div>
                            <div className="flex col-span-1 justify-center">{item.frequency}</div>
                            <div className="flex col-span-1 justify-center">{item.duration}</div>
                            {<div className="flex col-span-4 justify-center" > {item.note && 'Note :-'} {item.note}</div>}
                            <div className="flex col-span-1 justify-center" > MRP :- {item.rate}</div>
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
