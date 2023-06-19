import { Link, routes } from '@redwoodjs/router'

import ManufacturerPurchaseMedicines from 'src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicines'

export const QUERY = gql`
  query FindManufacturerPurchaseMedicines {
    manufacturerPurchaseMedicines {
      id
      productId
      pid{
        name
      }
      batch
      paid_qty
      free_qty
      pack
      exp
      mrp
      rate
      dis
      sgst
      cgst
      amount
      net_amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No manufacturerPurchaseMedicines yet. '}
      <Link to={routes.newManufacturerPurchaseMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturerPurchaseMedicines }) => {
  return (
    <ManufacturerPurchaseMedicines
      manufacturerPurchaseMedicines={manufacturerPurchaseMedicines}
    />
  )
}
