import ManufacturerPurchaseMedicinesList from "src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicines/ManufacturerPurchaseMedicines"
import MedicinesList from "src/components/Medicine/Medicines/Medicines"

export const QUERY = gql`
  query FindPharmacyManufacturerQuery($id: Int!,$startDate: String!,$endDate: String!) {
    manufacturerReport: manufacturerReport(id: $id,startDate: $startDate, endDate: $endDate) {
      data {
        id
        productId
        pid{
          name
          mid{
            name
          }
        }
        batch
        paid_qty
        free_qty
        pack
        exp
        mrp
        rate
        dis
        sgst
        cgst
        amount
        net_amount
        created_at
        updated_at
      }
      totalSum
      gstSum
    },

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toLocaleDateString()} and {endDate.toLocaleDateString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ manufacturerReport, startDate, endDate }) => {


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Purchase Amount From Manufacturer {manufacturerReport.data[0]?.pid?.mid?.name} From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} Without Gst is <span className='font-bold'>
            ₹{parseFloat(manufacturerReport.totalSum).toFixed(2)} and with Gst is ₹{parseFloat(manufacturerReport.gstSum).toFixed(2)}
          </span>
        </span>

      </div>
      <div className='bg-white text-black'>
        <ManufacturerPurchaseMedicinesList manufacturerPurchaseMedicines={manufacturerReport.data} />

      </div>



    </>
  )
}
