import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdSummaryForm from 'src/components/IpdSummary/IpdSummaryForm'

const CREATE_IPD_SUMMARY_MUTATION = gql`
  mutation CreateIpdSummaryMutation($input: CreateIpdSummaryInput!) {
    createIpdSummary(input: $input) {
      id
    }
  }
`

const NewIpdSummary = () => {
  const [createIpdSummary, { loading, error }] = useMutation(
    CREATE_IPD_SUMMARY_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdSummary created')
        navigate(routes.ipdSummaries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createIpdSummary({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New IpdSummary</h2>
      </header>
      <div className="rw-segment-main">
        <IpdSummaryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewIpdSummary
