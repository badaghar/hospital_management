import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState,useEffect } from 'react'

import { timeTag } from 'src/lib/formatters'
import IpdOverview from '../IpdOverview/IpdOverview'
import IpdConsultant from '../IpdConsultant/IpdConsultant'
import IpdCharges from 'src/components/IpdCharges/IpdCharges/IpdCharges'
import IpdOtherCharges from '../IpdOtherCharges/IpdOtherCharges'
import PaymentIpd from '../PaymentIpd/PaymentIpd'
import LabChargesIpd from '../LabChargesIpd/LabChargesIpd'
import IpdOperation from '../IpdOperation/IpdOperation'
import IpdChatComponent from '../IpdChatComponent/IpdChatComponent'
import SummaryIpd from '../SummaryIpd/SummaryIpd'
import Prescription from '../Prescription/Prescription'
import FilesCell from 'src/components/File/FilesCell'
import Doucuments from '../Doucuments/Doucuments'
import Complaint from '../Complaint/Complaint'
import IpdHistory from '../IpdHistory/IpdHistory'
// import { useEffect } from 'react-js-dialog-box'

const DELETE_IPD_MUTATION = gql`
  mutation DeleteIpdMutation($id: Int!) {
    deleteIpd(id: $id) {
      id
    }
  }

`

const Ipd = ({ ipd,users,doctorFees,chargeses,labChargeses,operations,floors,medicines,homoMedicines }) => {

  const [dropDownOpen,setDropDownOpen] = useState('overview')
  const [totalAmount,setTotalAmount] = useState(0)
  const toggleDropDown = (text) => {
    setDropDownOpen(text)
  }


  useEffect(()=>{
    let tamt = 0;
    ipd.IpdConsultation.map((it)=>{
      tamt += it.amount
    })
    ipd.IpdCharges.map((it)=>{
      tamt += it.total
    })
    // ipd.IpdLabCharges.map((it)=>{
    //   tamt += it.amount
    // })
    ipd.IpdOperationPayment.map((it)=>{
      tamt += it.amount
    })



    setTotalAmount(tamt)
    console.log(ipd)


  },[ipd])



  const [deleteIpd] = useMutation(DELETE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd deleted')
      navigate(routes.ipds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete ipd ' + id + '?')) {
      deleteIpd({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            {ipd.patientType} {ipd.id} Detail
          </h2>
        </header>
        <div>
          <div className='flex bg-gray-800 text-white  space-x-5 rounded-3xl justify-around flex-wrap'>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this,'overview')}>
              OverView
            </div>
       { ipd.discharge_date &&    <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this,'sumamry')}>
              Summary
            </div>}
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'Complaints')}
            >
              Complaints
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'consultant')}
            >
              consultant Registration
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'charges')}
            >
              Charges
            </div>
            {/* <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'labcharges')}
            >
              Lab Charges
            </div>
       { ipd.patientType=='IPD' &&     <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'operations')}
            >
              Operations
            </div>} */}
       { ipd.patientType=='OPD' &&     <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'prescription')}
            >
              Prescription
            </div>}
      {    ipd.patientType=='IPD' &&      <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'chat')}
            >
              Medication Chat
            </div>}
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'documents')}
            >
              Documents
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'history')}
            >
              History
            </div>
            <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2'
            onClick={toggleDropDown.bind(this,'payment')}
            >
              Payment
            </div>

          </div>


          {
            dropDownOpen=='overview' && <IpdOverview ipd={ipd} totalAmount={totalAmount}/>
          }
          {
            dropDownOpen=='sumamry' && <SummaryIpd ipd={ipd} floors={floors} />
          }
          {
            dropDownOpen=='consultant' && <IpdConsultant ipd={ipd} users={users} doctorFees={doctorFees} />
          }
          {
            dropDownOpen=='Complaints' && <Complaint ipd={ipd}  />
          }
          {
            dropDownOpen=='charges' && <IpdOtherCharges ipd={ipd} users={users} chargeses={chargeses} />
          }
          {
            dropDownOpen=='labcharges' && <LabChargesIpd ipd={ipd} users={users} labChargeses={labChargeses}  />
          }
          {
            dropDownOpen=='operations' && <IpdOperation ipd={ipd} users={users} operations={operations}  />
          }
          {
            dropDownOpen=='prescription' && <Prescription medicines={medicines} ipd={ipd} users={users} operations={operations}
            homoMedicines={homoMedicines}
            />
          }
          {
            dropDownOpen=='chat' && <IpdChatComponent ipd={ipd} users={users}  />
          }
          {
            dropDownOpen=='documents' && <Doucuments ipd={ipd}   />
          }
          {
            dropDownOpen=='history' && <IpdHistory ipd={ipd}   />
          }
          {
            dropDownOpen=='payment' && <PaymentIpd ipd={ipd} users={users} chargeses={chargeses} totalAmount={totalAmount} />
          }
        </div>
      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editIpd({ id: ipd.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        {/* <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipd.id)}
        >
          Delete
        </button> */}
      </nav>
    </>
  )
}

export default Ipd
