import {
  manufacturerPurchaseMedicines,
  manufacturerPurchaseMedicine,
  createManufacturerPurchaseMedicine,
  updateManufacturerPurchaseMedicine,
  deleteManufacturerPurchaseMedicine,
} from './manufacturerPurchaseMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('manufacturerPurchaseMedicines', () => {
  scenario('returns all manufacturerPurchaseMedicines', async (scenario) => {
    const result = await manufacturerPurchaseMedicines()

    expect(result.length).toEqual(
      Object.keys(scenario.manufacturerPurchaseMedicine).length
    )
  })

  scenario(
    'returns a single manufacturerPurchaseMedicine',
    async (scenario) => {
      const result = await manufacturerPurchaseMedicine({
        id: scenario.manufacturerPurchaseMedicine.one.id,
      })

      expect(result).toEqual(scenario.manufacturerPurchaseMedicine.one)
    }
  )

  scenario('creates a manufacturerPurchaseMedicine', async (scenario) => {
    const result = await createManufacturerPurchaseMedicine({
      input: {
        productId: scenario.manufacturerPurchaseMedicine.two.productId,
        batch: 'String',
        paid_qty: 9704299,
        free_qty: 5809533,
        pack: 3864012,
        exp: '2023-06-15T06:20:36.776Z',
        mrp: 5674053.056124709,
        rate: 5338156.3575491,
        dis: 76787.4384701428,
        sgst: 1873891.2265312169,
        cgst: 1601553.3696443462,
        amount: 3657271.379496223,
        net_amount: 6180963.390334335,
        updated_at: '2023-06-15T06:20:36.776Z',
      },
    })

    expect(result.productId).toEqual(
      scenario.manufacturerPurchaseMedicine.two.productId
    )
    expect(result.batch).toEqual('String')
    expect(result.paid_qty).toEqual(9704299)
    expect(result.free_qty).toEqual(5809533)
    expect(result.pack).toEqual(3864012)
    expect(result.exp).toEqual(new Date('2023-06-15T06:20:36.776Z'))
    expect(result.mrp).toEqual(5674053.056124709)
    expect(result.rate).toEqual(5338156.3575491)
    expect(result.dis).toEqual(76787.4384701428)
    expect(result.sgst).toEqual(1873891.2265312169)
    expect(result.cgst).toEqual(1601553.3696443462)
    expect(result.amount).toEqual(3657271.379496223)
    expect(result.net_amount).toEqual(6180963.390334335)
    expect(result.updated_at).toEqual(new Date('2023-06-15T06:20:36.776Z'))
  })

  scenario('updates a manufacturerPurchaseMedicine', async (scenario) => {
    const original = await manufacturerPurchaseMedicine({
      id: scenario.manufacturerPurchaseMedicine.one.id,
    })
    const result = await updateManufacturerPurchaseMedicine({
      id: original.id,
      input: { batch: 'String2' },
    })

    expect(result.batch).toEqual('String2')
  })

  scenario('deletes a manufacturerPurchaseMedicine', async (scenario) => {
    const original = await deleteManufacturerPurchaseMedicine({
      id: scenario.manufacturerPurchaseMedicine.one.id,
    })
    const result = await manufacturerPurchaseMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
