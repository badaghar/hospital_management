import { Link, routes } from '@redwoodjs/router'

import SaleMedicines from 'src/components/SaleMedicine/SaleMedicines'

export const QUERY = gql`
  query FindSaleMedicines {
    saleMedicines {
      id
      billNo
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
      patient{
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No saleMedicines yet. '}
      <Link to={routes.newSaleMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ saleMedicines }) => {
  return <SaleMedicines saleMedicines={saleMedicines} />
}
