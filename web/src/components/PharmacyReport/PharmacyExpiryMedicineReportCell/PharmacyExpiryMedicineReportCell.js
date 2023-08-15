import { useLayoutEffect, useState } from "react"
import MedicinesList from "src/components/Medicine/Medicines/Medicines"

export const QUERY = gql`
  query FindPharmacyExpiryMedicineReportQuery {
    pharmacyExpiryMedicineReport: pharmacyExpiryMedicineReport{
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
      pid{
        name
      }

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Expiry Medicine Yet</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ pharmacyExpiryMedicineReport }) => {
  const [show,setShow] = useState(false)
  useLayoutEffect(()=>{
    const timeoutId = setTimeout(() => {
      setShow(true)
    }, 100);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  })
  console.log(pharmacyExpiryMedicineReport)
  return (
  <div className="bg-white text-black">
   {
   show &&
   <MedicinesList medicines={pharmacyExpiryMedicineReport} bill={false}  />}


  </div>

  )
}
