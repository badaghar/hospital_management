import {
  purchaseMedicines,
  purchaseMedicine,
  createPurchaseMedicine,
  updatePurchaseMedicine,
  deletePurchaseMedicine,
} from './purchaseMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('purchaseMedicines', () => {
  scenario('returns all purchaseMedicines', async (scenario) => {
    const result = await purchaseMedicines()

    expect(result.length).toEqual(Object.keys(scenario.purchaseMedicine).length)
  })

  scenario('returns a single purchaseMedicine', async (scenario) => {
    const result = await purchaseMedicine({
      id: scenario.purchaseMedicine.one.id,
    })

    expect(result).toEqual(scenario.purchaseMedicine.one)
  })

  scenario('creates a purchaseMedicine', async (scenario) => {
    const result = await createPurchaseMedicine({
      input: {
        invoiceNo: 'String',
        distributerId: scenario.purchaseMedicine.two.distributerId,
        date: '2023-05-21T14:30:37.146Z',
        medicine: { foo: 'bar' },
        total: 6241837.890222306,
        discount: 9985730.918636762,
        sgst: 4217303.6742906375,
        cgst: 8753238.546012968,
        grand_total: 7410434.193474509,
        updated_at: '2023-05-21T14:30:37.146Z',
      },
    })

    expect(result.invoiceNo).toEqual('String')
    expect(result.distributerId).toEqual(
      scenario.purchaseMedicine.two.distributerId
    )
    expect(result.date).toEqual(new Date('2023-05-21T14:30:37.146Z'))
    expect(result.medicine).toEqual({ foo: 'bar' })
    expect(result.total).toEqual(6241837.890222306)
    expect(result.discount).toEqual(9985730.918636762)
    expect(result.sgst).toEqual(4217303.6742906375)
    expect(result.cgst).toEqual(8753238.546012968)
    expect(result.grand_total).toEqual(7410434.193474509)
    expect(result.updated_at).toEqual(new Date('2023-05-21T14:30:37.146Z'))
  })

  scenario('updates a purchaseMedicine', async (scenario) => {
    const original = await purchaseMedicine({
      id: scenario.purchaseMedicine.one.id,
    })
    const result = await updatePurchaseMedicine({
      id: original.id,
      input: { invoiceNo: 'String2' },
    })

    expect(result.invoiceNo).toEqual('String2')
  })

  scenario('deletes a purchaseMedicine', async (scenario) => {
    const original = await deletePurchaseMedicine({
      id: scenario.purchaseMedicine.one.id,
    })
    const result = await purchaseMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
