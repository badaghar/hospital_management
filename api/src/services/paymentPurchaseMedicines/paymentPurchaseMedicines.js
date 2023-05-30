import { db } from 'src/lib/db'

export const paymentPurchaseMedicines = () => {
  return db.paymentPurchaseMedicine.findMany()
}

export const paymentPurchaseMedicine = ({ id }) => {
  return db.paymentPurchaseMedicine.findUnique({
    where: { id },
  })
}

export const createPaymentPurchaseMedicine = ({ input }) => {
  return db.paymentPurchaseMedicine.create({
    data: input,
  })
}

export const updatePaymentPurchaseMedicine = ({ id, input }) => {
  return db.paymentPurchaseMedicine.update({
    data: input,
    where: { id },
  })
}

export const deletePaymentPurchaseMedicine = ({ id }) => {
  return db.paymentPurchaseMedicine.delete({
    where: { id },
  })
}

export const PaymentPurchaseMedicine = {
  purchaseMedicine: (_obj, { root }) => {
    return db.paymentPurchaseMedicine
      .findUnique({ where: { id: root?.id } })
      .purchaseMedicine()
  },
}
