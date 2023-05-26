import {
  compositions,
  composition,
  createComposition,
  updateComposition,
  deleteComposition,
} from './compositions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('compositions', () => {
  scenario('returns all compositions', async (scenario) => {
    const result = await compositions()

    expect(result.length).toEqual(Object.keys(scenario.composition).length)
  })

  scenario('returns a single composition', async (scenario) => {
    const result = await composition({ id: scenario.composition.one.id })

    expect(result).toEqual(scenario.composition.one)
  })

  scenario('creates a composition', async () => {
    const result = await createComposition({
      input: { name: 'String', updated_at: '2023-05-21T15:23:40.489Z' },
    })

    expect(result.name).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-05-21T15:23:40.489Z'))
  })

  scenario('updates a composition', async (scenario) => {
    const original = await composition({
      id: scenario.composition.one.id,
    })
    const result = await updateComposition({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a composition', async (scenario) => {
    const original = await deleteComposition({
      id: scenario.composition.one.id,
    })
    const result = await composition({ id: original.id })

    expect(result).toEqual(null)
  })
})
