import LabCharges from 'src/components/LabCharges/LabCharges'

export const QUERY = gql`
  query FindLabChargesById($id: Int!) {
    labCharges: labCharges(id: $id) {
      id
      name
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>LabCharges not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labCharges }) => {
  return <LabCharges labCharges={labCharges} />
}
