import {
  chargeses,
  charges,
  createCharges,
  updateCharges,
  deleteCharges,
} from './chargeses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('chargeses', () => {
  scenario('returns all chargeses', async (scenario) => {
    const result = await chargeses()

    expect(result.length).toEqual(Object.keys(scenario.charges).length)
  })

  scenario('returns a single charges', async (scenario) => {
    const result = await charges({ id: scenario.charges.one.id })

    expect(result).toEqual(scenario.charges.one)
  })

  scenario('creates a charges', async () => {
    const result = await createCharges({
      input: {
        name: 'String',
        amount: 7554245.582978254,
        updated_at: '2023-06-02T13:17:05.052Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.amount).toEqual(7554245.582978254)
    expect(result.updated_at).toEqual(new Date('2023-06-02T13:17:05.052Z'))
  })

  scenario('updates a charges', async (scenario) => {
    const original = await charges({ id: scenario.charges.one.id })
    const result = await updateCharges({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a charges', async (scenario) => {
    const original = await deleteCharges({
      id: scenario.charges.one.id,
    })
    const result = await charges({ id: original.id })

    expect(result).toEqual(null)
  })
})
