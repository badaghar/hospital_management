import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabPriceListForm from 'src/components/LabPriceList/LabPriceListForm'

const CREATE_LAB_PRICE_LIST_MUTATION = gql`
  mutation CreateLabPriceListMutation($input: CreateLabPriceListInput!) {
    createLabPriceList(input: $input) {
      id
    }
  }
`


export const QUERY = gql`
  query FindNewLabPriceListQuery {
    labs{
      id
      name

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ labs }) => {
  const [createLabPriceList, { loading, error }] = useMutation(
    CREATE_LAB_PRICE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('LabPriceList created')
        navigate(routes.labPriceLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createLabPriceList({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New LabPriceList</h2>
      </header>
      <div className="rw-segment-main">
        <LabPriceListForm onSave={onSave} loading={loading} error={error} labs={labs} />
      </div>
    </div>
  )
}
