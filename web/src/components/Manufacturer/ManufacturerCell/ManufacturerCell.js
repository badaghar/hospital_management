import Manufacturer from 'src/components/Manufacturer/Manufacturer'

export const QUERY = gql`
  query FindManufacturerById($id: Int!) {
    manufacturer: manufacturer(id: $id) {
      id
      name
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Manufacturer not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturer }) => {
  return <Manufacturer manufacturer={manufacturer} />
}
