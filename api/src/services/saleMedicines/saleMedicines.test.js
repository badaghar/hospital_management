import {
  saleMedicines,
  saleMedicine,
  createSaleMedicine,
  updateSaleMedicine,
  deleteSaleMedicine,
} from './saleMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('saleMedicines', () => {
  scenario('returns all saleMedicines', async (scenario) => {
    const result = await saleMedicines()

    expect(result.length).toEqual(Object.keys(scenario.saleMedicine).length)
  })

  scenario('returns a single saleMedicine', async (scenario) => {
    const result = await saleMedicine({ id: scenario.saleMedicine.one.id })

    expect(result).toEqual(scenario.saleMedicine.one)
  })

  scenario('creates a saleMedicine', async (scenario) => {
    const result = await createSaleMedicine({
      input: {
        billNo: 'String',
        date: '2023-05-26T18:01:30.083Z',
        medicine: { foo: 'bar' },
        total: 4198044.959600304,
        discount: 3437051.955528416,
        sgst: 3676478.5122450204,
        cgst: 3098846.1430597147,
        grand_total: 73200.86514548185,
        updated_at: '2023-05-26T18:01:30.083Z',
        patientId: scenario.saleMedicine.two.patientId,
      },
    })

    expect(result.billNo).toEqual('String')
    expect(result.date).toEqual(new Date('2023-05-26T18:01:30.083Z'))
    expect(result.medicine).toEqual({ foo: 'bar' })
    expect(result.total).toEqual(4198044.959600304)
    expect(result.discount).toEqual(3437051.955528416)
    expect(result.sgst).toEqual(3676478.5122450204)
    expect(result.cgst).toEqual(3098846.1430597147)
    expect(result.grand_total).toEqual(73200.86514548185)
    expect(result.updated_at).toEqual(new Date('2023-05-26T18:01:30.083Z'))
    expect(result.patientId).toEqual(scenario.saleMedicine.two.patientId)
  })

  scenario('updates a saleMedicine', async (scenario) => {
    const original = await saleMedicine({
      id: scenario.saleMedicine.one.id,
    })
    const result = await updateSaleMedicine({
      id: original.id,
      input: { billNo: 'String2' },
    })

    expect(result.billNo).toEqual('String2')
  })

  scenario('deletes a saleMedicine', async (scenario) => {
    const original = await deleteSaleMedicine({
      id: scenario.saleMedicine.one.id,
    })
    const result = await saleMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
