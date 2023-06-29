import IpdOperationPayment from 'src/components/IpdOperationPayment/IpdOperationPayment'

export const QUERY = gql`
  query FindIpdOperationPaymentById($id: Int!) {
    ipdOperationPayment: ipdOperationPayment(id: $id) {
      id
      operation_name
      amount
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdOperationPayment not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdOperationPayment }) => {
  return <IpdOperationPayment ipdOperationPayment={ipdOperationPayment} />
}
