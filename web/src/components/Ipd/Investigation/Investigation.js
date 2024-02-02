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
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/Ipd/IpdCell'
import Multiselect from 'multiselect-react-dropdown'
import { useState, useEffect, useLayoutEffect } from 'react'
import Select from 'react-select'

import { MdDeleteForever } from 'react-icons/md'
const CREATE_IPD_INVESTIGATION_MUTATION = gql`
  mutation CreateIpdInvestigationMutation(
    $input: CreateIpdInvestigationInput!
  ) {
    createIpdInvestigation(input: $input) {
      id
    }
  }
`

const DELETE_IPD_INVESTIGATION_MUTATION = gql`
  mutation DeleteIpdInvestigationMutation($id: Int!) {
    deleteIpdInvestigation(id: $id) {
      id
    }
  }
`

const Investigation = ({ ipd,labPriceLists }) => {

  const [testOption,setTestOption] = useState([])
  const [labOption,setLabOption] = useState([])
  const[lab,setLab] = useState('')
  const [testList, setTestList] = useState([])


  const modifyLab = (name) =>{
    if (name.length === 0) {
      return
    }
    setLab(name)

  }

  const modifyTest = (items) => {
    let cl = []
    for (let i = 0; i < items.length; i++) {
      cl.push(items[i].type)
    }
    setTestList(cl)
  }

  useEffect(()=>{
    const obj = labPriceLists.map((item)=>{
      return {label:item.lab.name,value:item.lab.name}
    })
    setLabOption(obj)
  },[])

  useEffect(()=>{
    if(lab){
      const obj = labPriceLists.filter((item)=>item.lab.name==lab?.value)
      setTestOption(obj[0]?.test_list)


    }

  },[lab])



  const [createIpdInvestigation, { loading, error }] = useMutation(
    CREATE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Investigation created')
        setLab('')
        setTestList([])
        navigate(routes.ipd({ id: ipd.id }))
      },
      onError: (error) => {
        toast.error(error.message)
        // console.log(error)
      },
      refetchQueries: [{
        query: QUERY, variables: {
          id: ipd.id,
        },
      }],
      awaitRefetchQueries: true,
    }
  )
  const [deleteIpdInvestigation] = useMutation(
    DELETE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{
        query: QUERY, variables: {
          id: ipd.id,
        },
      }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete Investigation ' + id + '?')
    ) {
      deleteIpdInvestigation({ variables: { id } })
    }
  }
  const onSubmit = () => {
    // props.onSave(data, props?.ipdInvestigation?.id)
    if(!lab?.value || testList.length==0){
      toast.error('Fill All The Details')
      return

    }
    let data = {}
    data['lab_name'] = lab.value
    data['isWaiting'] = false
    data['test_list'] = testList
    data['url'] = 'na'
    data['ipdId'] = ipd.id
    createIpdInvestigation({ variables: { input: data } })
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

                <div className='flex items-center mt-3  gap-x-4'>

                  <Label
                    className="rw-label mt-0"
                  >
                    Lab name
                  </Label>

                  <div className=" flex-1">


                    <Select options={labOption} onChange={modifyLab} isClearable={true} value={lab}

                    />


                  </div>
                </div>

                <Label

                  className="rw-label mb-2"

                >
                  Select Test
                </Label>

                <Multiselect
                  options={testOption} // Options to display in the dropdown


                  onSelect={(event) => modifyTest(event)} // Function will trigger on select event
                  onRemove={(event) => modifyTest(event)} // Function will trigger on remove event
                  displayValue="type" // Property name to display in the dropdown options
                />





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
              <div className="flex col-span-1 justify-center">Action</div>


              {/* {
                ipd.File.map((item, index) => {
                  return (
                    <>
                      <div className="flex col-span-1 justify-center">
                        <a href={item.url} target='_blank'>{item.title}</a>
                      </div>

                      <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                        onClick={() => onDeleteClick(item.id)}
                      >
                        <MdDeleteForever />
                      </span></div>

                    </>
                  )
                })
              } */}
            {
              ipd.IpdInvestigation.map((item,index)=>{
                console.log(item)

                return (
                  <>
                    <div className="flex col-span-1 justify-center">
                      {
                        item.url=='na' ?
                        <>

                      {    item.test_list.map((it)=>
                              <span>
                                {it}
                              </span>
                          )}
                          (File Note Yet Uploaded)
                        </>

                        :
                          <>
                        <a href={item.url} target='_blank' className='cursor-pointer'>{<>
                       {
                          item.test_list.map((it)=>
                              <span>
                                {it}
                              </span>


                          )}
                          (Click To View Report)
                        </>}</a>

                          </>
                      }
                    </div>

                    <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                      onClick={() => onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span></div>

                  </>
                )
              })
            }


            </div>



          </div>

        </div>
      </div>
    </>
  )
}

export default Investigation
