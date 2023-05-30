import {
  paymentPurchaseMedicines,
  paymentPurchaseMedicine,
  createPaymentPurchaseMedicine,
  updatePaymentPurchaseMedicine,
  deletePaymentPurchaseMedicine,
} from './paymentPurchaseMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('paymentPurchaseMedicines', () => {
  scenario('returns all paymentPurchaseMedicines', async (scenario) => {
    const result = await paymentPurchaseMedicines()

    expect(result.length).toEqual(
      Object.keys(scenario.paymentPurchaseMedicine).length
    )
  })

  scenario('returns a single paymentPurchaseMedicine', async (scenario) => {
    const result = await paymentPurchaseMedicine({
      id: scenario.paymentPurchaseMedicine.one.id,
    })

    expect(result).toEqual(scenario.paymentPurchaseMedicine.one)
  })

  scenario('creates a paymentPurchaseMedicine', async (scenario) => {
    const result = await createPaymentPurchaseMedicine({
      input: {
        purchaseMedicineId:
          scenario.paymentPurchaseMedicine.two.purchaseMedicineId,
        total: 6417316.677613361,
        balance: 1266117.3935596026,
        paid: 1497979.0640477876,
        method: 'String',
        remark: 'String',
        updated_at: '2023-05-30T11:20:36.660Z',
      },
    })

    expect(result.purchaseMedicineId).toEqual(
      scenario.paymentPurchaseMedicine.two.purchaseMedicineId
    )
    expect(result.total).toEqual(6417316.677613361)
    expect(result.balance).toEqual(1266117.3935596026)
    expect(result.paid).toEqual(1497979.0640477876)
    expect(result.method).toEqual('String')
    expect(result.remark).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-05-30T11:20:36.660Z'))
  })

  scenario('updates a paymentPurchaseMedicine', async (scenario) => {
    const original = await paymentPurchaseMedicine({
      id: scenario.paymentPurchaseMedicine.one.id,
    })
    const result = await updatePaymentPurchaseMedicine({
      id: original.id,
      input: { total: 3140415.461096322 },
    })

    expect(result.total).toEqual(3140415.461096322)
  })

  scenario('deletes a paymentPurchaseMedicine', async (scenario) => {
    const original = await deletePaymentPurchaseMedicine({
      id: scenario.paymentPurchaseMedicine.one.id,
    })
    const result = await paymentPurchaseMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
