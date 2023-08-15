import { Link, routes } from '@redwoodjs/router'

import ReturnExpiryMedicines from 'src/components/ReturnExpiryMedicine/ReturnExpiryMedicines'

export const QUERY = gql`
  query FindReturnExpiryMedicines {
    returnExpiryMedicines {
      id
      distributerId
      medicine
      return_med
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No returnExpiryMedicines yet. '}
      <Link to={routes.newReturnExpiryMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnExpiryMedicines }) => {
  return <ReturnExpiryMedicines returnExpiryMedicines={returnExpiryMedicines} />
}
