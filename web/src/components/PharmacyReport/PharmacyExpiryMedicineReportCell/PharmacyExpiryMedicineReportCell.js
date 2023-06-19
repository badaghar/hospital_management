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
  console.log(pharmacyExpiryMedicineReport)
  return (
  <div className="bg-white text-black">
    <MedicinesList medicines={pharmacyExpiryMedicineReport} />

  </div>

  )
}
