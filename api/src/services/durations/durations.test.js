import {
  durations,
  duration,
  createDuration,
  updateDuration,
  deleteDuration,
} from './durations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('durations', () => {
  scenario('returns all durations', async (scenario) => {
    const result = await durations()

    expect(result.length).toEqual(Object.keys(scenario.duration).length)
  })

  scenario('returns a single duration', async (scenario) => {
    const result = await duration({ id: scenario.duration.one.id })

    expect(result).toEqual(scenario.duration.one)
  })

  scenario('creates a duration', async () => {
    const result = await createDuration({
      input: { name: 'String', updated_at: '2024-01-18T09:15:16.306Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-01-18T09:15:16.306Z'))
  })

  scenario('updates a duration', async (scenario) => {
    const original = await duration({
      id: scenario.duration.one.id,
    })
    const result = await updateDuration({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a duration', async (scenario) => {
    const original = await deleteDuration({
      id: scenario.duration.one.id,
    })
    const result = await duration({ id: original.id })

    expect(result).toEqual(null)
  })
})
