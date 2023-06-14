import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'

import PurchaseMedicines from 'src/components/PurchaseMedicine/PurchaseMedicines'

export const QUERY = gql`
  query FindPurchaseMedicines {
    purchaseMedicines {
      id
      invoiceNo
      distributerId
      did{
        id
        name
      }
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No purchaseMedicines yet. '}
      <Link to={routes.newPurchaseMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchaseMedicines }) => {

  const [obj,setObj] = useState({})
  // useEffect(()=>{
  //   setObj({...purchaseMedicines,'sgst':purchaseMedicines})

  // },[])
  return <PurchaseMedicines purchaseMedicines={purchaseMedicines} />
}
