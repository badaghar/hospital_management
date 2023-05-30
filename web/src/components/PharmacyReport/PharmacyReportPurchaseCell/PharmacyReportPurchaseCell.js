import PurchaseMedicines from 'src/components/PurchaseMedicine/PurchaseMedicines'


export const QUERY = gql`
  query FindPharmacyReportPurchaseQuery($startDate: String!,$endDate: String!) {
    purchaseReport: purchaseReport(startDate: $startDate, endDate: $endDate) {
      data {
        id
      invoiceNo
      distributerId
      did{
        id
        name
      }
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      }
      totalSum
    },

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toString()} and {endDate.toString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ purchaseReport, startDate, endDate }) => {


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Purchase Amount  From {startDate.toString()} to {endDate.toString()} is <span className='font-bold'>
            ₹{purchaseReport.totalSum}
          </span>
        </span>

      </div>
      <PurchaseMedicines purchaseMedicines={purchaseReport.data} />



    </>
  )
}
