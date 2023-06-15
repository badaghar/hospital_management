import PaymentPurchaseMedicinesList from "src/components/PaymentPurchaseMedicine/PaymentPurchaseMedicines/PaymentPurchaseMedicines"

export const QUERY = gql`
  query FindpharmacyPaymentQuery($id: Int!,$startDate: String!,$endDate: String!){
    pharmacyPayment: pharmacyPayment(id: $id,startDate: $startDate, endDate: $endDate) {
      data{
        id
        purchaseMedicine{
          invoiceNo
        }
        total
        paid
        balance
        method
        remark
        created_at
        updated_at



      }
      totalSum
    }
  }
`

export const Loading = () => <div>Loading...</div>


export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toLocaleDateString()} and {endDate.toLocaleDateString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)


export const Success = ({ pharmacyPayment,startDate,endDate }) => {
  return (
    <>
          <div className='text-white p-10 text-center'>
        <span>
          Total Paymnet Done From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{pharmacyPayment.totalSum}
          </span>
        </span>

      </div>
      <div className='bg-white text-black'>
      <PaymentPurchaseMedicinesList paymentPurchaseMedicines={pharmacyPayment.data} />
      </div>
    </>
  )
}
