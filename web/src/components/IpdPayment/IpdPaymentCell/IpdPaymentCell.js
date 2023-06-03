import IpdPayment from 'src/components/IpdPayment/IpdPayment'

export const QUERY = gql`
  query FindIpdPaymentById($id: Int!) {
    ipdPayment: ipdPayment(id: $id) {
      id
      amount
      payment_mode
      ipdId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdPayment not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdPayment }) => {
  return <IpdPayment ipdPayment={ipdPayment} />
}
