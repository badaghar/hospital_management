import { db } from 'src/lib/db'

export const ipdPayments = () => {
  return db.ipdPayment.findMany()
}

export const ipdPayment = ({ id }) => {
  return db.ipdPayment.findUnique({
    where: { id },
  })
}

export const createIpdPayment = async ({ input }) => {
  const data = await db.ipdPayment.create({
    data: input,
  })
  const ipd = await db.ipd.findFirst({where:{id:data.ipdId}})
  if(input.amount < 0) {
    return data
  }
  await db.ipd.update({
    where:{
      id:data.ipdId
    },
    data:{
      paid_amount: parseFloat(ipd.paid_amount) + parseFloat(input.amount)

    }
  })
  return data
}

export const updateIpdPayment = ({ id, input }) => {
  return db.ipdPayment.update({
    data: input,
    where: { id },
  })
}

export const deleteIpdPayment = async ({ id,amount,ipdId }) => {
  const data = await db.ipdPayment.delete({
    where: { id },
  })
console.log('/n/n/n/n\n\n\n\n\n\n\n\n\n\nn\\n\n\n\n\n',amount)
  await db.ipd.update({
    where:{
      id:ipdId
    },
    data:{
   paid_amount: {
        decrement: amount
      }
    }
  })

  return data
}

export const IpdPayment = {
  ipd: (_obj, { root }) => {
    return db.ipdPayment.findUnique({ where: { id: root?.id } }).ipd()
  },
}
