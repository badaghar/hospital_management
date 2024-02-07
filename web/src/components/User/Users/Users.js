import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SearchTable from 'src/components/SearchTable/SearchTable'
import { QUERY } from 'src/components/User/UsersCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UsersList = ({ users }) => {
  const [search_data, setSearch_data] = useState(users)
  const [rows_count, setRows_count] = useState(users.length )
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  const change = (search) => {
    const search_val = search.target.value

    let filterData = users.filter((val) => {
      return (
        val.email.toString().toLowerCase().includes(search_val.toLowerCase()) ||
        val.roles.toString().toLowerCase().includes(search_val.toLowerCase())
      )
    })
    setRows_count(filterData.length )
    setSearch_data(filterData)
  }

  const columns = [
    {
      headerClassName: 'text-left',
      Header: 'SL. No',
      Cell: ({ index }) => index + 1,
    },
    {
      headerClassName: 'text-left',
      Header: 'Name',
      accessor: 'name',
    },
    {
      headerClassName: 'text-left',
      Header: 'Email',
      accessor: 'email',
    },
    {
      headerClassName: 'text-left',
      Header: 'Roles',
      accessor: 'roles',
    },
    // {
    //   headerClassName: 'text-left',
    //   Header: 'Gender',
    //   accessor: 'gender',
    // },

    {
      headerClassName: 'text-left',
      Header: 'Action',
      accessor: 'actionColumn',
      disableSortBy: true,
      Cell: ({ original }) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.user({ id: original.id })}
            title={'Show user ' + original.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          {/* <Link
            to={routes.editUser({ id: original.id })}
            title={'Edit user ' + original.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link> */}
          <button
            type="button"
            title={'Delete user ' + original.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => onDeleteClick(original.id)}
          >
            Delete
          </button>
        </nav>
      ),
    },
  ]

  return (
    <>
      <SearchTable
        change={change}
        placeholder={'Search By Typing User Email And Roles .'}
        columns={columns}
        rows_count={rows_count}
        search_data={search_data}
      />
    </>
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Id</th>
    //         <th>Name</th>
    //         <th>Email</th>
    //         <th>Hashed password</th>
    //         <th>Salt</th>
    //         <th>Reset token</th>
    //         <th>Reset token expires at</th>
    //         <th>Roles</th>
    //         <th>Created at</th>
    //         <th>Updated at</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user) => (
    //         <tr key={user.id}>
    //           <td>{truncate(user.id)}</td>
    //           <td>{truncate(user.name)}</td>
    //           <td>{truncate(user.email)}</td>
    //           <td>{truncate(user.hashedPassword)}</td>
    //           <td>{truncate(user.salt)}</td>
    //           <td>{truncate(user.resetToken)}</td>
    //           <td>{timeTag(user.resetTokenExpiresAt)}</td>
    //           <td>{truncate(user.roles)}</td>
    //           <td>{timeTag(user.created_at)}</td>
    //           <td>{timeTag(user.updated_at)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.user({ id: user.id })}
    //                 title={'Show user ' + user.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editUser({ id: user.id })}
    //                 title={'Edit user ' + user.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete user ' + user.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(user.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default UsersList
