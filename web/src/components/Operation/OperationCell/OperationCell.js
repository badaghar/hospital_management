import Operation from 'src/components/Operation/Operation'

export const QUERY = gql`
  query FindOperationById($id: Int!) {
    operation: operation(id: $id) {
      id
      operation_name
      date
      consultant_doctor
      remark
      result
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Operation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ operation }) => {
  return <Operation operation={operation} />
}
