import { Link, routes } from '@redwoodjs/router'

import LabPriceLists from 'src/components/LabPriceList/LabPriceLists'

export const QUERY = gql`
  query FindLabPriceLists {
    labPriceLists {
      id
      test_list
      created_at
      updated_at
      extra
      labId
      lab{
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No labPriceLists yet. '}
      <Link to={routes.newLabPriceList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ labPriceLists }) => {
  return <LabPriceLists labPriceLists={labPriceLists} />
}
