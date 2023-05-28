import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const saleMedicines = () => {
  return db.saleMedicine.findMany()
}

export const saleMedicine = ({ id }) => {
  return db.saleMedicine.findUnique({
    where: { id },
  })
}

export const createSaleMedicine = async ({ input }) => {
  const {permedicine,...data} =  input

  const lastRow = await db.saleMedicine.findFirst({
    orderBy: {
      id: 'desc'
    }
  });

  const no = lastRow ? parseInt(lastRow.id) + 1 : 1;

  const start = 'SVPH632'+no
  data['billNo'] = start
  const med = await db.saleMedicine.create({

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

    // console.log('Per Medicine: \n\n\n\n\n\n\n\n\n\n', permedicine[i])

  }
  // console.info('array is \n\n\n\n\n\n\n\n\n\n')
  // console.log("here hello 3\n\n\n\n\n\n\n\n\n\n",permedicine[0])
  // logger.warn("hii \n\n\n\n\n\n\n\n\n\n")
  return med
}

export const updateSaleMedicine = ({ id, input }) => {
  return db.saleMedicine.update({
    data: input,
    where: { id },
  })
}

export const deleteSaleMedicine = ({ id }) => {
  return db.saleMedicine.delete({
    where: { id },
  })
}

export const SaleMedicine = {
  patient: (_obj, { root }) => {
    return db.saleMedicine.findUnique({ where: { id: root?.id } }).patient()
  },
}
