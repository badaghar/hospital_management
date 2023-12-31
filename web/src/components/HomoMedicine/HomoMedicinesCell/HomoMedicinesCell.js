import { Link, routes } from '@redwoodjs/router'

import HomoMedicines from 'src/components/HomoMedicine/HomoMedicines'

export const QUERY = gql`
  query FindHomoMedicines {
    homoMedicines {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No homoMedicines yet. '}
      <Link to={routes.newHomoMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ homoMedicines }) => {
  return <HomoMedicines homoMedicines={homoMedicines} />
}
