import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import BirthCertificateForm from 'src/components/BirthCertificate/BirthCertificateForm'

const CREATE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation CreateBirthCertificateMutation(
    $input: CreateBirthCertificateInput!
  ) {
    createBirthCertificate(input: $input) {
      id
    }
  }
`

const NewBirthCertificate = () => {
  const [type,setType] = useState('Birth')
  const [createBirthCertificate, { loading, error }] = useMutation(
    CREATE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success(`${type} Certificate created`)
        navigate(routes.birthCertificates({type}))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    if(input['type'] == 1)
    {
      setType('Birth')
    }
    else if(input['type'] == 2)
    {
      setType('Dead')
    }


    createBirthCertificate({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New Birth/Dead Certificate
        </h2>
      </header>
      <div className="rw-segment-main">
        <BirthCertificateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBirthCertificate
