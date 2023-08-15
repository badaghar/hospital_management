import {
  returnExpiryMedicines,
  returnExpiryMedicine,
  createReturnExpiryMedicine,
  updateReturnExpiryMedicine,
  deleteReturnExpiryMedicine,
} from './returnExpiryMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('returnExpiryMedicines', () => {
  scenario('returns all returnExpiryMedicines', async (scenario) => {
    const result = await returnExpiryMedicines()

    expect(result.length).toEqual(
      Object.keys(scenario.returnExpiryMedicine).length
    )
  })

  scenario('returns a single returnExpiryMedicine', async (scenario) => {
    const result = await returnExpiryMedicine({
      id: scenario.returnExpiryMedicine.one.id,
    })

    expect(result).toEqual(scenario.returnExpiryMedicine.one)
  })

  scenario('creates a returnExpiryMedicine', async () => {
    const result = await createReturnExpiryMedicine({
      input: {
        distributerId: 1516887,
        medicine: { foo: 'bar' },
        return_med: true,
        updated_at: '2023-08-15T05:54:37.762Z',
      },
    })

    expect(result.distributerId).toEqual(1516887)
    expect(result.medicine).toEqual({ foo: 'bar' })
    expect(result.return_med).toEqual(true)
    expect(result.updated_at).toEqual(new Date('2023-08-15T05:54:37.762Z'))
  })

  scenario('updates a returnExpiryMedicine', async (scenario) => {
    const original = await returnExpiryMedicine({
      id: scenario.returnExpiryMedicine.one.id,
    })
    const result = await updateReturnExpiryMedicine({
      id: original.id,
      input: { distributerId: 2240743 },
    })

    expect(result.distributerId).toEqual(2240743)
  })

  scenario('deletes a returnExpiryMedicine', async (scenario) => {
    const original = await deleteReturnExpiryMedicine({
      id: scenario.returnExpiryMedicine.one.id,
    })
    const result = await returnExpiryMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
