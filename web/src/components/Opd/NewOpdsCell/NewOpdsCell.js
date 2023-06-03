import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OpdForm from 'src/components/Opd/OpdForm'



const CREATE_OPD_MUTATION = gql`
  mutation CreateOpdMutation($input: CreateOpdInput!) {
    createOpd(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query NewOpdsQuery {
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
    users: users{
      id
      name
      email
      roles
    }
    doctorFees{
      id
      type
      amount
      userId

    }
    chargeses{
      name
      amount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ patients,users,doctorFees,chargeses }) => {
  const [createOpd, { loading, error }] = useMutation(CREATE_OPD_MUTATION, {
    onCompleted: () => {
      toast.success('Opd created')
      navigate(routes.opds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createOpd({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Opd</h2>
      </header>
      <div className="rw-segment-main">
        <OpdForm onSave={onSave} loading={loading} error={error} patients={patients} users={users} doctorFees={doctorFees} chargeses={chargeses} />
      </div>
    </div>
  )
}
