import { useEffect, useState } from "react"

export const QUERY = gql`
  query FindIpdHistoryDocumentQuery($id: Int!) {
    ipdHistoryDocument: patient(id: $id) {
      id
      Ipd{
        date_of_admission
        File{
        id
        title
        url
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

export const Success = ({ ipdHistoryDocument }) => {
  const [array, setArray] = useState(ipdHistoryDocument.Ipd)
  useEffect(() => {
    let arr = [...ipdHistoryDocument.Ipd]
    arr.reverse()
    console.log(arr)
    setArray(arr)
  }, [ipdHistoryDocument])
  // return <div>{JSON.stringify(ipdHistoryDocument)}</div>
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
                <div className=" grid grid-cols-1 grid-flow-row gap-x-2 gap-y-1">

                <div className="flex col-span-1 justify-center">Name </div>
            {/* <div className="flex col-span-1 justify-center">url</div> */}

                    {
                      ipd.File.map((item) => {
                        return (
                          <>
                          <div className="flex col-span-1 justify-center">
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
