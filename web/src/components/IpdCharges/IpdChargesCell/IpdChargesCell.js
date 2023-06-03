import IpdCharges from 'src/components/IpdCharges/IpdCharges'

export const QUERY = gql`
  query FindIpdChargesById($id: Int!) {
    ipdCharges: ipdCharges(id: $id) {
      id
      charge_type
      charge
      quantity
      total
      created_at
      updated_at
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdCharges not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdCharges }) => {
  return <IpdCharges ipdCharges={ipdCharges} />
}
