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

  No Report Found B/w {startDate.toString()} and {endDate.toString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)


export const Success = ({ pharmacyPayment,startDate,endDate }) => {
  return (
    <>
          <div className='text-white p-10 text-center'>
        <span>
          Total Paymnet Done From {startDate.toString()} to {endDate.toString()} is <span className='font-bold'>
            ₹{pharmacyPayment.totalSum}
          </span>
        </span>

      </div>
      <PaymentPurchaseMedicinesList paymentPurchaseMedicines={pharmacyPayment.data} />
    </>
  )
}
