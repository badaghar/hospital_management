import {
  labChargeses,
  labCharges,
  createLabCharges,
  updateLabCharges,
  deleteLabCharges,
} from './labChargeses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('labChargeses', () => {
  scenario('returns all labChargeses', async (scenario) => {
    const result = await labChargeses()

    expect(result.length).toEqual(Object.keys(scenario.labCharges).length)
  })

  scenario('returns a single labCharges', async (scenario) => {
    const result = await labCharges({ id: scenario.labCharges.one.id })

    expect(result).toEqual(scenario.labCharges.one)
  })

  scenario('creates a labCharges', async () => {
    const result = await createLabCharges({
      input: {
        name: 'String7590574',
        amount: 8968262.037183693,
        updated_at: '2023-06-27T02:35:08.663Z',
      },
    })

    expect(result.name).toEqual('String7590574')
    expect(result.amount).toEqual(8968262.037183693)
    expect(result.updated_at).toEqual(new Date('2023-06-27T02:35:08.663Z'))
  })

  scenario('updates a labCharges', async (scenario) => {
    const original = await labCharges({
      id: scenario.labCharges.one.id,
    })
    const result = await updateLabCharges({
      id: original.id,
      input: { name: 'String98721522' },
    })

    expect(result.name).toEqual('String98721522')
  })

  scenario('deletes a labCharges', async (scenario) => {
    const original = await deleteLabCharges({
      id: scenario.labCharges.one.id,
    })
    const result = await labCharges({ id: original.id })

    expect(result).toEqual(null)
  })
})
