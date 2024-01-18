import {
  dossages,
  dossage,
  createDossage,
  updateDossage,
  deleteDossage,
} from './dossages'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dossages', () => {
  scenario('returns all dossages', async (scenario) => {
    const result = await dossages()

    expect(result.length).toEqual(Object.keys(scenario.dossage).length)
  })

  scenario('returns a single dossage', async (scenario) => {
    const result = await dossage({ id: scenario.dossage.one.id })

    expect(result).toEqual(scenario.dossage.one)
  })

  scenario('creates a dossage', async () => {
    const result = await createDossage({
      input: { dose: 'String', updated_at: '2024-01-18T09:14:12.933Z' },
    })

    expect(result.dose).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-01-18T09:14:12.933Z'))
  })

  scenario('updates a dossage', async (scenario) => {
    const original = await dossage({ id: scenario.dossage.one.id })
    const result = await updateDossage({
      id: original.id,
      input: { dose: 'String2' },
    })

    expect(result.dose).toEqual('String2')
  })

  scenario('deletes a dossage', async (scenario) => {
    const original = await deleteDossage({
      id: scenario.dossage.one.id,
    })
    const result = await dossage({ id: original.id })

    expect(result).toEqual(null)
  })
})
