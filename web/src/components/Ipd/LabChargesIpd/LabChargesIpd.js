import { useEffect, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import Select from 'react-select'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Ipd/IpdCell'
import axios from "axios"
const CREATE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation CreateIpdLabChargesMutation($input: [CreateIpdLabChargesInput]!) {
    createIpdLabCharges(input: $input) {
      id
    }
  }
`

const DELETE_IPD_LAB_CHARGES_MUTATION = gql`
  mutation DeleteIpdLabChargesMutation($id: Int!) {
    deleteIpdLabCharges(id: $id) {
      id
    }
  }
`


const LabChargesIpd = ({ ipd, users, labChargeses }) => {
  const [labChargesArray, setLabChargesArray] = useState([])
  const [isPrint,setIsPrint] = useState(false)

  const [deleteIpdLabCharges] = useMutation(DELETE_IPD_LAB_CHARGES_MUTATION, {
    onCompleted: () => {
      toast.success('IpdLabCharges deleted')
      // navigate(routes.ipdLabChargeses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY,  variables: {
      id: ipd.id,
    }, }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipdLabCharges ' + id + '?')) {
      deleteIpdLabCharges({ variables: { id } })
    }
  }


  function getPDF(id) {
    return axios.get(
      `http://localhost:1000/downloadLabCharges?id=` +
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
        var iframe =  document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
     iframe.onload = function() {
      setTimeout(function() {
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

  const [createIpdLabCharges, { loading, error }] = useMutation(
    CREATE_IPD_LAB_CHARGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdLabCharges added')
        setLabChargesArray([])
        if(isPrint)
        {
          printPDF(ipd.id)


        }
        navigate(routes.ipd({id:ipd.id}))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY,  variables: {
        id: ipd.id,
      }, }],
      awaitRefetchQueries: true,
    }
  )
  const onSave = () => {
    // console.log(doctorChargesArray)
    const hasEmptyValue = labChargesArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '' || !value);
    });
    if(hasEmptyValue)
    {
      toast.error('Enter All The Details')
      return
    }
    createIpdLabCharges({ variables: { input: labChargesArray } })
  }
  const onSaveAndPrint = () => {
    // console.log(doctorChargesArray)
    const hasEmptyValue = labChargesArray.some((obj) => {
      // Check if any value in the object is empty
      return Object.values(obj).some((value) => value === null || value === '' || !value);
    });
    if(hasEmptyValue)
    {
      toast.error('Enter All The Details')
      return
    }
    setIsPrint(true)
    createIpdLabCharges({ variables: { input: labChargesArray } })
  }

  const addLabCharges = () => {
    setLabChargesArray((item) => [...item, { lab_name: '', amount: 0, ipdId: ipd.id }])
  }

  const deleteLabCharges = (index) => {
    setLabChargesArray((array) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    });


  }
  return (
    <div className="m-3 p-3">
      <div className="shadow-md rounded-md">

        <div className="p-2 w-full shadow-sm bg-white ">
          <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">

            <div className="flex col-span-1 justify-center">Lab Charges Type</div>
            <div className="flex col-span-1 justify-center">Amount</div>
            <div className="flex col-span-1 justify-center">Action</div>

            {
              ipd.IpdLabCharges.map((item, index) => {
                return (
                  <>
                    <div className="flex col-span-1 justify-center">{item.lab_name}</div>
                    <div className="flex col-span-1 justify-center">{item.amount}</div>
                    <div className="flex col-span-1 justify-center">    <span className='cursor-pointer text-xl text-red-600'
                    onClick={()=>onDeleteClick(item.id)}
                    >
                      <MdDeleteForever />
                    </span></div>

                  </>
                )
              })
            }
            {
              labChargesArray.map((item, index) => {
                return (
                  <>
                    <LabChargesBody key={index} labChargeses={labChargeses} item={item}
                      labChargesArray={labChargesArray}
                      setLabChargesArray={setLabChargesArray}
                      del={deleteLabCharges}
                      index={index}
                    />
                  </>
                )
              })

            }
          </div>

          <div className='flex justify-center mt-2'>
            <div className='bg-gray-900 p-2 text-white rounded-3xl hover:text-gray-950 hover:bg-slate-300 cursor-pointer' onClick={addLabCharges}>Add Lab Charge</div>
          </div>

        </div>
        <div className='flex justify-center mt-2 pb-3'>
          <button className='bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2' onClick={onSave}>Save Changes</button>
          <button className="bg-green-600 p-2 text-white rounded-lg hover:bg-green-400 m-2" onClick={onSaveAndPrint}>Save & Print</button>
        </div>

      </div>
    </div>
  )
}

const LabChargesBody = ({ labChargeses, item, labChargesArray, del, setLabChargesArray, index }) => {

  const [labchargeType, setlabChargeType] = useState()
  const [obj, setObj] = useState([])
  const [amount, setAmount] = useState(0)



  const labchargeTypeChange = (item) => {


    setLabChargesArray((array) => {
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        lab_name: item?.value || '',
        amount: item?.amount || 0
      };
      return newArray;
    });
  }







  useEffect(() => {

    if (item.charge_type) {
      setlabChargeType({ value: item.name, label: item.name })
    }
    setAmount(item.amount)

    const obj = labChargeses.map((char) => {
      const ob = { value: char.name, label: char.name, amount: char.amount }
      return ob
    })
    setObj(obj)
    console.log(item)
  }, [item])


  return (
    <>
      <div className="flex col-span-1 justify-center">
        <Select options={obj} isClearable={true} required onChange={labchargeTypeChange} value={item.name !== '' ? labchargeType : ''}
        />
      </div>
      <div className="flex col-span-1 justify-center">{amount}</div>
      <div className="flex col-span-1 justify-center">

        <span className='cursor-pointer text-xl text-red-600' onClick={del.bind(this, index)}>
          <MdDeleteForever />
        </span>
      </div>
    </>
  )
}

export default LabChargesIpd


// export default IpdOtherCharges

