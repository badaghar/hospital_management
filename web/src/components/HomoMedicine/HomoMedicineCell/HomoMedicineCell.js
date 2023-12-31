import HomoMedicine from 'src/components/HomoMedicine/HomoMedicine'

export const QUERY = gql`
  query FindHomoMedicineById($id: Int!) {
    homoMedicine: homoMedicine(id: $id) {
      id
      name
      no
      potency
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>HomoMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ homoMedicine }) => {
  return <HomoMedicine homoMedicine={homoMedicine} />
}
