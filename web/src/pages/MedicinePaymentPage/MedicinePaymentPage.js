import { DateField, FieldError, Form, Label, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/dist/toast'
import { toast } from '@redwoodjs/web/toast'

import { useEffect, useState } from 'react'
import PharmacyPaymentBodyCell from 'src/components/PharmacyPayment/PharmacyPaymentBodyCell'
import PharmacyPaymentHeaderCell from 'src/components/PharmacyPayment/PharmacyPaymentHeaderCell'
const MedicinePaymentPage = () => {
  const [searchId, setSearchId] = useState(0)
  const changeId = (value)=>{
    setSearchId(value)
  }

  return (
    <>
      <div>
        <div className='p-10 text-white'>
          <div >
            { <PharmacyPaymentHeaderCell changeId={changeId} />}
          </div>


        </div>

        <div>
            <PharmacyPaymentBodyCell id={searchId} />
        </div>


      </div>
    </>
  )
}

export default MedicinePaymentPage
