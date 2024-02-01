import LabPriceList from 'src/components/LabPriceList/LabPriceList'

export const QUERY = gql`
  query FindLabPriceListById($id: Int!) {
    labPriceList: labPriceList(id: $id) {
      id
      test_list
      created_at
      updated_at
      extra
      labId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>LabPriceList not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labPriceList }) => {
  return <LabPriceList labPriceList={labPriceList} />
}
