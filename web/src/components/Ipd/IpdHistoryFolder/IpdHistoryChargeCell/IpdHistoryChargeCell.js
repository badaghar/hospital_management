import { useEffect, useState } from "react"

export const QUERY = gql`
  query FindIpdHistoryChargeQuery($id: Int!) {
    ipdHistoryCharge: patient(id: $id) {
      id
      Ipd{
        date_of_admission
        IpdCharges{
          id
        charge_type
        charge
        quantity
        total
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

export const Success = ({ ipdHistoryCharge }) => {
  const [array, setArray] = useState(ipdHistoryCharge.Ipd)
  useEffect(() => {
    let arr = [...ipdHistoryCharge.Ipd]
    arr.reverse()
    console.log(arr)
    setArray(arr)
  }, [ipdHistoryCharge])
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
                  <div className={` grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2 ${ipd.patientType == 'OPD' ? 'grid-cols-5' : 'grid-cols-4 '}`}>

                    <div className="flex col-span-1 justify-center">Charges Type</div>
                    <div className="flex col-span-1 justify-center">Amount</div>
                    <div className="flex col-span-1 justify-center">Quantity</div>
                    <div className="flex col-span-1 justify-center">Net Amount</div>
                    {
                      ipd.IpdCharges.map((item) => {
                        return (
                          <>
                            <div className="flex col-span-1 justify-center">{item.charge_type}</div>
                            <div className="flex col-span-1 justify-center">{item.charge}</div>
                            <div className="flex col-span-1 justify-center">{item.quantity}</div>
                            <div className="flex col-span-1 justify-center">{item.total}</div>
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
