import {
  returnMedicines,
  returnMedicine,
  createReturnMedicine,
  updateReturnMedicine,
  deleteReturnMedicine,
} from './returnMedicines'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('returnMedicines', () => {
  scenario('returns all returnMedicines', async (scenario) => {
    const result = await returnMedicines()

    expect(result.length).toEqual(Object.keys(scenario.returnMedicine).length)
  })

  scenario('returns a single returnMedicine', async (scenario) => {
    const result = await returnMedicine({
      id: scenario.returnMedicine.one.id,
    })

    expect(result).toEqual(scenario.returnMedicine.one)
  })

  scenario('creates a returnMedicine', async (scenario) => {
    const result = await createReturnMedicine({
      input: {
        date: '2023-06-09T08:50:38.630Z',
        medicine: { foo: 'bar' },
        total: 8481741.30316669,
        discount: 3191397.302457768,
        sgst: 3821775.467645894,
        cgst: 1075223.4767410606,
        grand_total: 5228867.639875041,
        updated_at: '2023-06-09T08:50:38.630Z',
        patientId: scenario.returnMedicine.two.patientId,
      },
    })

    expect(result.date).toEqual(new Date('2023-06-09T08:50:38.630Z'))
    expect(result.medicine).toEqual({ foo: 'bar' })
    expect(result.total).toEqual(8481741.30316669)
    expect(result.discount).toEqual(3191397.302457768)
    expect(result.sgst).toEqual(3821775.467645894)
    expect(result.cgst).toEqual(1075223.4767410606)
    expect(result.grand_total).toEqual(5228867.639875041)
    expect(result.updated_at).toEqual(new Date('2023-06-09T08:50:38.630Z'))
    expect(result.patientId).toEqual(scenario.returnMedicine.two.patientId)
  })

  scenario('updates a returnMedicine', async (scenario) => {
    const original = await returnMedicine({
      id: scenario.returnMedicine.one.id,
    })
    const result = await updateReturnMedicine({
      id: original.id,
      input: { date: '2023-06-10T08:50:38.630Z' },
    })

    expect(result.date).toEqual(new Date('2023-06-10T08:50:38.630Z'))
  })

  scenario('deletes a returnMedicine', async (scenario) => {
    const original = await deleteReturnMedicine({
      id: scenario.returnMedicine.one.id,
    })
    const result = await returnMedicine({ id: original.id })

    expect(result).toEqual(null)
  })
})
