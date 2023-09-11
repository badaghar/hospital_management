import {
  birthCertificates,
  birthCertificate,
  createBirthCertificate,
  updateBirthCertificate,
  deleteBirthCertificate,
} from './birthCertificates'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('birthCertificates', () => {
  scenario('returns all birthCertificates', async (scenario) => {
    const result = await birthCertificates()

    expect(result.length).toEqual(Object.keys(scenario.birthCertificate).length)
  })

  scenario('returns a single birthCertificate', async (scenario) => {
    const result = await birthCertificate({
      id: scenario.birthCertificate.one.id,
    })

    expect(result).toEqual(scenario.birthCertificate.one)
  })

  scenario('creates a birthCertificate', async () => {
    const result = await createBirthCertificate({
      input: {
        name: 'String',
        birth_date: '2023-09-10T19:04:33.409Z',
        type: 4241008,
        updated_at: '2023-09-10T19:04:33.409Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.birth_date).toEqual(new Date('2023-09-10T19:04:33.409Z'))
    expect(result.type).toEqual(4241008)
    expect(result.updated_at).toEqual(new Date('2023-09-10T19:04:33.409Z'))
  })

  scenario('updates a birthCertificate', async (scenario) => {
    const original = await birthCertificate({
      id: scenario.birthCertificate.one.id,
    })
    const result = await updateBirthCertificate({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a birthCertificate', async (scenario) => {
    const original = await deleteBirthCertificate({
      id: scenario.birthCertificate.one.id,
    })
    const result = await birthCertificate({ id: original.id })

    expect(result).toEqual(null)
  })
})
