import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import axios from 'axios'
import { useState } from 'react'

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
      extra
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

export const Success = ({ patients, users, doctorFees, chargeses, beds, floors, type, id }) => {
  const [saveForm, SetSaveForm] = useState(false)
  function getPDF(id) {
    return axios.get(
      `https://13.233.126.41:1000/downloadOpdForm?id=` +
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
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
        iframe.onload = function () {
          setTimeout(function () {
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
  const [createIpd, { loading, error }] = useMutation(CREATE_IPD_MUTATION, {
    onCompleted: (data) => {
      toast.success(type + ' Patient Info Added')
      if (saveForm) {
        console.log(data.createIpd.id)
        printPDF(data.createIpd.id)

      }

      // setTimeout(function() {
      //   location.reload();
      // }, 100);
      navigate(routes.ipds({type}))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id, isSave) => {
    SetSaveForm(isSave)
    createIpd({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New {type}</h2>
      </header>
      <div className="rw-segment-main">
        <IpdForm onSave={onSave} loading={loading} error={error} patients={patients} users={users} doctorFees={doctorFees} chargeses={chargeses} type={type}
          floors={floors} beds={beds} id={id}
        />
      </div>
    </div>
  )
}
