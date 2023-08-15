const NewExpiryMedicineTable = ({value}) => {

  console.log(value)
  return (
    <>
        <div className="flex col-span-3 justify-center flex-grow-0">
          <span> {value.medicine.mfr.name} </span>
      </div>
      <div className="flex col-span-3 justify-center">
        <span> {value.medicine.product.name} </span>
      </div>
      <div className="flex col-span-1 justify-center">
        <span>
          {value.medicine.batch}
        </span>
      </div>

      <div className="flex col-span-1 justify-center">
       {
        value.medicine.paid_qty
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.free_qty
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.pack
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.exp.split('-')[0]+ ' ' +value.medicine.exp.split('-')[1]
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.mrp
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.rate
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.dis
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.sgst
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.cgst
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.amount
       }
      </div>
      <div className="flex col-span-1 justify-center">
       {
        value.medicine.net_amount
       }
      </div>

    </>
  )
}

export default NewExpiryMedicineTable
