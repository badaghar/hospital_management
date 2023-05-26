import { Link, routes } from '@redwoodjs/router'

import Medicines from 'src/components/Medicine/Medicines'

export const QUERY = gql`
  query FindMedicines {
    medicines {
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No medicines yet. '}
      <Link to={routes.newMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ medicines }) => {
  return <Medicines medicines={medicines} />
}
