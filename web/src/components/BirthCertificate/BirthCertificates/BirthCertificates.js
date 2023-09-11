import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/BirthCertificate/BirthCertificatesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation DeleteBirthCertificateMutation($id: Int!) {
    deleteBirthCertificate(id: $id) {
      id
    }
  }
`

const BirthCertificatesList = ({ birthCertificates }) => {
  const [deleteBirthCertificate] = useMutation(
    DELETE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BirthCertificate deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete birthCertificate ' + id + '?')
    ) {
      deleteBirthCertificate({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Birth date</th>
            <th>Weight</th>
            <th>Type</th>
            <th>Extra</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {birthCertificates.map((birthCertificate) => (
            <tr key={birthCertificate.id}>
              <td>{truncate(birthCertificate.id)}</td>
              <td>{truncate(birthCertificate.name)}</td>
              <td>{timeTag(birthCertificate.birth_date)}</td>
              <td>{truncate(birthCertificate.weight)}</td>
              <td>{truncate(birthCertificate.type)}</td>
              <td>{jsonTruncate(birthCertificate.extra)}</td>
              <td>{timeTag(birthCertificate.created_at)}</td>
              <td>{timeTag(birthCertificate.updated_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.birthCertificate({ id: birthCertificate.id })}
                    title={
                      'Show birthCertificate ' + birthCertificate.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBirthCertificate({
                      id: birthCertificate.id,
                    })}
                    title={'Edit birthCertificate ' + birthCertificate.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete birthCertificate ' + birthCertificate.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(birthCertificate.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BirthCertificatesList
