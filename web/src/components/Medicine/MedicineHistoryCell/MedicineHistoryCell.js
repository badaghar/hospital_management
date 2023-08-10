import { navigate, routes } from "@redwoodjs/router"
import { useLayoutEffect } from "react"

export const QUERY = gql`
  query FindMedicineHistoryQuery($time: DateTime!,$productId:Int!,$batch:String!) {
    medicineHistory: medicineHistory(time: $time,productId: $productId,batch: $batch) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ time,productId,medicineHistory }) => {

  useLayoutEffect(()=>{
    console.log('called')
    // console.log(medicineHistory)
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n',medicineHistory.id)

      // routes.PurchaseMedicine({ id: medicineHistory.id })
      // navigate(`PurchaseMedicine/${medicineHistory.id}`)
      navigate(routes.purchaseMedicine({ id: medicineHistory.id }));
  },[])


  return (
    <>

    </>
  )
}
