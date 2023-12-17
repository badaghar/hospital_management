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
  const [array,setArray] = useState(ipdHistoryComplaint.Ipd)
  useEffect(()=>{
    let arr = [...ipdHistoryComplaint.Ipd]
    arr.reverse()
    console.log(arr)
    setArray(arr)
  },[ipdHistoryComplaint])
  return (
    <>
    <div className="mt-4 p-4">
      {
        array.map((ipd)=>{
          return (
            <>
              <div className="text-xl font-bold flex justify-center">
                <span>

                Date :- {ipd.date_of_admission.split('T')[0]}
                </span>
              </div>

              <div>
                {
                  ipd.Complaints.map((com)=>{
                    return(
                      <>
                      <div dangerouslySetInnerHTML={{ __html: com.note }} />
                        {/* {com.note} */}
                      </>
                    )
                  })
                }
              </div>

            </>
          )
        })
      }
    </div>
    </>
  )
}
