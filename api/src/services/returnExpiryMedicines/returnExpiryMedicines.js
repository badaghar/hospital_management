import { db } from 'src/lib/db'

export const returnExpiryMedicines = async () => {
  const data = await db.returnExpiryMedicine.findMany()
  return data

}

export const returnExpiryMedicine = async ({ id }) => {


  const data = await db.returnExpiryMedicine.findUnique({
    where: { id },
  })

  const data2 = db.distributer.findUnique({
    where:{
      id:data.distributerId
    }
  })
  return {data,data2}

}

export const createReturnExpiryMedicine = async ({ input }) => {
  const data = await db.returnExpiryMedicine.create({
    data: input,
  })

  await db.medicine.update({
    data: {
      'quantity': input.medicine.quantity_remain
    },
    where: {
      productId_batch: {
        productId: input.medicine.product.id,
        batch: input.medicine.batch
      }
    }
  })

  return data
}

export const updateReturnExpiryMedicine = ({ id, input }) => {
  return db.returnExpiryMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteReturnExpiryMedicine = ({ id }) => {
  return db.returnExpiryMedicine.delete({
    where: { id },
  })
}
