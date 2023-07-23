import { db } from 'src/lib/db'

export const returnMedicines = () => {
  return db.returnMedicine.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
}

export const returnMedicine = ({ id }) => {
  return db.returnMedicine.findUnique({
    where: { id },
  })
}

export const createReturnMedicine = async ({ input }) => {
  const {permedicine,...data} =  input
  const med = await db.returnMedicine.create({

    data: data,
  })

  for(let i=0;i<permedicine.length;i++)
  {

     await db.medicine.update({
      data:{
        'quantity': permedicine[i].quantity
      },
      where: {
        productId_batch: {
          productId: permedicine[i].productId,
          batch: permedicine[i].batch
        }
      }
    })
  }
  return med
}

export const updateReturnMedicine = ({ id, input }) => {
  return db.returnMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteReturnMedicine = async ({ id }) => {

  const data = await db.returnMedicine.delete({
    where: { id },
  })

  data.medicine.map(async (med) => {
    // const qty = (med.free_qty + med.paid_qty) * med.pack
    const qty =  parseInt(med.quantity)

    const medData =  await db.medicine.findFirst({
      where:{
        batch: med['batch No'],
        pid:{
          name:med['medicine Name']
        }
      }
    })
    await db.medicine.update({
      where: {
        id:medData.id
      },
      data: {
        quantity: {
          increment: qty
        }
      }

    })
  })

  return data
}

export const ReturnMedicine = {
  patient: (_obj, { root }) => {
    return db.returnMedicine.findUnique({ where: { id: root?.id } }).patient()
  },
}
