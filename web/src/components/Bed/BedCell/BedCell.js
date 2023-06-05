import Bed from 'src/components/Bed/Bed'

export const QUERY = gql`
  query FindBedById($id: Int!) {
    bed: bed(id: $id) {
      id
      bed_name
      occupied
      created_at
      updated_at
      floorId
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bed not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bed }) => {
  return <Bed bed={bed} />
}
