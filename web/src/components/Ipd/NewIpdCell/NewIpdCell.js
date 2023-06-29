import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdForm from 'src/components/Ipd/IpdForm'

const CREATE_IPD_MUTATION = gql`
  mutation CreateIpdMutation($input: CreateIpdInput!) {
    createIpd(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewIpdQuery {
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
    floors{
      id
      floor_name
    }
    beds{
      id
      bed_name
      occupied
      floor{
        id
        floor_name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ patients,users,doctorFees,chargeses,beds,floors,type }) => {
  const [createIpd, { loading, error }] = useMutation(CREATE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success(type + ' Patient Info Added')
      navigate(routes.ipds({type}))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createIpd({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Ipd</h2>
      </header>
      <div className="rw-segment-main">
        <IpdForm onSave={onSave} loading={loading} error={error} patients={patients} users={users} doctorFees={doctorFees} chargeses={chargeses} type={type}
        floors={floors} beds={beds}
        />
      </div>
    </div>
  )
}
