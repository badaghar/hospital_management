import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DoctorFeeForm from 'src/components/DoctorFee/DoctorFeeForm'

const CREATE_DOCTOR_FEE_MUTATION = gql`
  mutation CreateDoctorFeeMutation($input: CreateDoctorFeeInput!) {
    createDoctorFee(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewDoctorFeeQuery {
    users: users{
      id
      name
      email
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }) => {
  const [createDoctorFee, { loading, error }] = useMutation(
    CREATE_DOCTOR_FEE_MUTATION,
    {
      onCompleted: () => {
        toast.success('DoctorFee created')
        navigate(routes.doctorFees())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const onSave = (input) => {
    createDoctorFee({ variables: { input } })
  }
  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New DoctorFee</h2>
      </header>
      <div className="rw-segment-main">
        <DoctorFeeForm onSave={onSave} loading={loading} error={error} users={users} />
      </div>
    </div>
  )
}
