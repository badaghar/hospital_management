import IpdLabCharges from 'src/components/IpdLabCharges/IpdLabCharges'

export const QUERY = gql`
  query FindIpdLabChargesById($id: Int!) {
    ipdLabCharges: ipdLabCharges(id: $id) {
      id
      lab_name
      ipdId
      amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdLabCharges not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdLabCharges }) => {
  return <IpdLabCharges ipdLabCharges={ipdLabCharges} />
}
