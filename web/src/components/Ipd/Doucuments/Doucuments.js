import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/Ipd/IpdCell'


const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileMutation($id: Int!) {
    deleteFile(id: $id) {
      id
    }
  }
`

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
    }
  }
`

const Doucuments = ({ipd}) => {

  const [createFile, { loading, error }] = useMutation(CREATE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File Uploaded')
      navigate(routes.ipd({ id: ipd.id }))
    },
    onError: (error) => {
      toast.success('File Uploaded')
      setTimeout(function () {
        location.reload();
      }, 1);
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })


  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File deleted')
      navigate(routes.ipd({ id: ipd.id }))
    },
    onError: (error) => {
      toast.success('File deleted')
      setTimeout(function () {
        location.reload();
      }, 1);
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete file ' + id + '?')) {
      deleteFile({ variables: { id } })
    }
  }




  const [fileArray,setFileArray] = useState([])

  const [url, setUrl] = useState('')


  const onFileUpload = (response) => {
    console.log(response)
    setUrl(response.filesUploaded[0].url)
  }

  const onSubmit = (data) => {
    // const dataWithUrl = Object.assign(data, { url })
    if(!url)
    {
      toast.error('Upload The File')
    }
    data['url'] = url
    data['ipdId'] = ipd.id
    console.log(data)
    // props.onSave(data, props?.image?.id)
    createFile({ variables: { input:data } })
  }
  return (
    <>
     <div className="m-3 p-3">
      <div className="shadow-md rounded-md">

        <div className="p-2 w-full shadow-sm bg-white ">
        <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit}
      // error={props.error}
      >
        <FormError
          // error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          // defaultValue={props.file?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <div className='-z-20'>

        <PickerInline apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
        onSuccess={onFileUpload}
        />
        </div>



        <div className="rw-button-group">
          <Submit
          //  disabled={props.loading}
           className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
          <div className=" grid grid-cols-2 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Name </div>
            {/* <div className="flex col-span-1 justify-center">url</div> */}
            <div className="flex col-span-1 justify-center">Action</div>


            {
              ipd.File.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">
                      <a href={item.url} target='_blank'>{item.title}</a>
                      </div>
                    {/* <div className="flex col-span-1 justify-center">
                      {item.url}</div> */}
                    <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                      onClick={() => onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span></div>

                  </>
                )
              })
            }


            {/* {
              prescriptionArray.map((item, index) => {
                return (
                  <>
                    <MedicationChargeBody key={index} item={item}
                      prescriptionArray={prescriptionArray}
                      setPrescriptionArray={setPrescriptionArray}
                      del={deletePrescription}
                      index={index}
                      medicines={medicines}
                    />
                  </>
                )
              })

            } */}
          </div>



        </div>







        <div className='flex justify-center mt-2 pb-3'>
          {/* <button className='bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2' onClick={onSave}>Save Changes</button> */}
          {/* <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2" onClick={onSaveAndPrint}>Save & Print</button> */}
        </div>

      </div>
    </div>
    </>
  )
}

export default Doucuments
