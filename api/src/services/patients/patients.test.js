import {
  patients,
  patient,
  createPatient,
  updatePatient,
  deletePatient,
} from './patients'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('patients', () => {
  scenario('returns all patients', async (scenario) => {
    const result = await patients()

    expect(result.length).toEqual(Object.keys(scenario.patient).length)
  })

  scenario('returns a single patient', async (scenario) => {
    const result = await patient({ id: scenario.patient.one.id })

    expect(result).toEqual(scenario.patient.one)
  })

  scenario('creates a patient', async () => {
    const result = await createPatient({
      input: {
        name: 'String',
        age: 785799,
        phone_no: 'String',
        gender: 'String',
        updated_at: '2023-05-21T14:26:09.243Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.age).toEqual(785799)
    expect(result.phone_no).toEqual('String')
    expect(result.gender).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-05-21T14:26:09.243Z'))
  })

  scenario('updates a patient', async (scenario) => {
    const original = await patient({ id: scenario.patient.one.id })
    const result = await updatePatient({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a patient', async (scenario) => {
    const original = await deletePatient({
      id: scenario.patient.one.id,
    })
    const result = await patient({ id: original.id })

    expect(result).toEqual(null)
  })
})
