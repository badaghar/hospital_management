import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from "src/auth"

import { jsonDisplay, timeTag } from 'src/lib/formatters'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  TextAreaField,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'
import NewPurchaseMedicineTable from '../NewPurchaseMedicineTable/NewPurchaseMedicineTable'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import NewExpiryMedicineTable from '../NewExpiryMedicineTable/NewExpiryMedicineTable'


const DELETE_PURCHASE_MEDICINE_MUTATION = gql`
  mutation DeletePurchaseMedicineMutation($id: Int!) {
    deletePurchaseMedicine(id: $id) {
      id
    }
  }
`

const ADD_PURCHASE_MEDICINE_MUTATION = gql`
  mutation addPurchaseMedicine(
    $id: Int!
    $input: AddPurchaseMedicineInput!
  ) {
    addPurchaseMedicine(id: $id, input: $input) {
      id
      invoiceNo
      distributerId
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
    }
  }
`

const PurchaseMedicine = (props) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  const [addPurchaseMedicine, { loading, error }] = useMutation(
    ADD_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine updated')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  // console.log(purchaseMedicine)
  const [deletePurchaseMedicine] = useMutation(
    DELETE_PURCHASE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PurchaseMedicine deleted')
        navigate(routes.purchaseMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete purchaseMedicine ' + id + '?')
    ) {
      deletePurchaseMedicine({ variables: { id } })
    }
  }
  // console.log('====================================');
  // console.log(purchaseMedicine);
  // console.log('====================================');









  const [no_of_medicine, setNoOfMedicine] = useState(0)
  const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  // const [show_medicine_heading, setShowMedicineHeading] = useState(false)
  const [no_of_expiry_medicine, set_no_of_expiry_medicine] = useState(false)
  const [manufacturersList, setManufacturerList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [productList, setProductList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_amount_list, set_total_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_dis_amount_list, set_total_dis_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_sgst_amount_list, set_total_sgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [total_cgst_amount_list, set_total_cgst_amount_list] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [medicineObj, setmedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [medicineManuObj, setmedicineManuObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [permedicineObj, setPermedicineObj] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [productForm, setProductForm] = useState(false)

  const [total_amount, set_total_amount] = useState(0)
  const [total_dis_amount, set_total_dis_amount] = useState(0)
  const [total_sgst_amount, set_total_sgst_amount] = useState(0)
  const [total_cgst_amount, set_total_cgst_amount] = useState(0)
  const [grand_total, set_grand_total] = useState(0)

  const [Distributers, setDistributers] = useState(0)
  const [selectDistributer, setSelectDistributer] = useState()
  const [invoiceNo, setInvoiceNumber] = useState()
  const [exp_total, set_exp_total] = useState(0)

  const [manufacturers, setManufacturers] = useState([])
  const [product, setProduct] = useState([])
  useEffect(() => {
    const opt = props.distributers.map((item) => {
      return { label: item.name, value: item.id }
    })
    setSelectDistributer(opt)
    const opt2 = props.manufacturers.map((item) => {
      return { label: item.name, value: item.id, name: item.name, id: item.id, item }
    })
    setManufacturers(opt2)
    const opt3 = props.products.map((item) => {
      return { label: item.name, value: item.id, name: item.name, id: item.id }
    })
    setProduct(opt3)
  }, [])



  const modifiyDistributer = (name) => {
    if (name.length === 0) {
      set_no_of_expiry_medicine(false)
      return
    }
    // console.log(name)
    // Distributers = name[0].id
    // checkinf]g for dublicate entry [invoiceno,distributer]
    set_no_of_expiry_medicine(false)
    const data = props.returnExpiryMedicines.filter((med) => {
      return (med.distributerId == name.value && med.return_med == false)
    })
    // console.log(data,name.value)
    if (data.length == 0) {
      set_no_of_expiry_medicine(false)
    }
    else {
      var medicineRows = []
      let total = 0
      for (var i = 0; i < data.length; i++) {
        medicineRows.push(<NewExpiryMedicineTable key={'purchase_' + i} value={data[i]}
        // total={set_exp_total}
        />)
        total += data[i].medicine.net_amount
      }
      set_exp_total(total.toFixed(2))
      set_no_of_expiry_medicine(medicineRows)
      console.log(data)
    }
    setDistributers(name.value)
  }

  const updateMedicineTable = (e) => {
    console.log(e.target.value)
    const val = e.target.value
    if (val == '') {
      setNoOfMedicine(0)
      setShowMedicineHeading(false)
    } else {
      setNoOfMedicine(val)
      setShowMedicineHeading(true)
    }
  }

  const ShowHeadMedicine = () => {
    if (show_medicine_heading) {
      return <MedicineTableHeading />
    } else {
      return <></>
    }
  }
  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
  }, [productList, manufacturersList])
  useEffect(() => {
    // console.log("manufacturer :-",manufacturersList,"product List :- ",productList)
    let tamt = 0
    let damt = 0
    let sgstamt = 0
    let cgstamt = 0
    for (let i = 0; i < no_of_medicine; i++) {
      tamt += total_amount_list[i]
      damt += total_dis_amount_list[i]
      sgstamt += total_sgst_amount_list[i]
      cgstamt += total_cgst_amount_list[i]
    }

    set_grand_total(Math.round(tamt + sgstamt + cgstamt - damt - exp_total))
    set_total_amount(tamt)
    set_total_dis_amount(damt)
    set_total_sgst_amount(sgstamt)
    set_total_cgst_amount(cgstamt)
  }, [total_amount_list, total_dis_amount_list, total_cgst_amount_list, total_sgst_amount_list, exp_total])

  var medicineRows = []
  for (var i = 0; i < no_of_medicine; i++) {
    medicineRows.push(<NewPurchaseMedicineTable key={'purchase_' + i} value={i}
      manufacturers={manufacturers} manufacturersList={manufacturersList} products={product} productList={productList}
      setManufacturerList={setManufacturerList} setProductList={setProductList}
      set_total_amount_list={set_total_amount_list}
      set_total_dis_amount_list={set_total_dis_amount_list}
      set_total_sgst_amount_list={set_total_sgst_amount_list}
      set_total_cgst_amount_list={set_total_cgst_amount_list}
      setmedicineObj={setmedicineObj}
      setPermedicineObj={setPermedicineObj}
      setmedicineManuObj={setmedicineManuObj}

    />)
  }

  const onSub = (data) => {
    data['DistributerId'] = Distributers
    console.log("here")

    // console.log(medicineObj)
    const newmedicine = medicineObj.filter((val) => {
      return val !== 0
    })

    const newperMedicine = permedicineObj.filter((val) => {
      return val !== 0
    })
    const newperMedicineManu = medicineManuObj.filter((val) => {
      return val !== 0
    })
    let input = {}
    input = {
      // 'invoiceNo': data['invoiceNo'],

      'distributerId': props.purchaseMedicine.distributerId,
      // 'date': data['date'],
      'medicine': [...props.purchaseMedicine.medicine,...newmedicine],
      // 'return': no_of_expiry_medicine,
      'total': total_amount + props.purchaseMedicine.total,
      'discount': total_dis_amount + props.purchaseMedicine.discount,
      'sgst': total_sgst_amount + props.purchaseMedicine.sgst,
      'cgst': total_cgst_amount + props.purchaseMedicine.cgst,
      'grand_total': grand_total + props.purchaseMedicine.grand_total,
      'permedicine': newperMedicine,
      'newperMedicineManu': newperMedicineManu,

    }
    // medInput = newperMedicine
    // console.log(props.purchaseMedicine)

    console.log(input)
    addPurchaseMedicine({ variables: { id:props.purchaseMedicine.id, input } })

    // props.onSave(input, props?.purchaseMedicine?.id)

  }












  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">

        <div className="col-span-2">
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Invoice no</th>
                <th className="p-4">Distributor Name</th>
                <th className="p-4">Date</th>
              </tr>
              <tr>
                <td className="p-4">{props.purchaseMedicine.id}</td>
                <td className="p-4">{props.purchaseMedicine.invoiceNo}</td>
                <td className="p-4">{props.purchaseMedicine.did.name}</td>
                <td className="p-4">{props.purchaseMedicine.date.split('T00:00:00.000Z')}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Manufacturer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Paid Quantity</th>
                <th className="p-4">Free Quantity</th>
                <th className="p-4">Pack</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">MRP</th>
                <th className="p-4">PTR</th>
                <th className="p-4">Discount</th>
                <th className="p-4">SGST</th>
                <th className="p-4">CGST</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.purchaseMedicine.medicine.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">{item.mfr.name}</td>
                  <td className="p-4">{item.product.name}</td>
                  <td className="p-4">{item.batch}</td>
                  <td className="p-4">{item.paid_qty}</td>
                  <td className="p-4">{item.free_qty}</td>
                  <td className="p-4">{item.pack}</td>
                  <td className="p-4">{item.exp ? item.exp.split('-')[1] + '-' + item.exp.split('-')[0] : '04-2026'} </td>
                  <td className="p-4">{item.mrp.toFixed(2)}</td>
                  <td className="p-4">{item.rate.toFixed(2)}</td>
                  <td className="p-4">{item.dis.toFixed(2)}</td>
                  <td className="p-4">{item.sgst}</td>
                  <td className="p-4">{item.cgst}</td>
                  <td className="p-4">{item.amount.toFixed(2)}</td>
                  <td className="p-4">{isNaN(parseFloat(item.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(item.net_amount).toFixed(2)}</td>
                </tr>
              ))}

              {
                props.purchaseMedicine.return &&
                <>
                  <h3 className=" font-bold mb-4">Return Medicine</h3>

                  {props.purchaseMedicine?.return?.map((item, index) => (

                    <tr key={index}>
                      <td className="p-4">{item.props.value.medicine.mfr.name}</td>
                      <td className="p-4">{item.props.value.medicine.product.name}</td>
                      <td className="p-4">{item.props.value.medicine.batch}</td>
                      <td className="p-4">{item.props.value.medicine.paid_qty}</td>
                      <td className="p-4">{item.props.value.medicine.free_qty}</td>
                      <td className="p-4">{item.props.value.medicine.pack}</td>
                      <td className="p-4">{item.props.value.medicine.exp ? item.props.value.medicine.exp.split('-')[1] + '-' + item.props.value.medicine.exp.split('-')[0] : '04-2026'} </td>
                      <td className="p-4">{item.props.value.medicine.mrp.toFixed(2)}</td>
                      <td className="p-4">{item.props.value.medicine.rate.toFixed(2)}</td>
                      <td className="p-4">{item.props.value.medicine.dis.toFixed(2)}</td>
                      <td className="p-4">{item.props.value.medicine.sgst}</td>
                      <td className="p-4">{item.props.value.medicine.cgst}</td>
                      <td className="p-4">{item.props.value.medicine.amount.toFixed(2)}</td>
                      <td className="p-4">{isNaN(parseFloat(item.props.value.medicine.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(item.props.value.medicine.net_amount).toFixed(2)}</td>
                    </tr>
                  ))}



                </>
              }
            </tbody>
          </table>




          <div>
            <Form onSubmit={onSub} error={props.error}>
              <div className='flex items-center mt-3  gap-x-4'>
                <Label
                  name="no_of_medicine"
                  className="rw-label mt-0"
                  errorClassName="rw-label rw-label-error mt-0"
                >
                  No Of Medicine
                </Label>
                <div className="flex">

                  <NumberField
                    name="no_of_medicine"
                    className="rw-input mt-0"
                    errorClassName="rw-input rw-input-error mt-0"
                    validation={{ required: true }}
                    onChange={updateMedicineTable}
                  />
                </div>
                <FieldError name="no_of_medicine" className="rw-field-error" />
              </div>

              <div className="p-2 w-full shadow-sm bg-white ">
                <div className=" grid grid-cols-18 grid-flow-row gap-x-2 gap-y-2">
                  {ShowHeadMedicine()}
                  {medicineRows}
                </div>
              </div>

              <div className="rw-button-group">
                <Submit disabled={props.loading} className="rw-button rw-button-blue">
                  Save
                </Submit>
              </div>
            </Form>
          </div>
        </div>




        <div className="col-span-2">

          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <td className="p-4 font-bold">Total</td>
                <td className="p-4 font-bold">Discount</td>
                <td className="p-4 font-bold">Sgst</td>
                <td className="p-4 font-bold">Cgst</td>
                <td className="p-4 font-bold">Grand total</td>
                <td className="p-4 font-bold">Created at</td>
              </tr>

              <tr className=''>
                <td className="p-4">{props.purchaseMedicine.total}</td>
                <td className="p-4">{props.purchaseMedicine.discount.toFixed(2)}</td>
                <td className="p-4">{props.purchaseMedicine.sgst.toFixed(2)}</td>
                <td className="p-4">{props.purchaseMedicine.cgst.toFixed(2)}</td>
                <td className="p-4">{props.purchaseMedicine.grand_total.toFixed(2)}</td>
                <td className="p-4">{props.purchaseMedicine.created_at.split('T')[0]}</td>
              </tr>
              {/* {    date = new Date().toLocaleDateString() } */}

            </tbody>
          </table>
        </div>
      </div >

      <nav className="rw-button-group">
        {/* <Link
          to={routes.editPurchaseMedicine({ id: purchaseMedicine.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        {hasRole('admin') && <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(props.purchaseMedicine.id)}
        >
          Delete
        </button>}
      </nav>
    </>
  )
}


function MedicineTableHeading() {
  return (
    <>

      <div className="flex col-span-3 justify-center">Mfr</div>
      <div className="flex col-span-3 justify-center">Product Name</div>
      <div className="flex col-span-1 justify-center">Batch</div>
      <div className="flex col-span-1 justify-center">Paid Qty</div>
      <div className="flex col-span-1 justify-center">Free Qty</div>
      <div className="flex col-span-1 justify-center">Pack</div>
      <div className="flex col-span-1 justify-center">Exp</div>
      <div className="flex col-span-1 justify-center">M.R.P</div>
      <div className="flex col-span-1 justify-center">PTR</div>
      <div className="flex col-span-1 justify-center">Dis</div>
      <div className="flex col-span-1 justify-center">SGST</div>
      <div className="flex col-span-1 justify-center">CGST</div>
      <div className="flex col-span-1 justify-center">Amount</div>
      <div className="flex col-span-1 justify-center">Net Amount</div>
    </>
  )
}

export default PurchaseMedicine
