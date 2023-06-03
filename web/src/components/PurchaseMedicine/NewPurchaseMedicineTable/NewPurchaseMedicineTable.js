import { useEffect, useState } from 'react'

import { Label, TextField, FieldError, DateField } from '@redwoodjs/forms'
import Multiselect from 'multiselect-react-dropdown'


const NewPurchaseMedicineTable = (props) => {
  const [mfr, setMfr] = useState('')
  const [paid_qty, set_paid_qty] = useState(0)
  const [free_qty, set_free_qty] = useState(0)
  const [pack, set_pack] = useState(0)
  const [mrp, set_mrp] = useState(0)
  const [batch, set_batch] = useState(0)
  const [exp, set_exp] = useState(0)
  const [rate, set_rate] = useState(0)
  const [dis, set_dis] = useState(0)
  const [sgst, set_sgst] = useState(0)
  const [cgst, set_cgst] = useState(0)
  const [total_amount, set_total_amount] = useState(0)
  const [total_net_amount, set_total_net_amount] = useState(0)

  useEffect(()=>{
    const tamt = (paid_qty)*rate
    set_total_amount(tamt)
    const tnetamt = ((parseFloat(cgst)+parseFloat(sgst))*tamt/100.0) + tamt
    const tnetamtDisc = tnetamt - dis*tnetamt/100.0
    set_total_net_amount(tnetamtDisc)
    props.set_total_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = tamt;

      return updatedList;
    })
    props.set_total_dis_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = dis*tnetamt/100.0;

      return updatedList;
    })
    props.set_total_sgst_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = ((parseFloat(sgst))*tamt/100.0);

      return updatedList;
    })
    props.set_total_cgst_amount_list((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = ((parseFloat(cgst))*tamt/100.0);

      return updatedList;
    })

    let obj = {
      'mfr':props.manufacturersList[props.value],
      'product':props.productList[props.value],
      'batch':batch,
      'paid_qty': parseFloat(paid_qty),
      'free_qty':parseFloat(free_qty),
      'pack':parseFloat(pack),
      'exp':exp,
      'mrp':parseFloat(mrp),
      'rate':parseFloat(rate),
      'dis':parseFloat(dis),
      'sgst':parseFloat(sgst),
      'cgst':parseFloat(cgst),
      'amount':parseFloat(total_amount),
      'net_amount':parseFloat(total_net_amount),
    }

    // let oneMedPrice = parseFloat(mrp) * ((parseFloat(cgst)+parseFloat(sgst)) / (100 +(parseFloat(cgst)+parseFloat(sgst))))
    let oneMedPrice = parseFloat(parseFloat(mrp/pack).toFixed(2))

    // const dateString = "2023-05-25";
const date = new Date(exp);
    let medObj = {
      'quantity':(parseFloat(paid_qty)+parseFloat(free_qty))*parseFloat(pack),
      'productId':props.productList[props.value].id,
      'batch':batch,
      'exp':date,
      'mrp' : parseFloat(oneMedPrice),
      'sgst':parseFloat(sgst),
      'cgst':parseFloat(cgst),
      'discount':parseFloat(dis)
    }
    props.setmedicineObj((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = obj

      return updatedList;
    })
    props.setPermedicineObj((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = medObj

      return updatedList;
    })


  },[mfr,paid_qty,free_qty,pack,mrp,rate,dis,sgst,cgst])

  const updateTotal = (data) => {
    let grade_temp_obj = {}
    if (/^mfr_/.test(data.target.name)) {

      setMfr(data.target.value)
    }
    if (/^paid_qty/.test(data.target.name)) {

      set_paid_qty(data.target.value)
    }
    if (/^free_qty/.test(data.target.name)) {

      set_free_qty(data.target.value)
    }
    if (/^pack/.test(data.target.name)) {

      set_pack(data.target.value)
    }
    if (/^mrp/.test(data.target.name)) {

      set_mrp(data.target.value)
    }
    if (/^rate/.test(data.target.name)) {

      set_rate(data.target.value)
    }
    if (/^dis/.test(data.target.name)) {

      set_dis(data.target.value)
    }
    if (/^sgst/.test(data.target.name)) {

      set_sgst(data.target.value)
    }
    if (/^cgst/.test(data.target.name)) {

      set_cgst(data.target.value)
    }
    if (/^batch/.test(data.target.name)) {

      set_batch(data.target.value)
    }
    if (/^exp/.test(data.target.name)) {

      set_exp(data.target.value)
    }
  }
  // let grade_temp_obj={};
  // grade_temp_obj[mfr+"_"+grade_point] = [min,max]

  const modifiyManufacturer = (name) =>{
    if(name.length===0){
      return
    }
    props.setManufacturerList((ml)=>{
      const updatedList = [...ml];
      updatedList[props.value] = {id:name[0].id,name:name[0].name};

      return updatedList;
    })
  }
  const modifyProducts = (name) =>{
    if(name.length===0){
      return
    }
    props.setProductList((ml)=>{
      const updatedList = [...ml]; // Create a new array with the existing values

      // Update the desired element
      updatedList[props.value] = {id:name[0].id,name:name[0].name};

      return updatedList;
    })
    // // console.log(name)
    // Manufacturer = name[0].id
  }

  return (
    <>
      <div className="flex col-span-3 justify-center flex-grow-0">
      <Multiselect
      className="rw-input"
          options={props.manufacturers} // Options to display in the dropdown
          onSelect={(event) => modifiyManufacturer(event)} // Function will trigger on select event
          onRemove={(event) => modifiyManufacturer(event)} // Function will trigger on remove event
          selectionLimit={1}

          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <div className="flex col-span-3 justify-center">
      <Multiselect
      className="rw-input"
          options={props.products} // Options to display in the dropdown
          onSelect={(event) => modifyProducts(event)} // Function will trigger on select event
          onRemove={(event) => modifyProducts(event)} // Function will trigger on remove event
          selectionLimit={1}

          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'batch_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError
          name={'batch_' + props.value}
          className="rw-field-error"
        />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'paid_qty_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError
          name={'paid_qty_' + props.value}
          className="rw-field-error"
        />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'free_qty_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'free_qty_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'pack_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'pack_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <DateField
          name={'exp_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'exp_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'mrp_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'mrp_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'rate_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'rate_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'dis_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={dis}
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'dis_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'sgst_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'sgst_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'cgst_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={updateTotal}
          validation={{ required: true }}
        />

        <FieldError name={'cgst_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'amount_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          // onChange={updateTotal}
          value={total_amount}
          disabled={true}
          // validation={{ required: true }}
        />

        <FieldError name={'amount_' + props.value} className="rw-field-error" />
      </div>
      <div className="flex col-span-1 justify-center">
        <TextField
          name={'net_amount_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={total_net_amount}
          disabled={true}

          // validation={{ required: true }}
        />

        <FieldError name={'net_amount_' + props.value} className="rw-field-error" />
      </div>
      {/* <div className="col-span-1 justify-center hidden">
        <TextField
          name={'net_amount_' + props.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          value={total_net_amount}
          disabled={true}

          validation={{ required: true }}
        />

        <FieldError name={'net_amount_' + props.value} className="rw-field-error" />
      </div> */}
    </>
  )
}

export default NewPurchaseMedicineTable
