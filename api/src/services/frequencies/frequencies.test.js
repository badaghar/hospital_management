import {
  frequencies,
  frequency,
  createFrequency,
  updateFrequency,
  deleteFrequency,
} from './frequencies'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('frequencies', () => {
  scenario('returns all frequencies', async (scenario) => {
    const result = await frequencies()

    expect(result.length).toEqual(Object.keys(scenario.frequency).length)
  })

  scenario('returns a single frequency', async (scenario) => {
    const result = await frequency({ id: scenario.frequency.one.id })

    expect(result).toEqual(scenario.frequency.one)
  })

  scenario('creates a frequency', async () => {
    const result = await createFrequency({
      input: { name: 'String', updated_at: '2024-01-18T09:14:36.887Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-01-18T09:14:36.887Z'))
  })

  scenario('updates a frequency', async (scenario) => {
    const original = await frequency({
      id: scenario.frequency.one.id,
    })
    const result = await updateFrequency({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a frequency', async (scenario) => {
    const original = await deleteFrequency({
      id: scenario.frequency.one.id,
    })
    const result = await frequency({ id: original.id })

    expect(result).toEqual(null)
  })
})
