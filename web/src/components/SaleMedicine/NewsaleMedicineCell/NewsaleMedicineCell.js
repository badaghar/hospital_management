import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import axios from 'axios'
import { useState } from 'react'

import SaleMedicineForm from 'src/components/SaleMedicine/SaleMedicineForm'

const CREATE_SALE_MEDICINE_MUTATION = gql`
  mutation CreateSaleMedicineMutation($input: CreateSaleMedicineInput!) {
    createSaleMedicine(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewsaleMedicineQuery {
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
      pid{
        name
      }

    }
    patients {
      id
      name
      age
      phone_no
      gender
      address
      created_at
      updated_at
    }
    users{
      id
      name
      roles

    }

    compositions{
      id
      name
      ProductToComposition{
        pid{
          id
          name
        }
      }
    }



  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ medicines, patients, users,compositions }) => {


  function getPDF(id) {
    return axios.get(
      `/.redwood/functions/downloadSaleMedicineBill?id=` +
      id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = (id) => {
    return getPDF(id) // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        var blobURL = URL.createObjectURL(blob)
        var iframe =  document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
     iframe.onload = function() {
      setTimeout(function() {
        iframe.focus()
        iframe.contentWindow.print()
      }, 1)
    }
        toast.success('Download Complete')
      })
      .catch((err) => {
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }




  const [isSave, setIssave] = useState()
  const [createSaleMedicine, { loading, error }] = useMutation(
    CREATE_SALE_MEDICINE_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('SaleMedicine created')
        if (isSave) {
          navigate(routes.saleMedicines())

        }
        else {
          printPDF(data.createSaleMedicine.id)
          navigate(routes.saleMedicines())

          // navigate(routes.viewSaleMedicine({ id: data.createSaleMedicine.id }))
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, isSave) => {
    setIssave(isSave)
    createSaleMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SaleMedicine</h2>
      </header>
      <div className="rw-segment-main">
        <SaleMedicineForm onSave={onSave} loading={loading} error={error}
          patients={patients} medicines={medicines} users={users}
          compositions={compositions}
        />
      </div>
    </div>
  )
}
