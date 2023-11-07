export const standard = defineScenario({
  ipdPrescription: {
    one: {
      data: {
        medicine: 'String',
        dosage: 'String',
        timing: 'String',
        frequency: 'String',
        duration: 'String',
        note: 'String',
        updated_at: '2023-11-07T09:45:10.918Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-11-07T09:45:10.918Z',
            updated_at: '2023-11-07T09:45:10.918Z',
            paid_amount: 8863500.060338782,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 4906498,
                updated_at: '2023-11-07T09:45:10.918Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        medicine: 'String',
        dosage: 'String',
        timing: 'String',
        frequency: 'String',
        duration: 'String',
        note: 'String',
        updated_at: '2023-11-07T09:45:10.918Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-11-07T09:45:10.918Z',
            updated_at: '2023-11-07T09:45:10.918Z',
            paid_amount: 7591454.560265521,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 2290428,
                updated_at: '2023-11-07T09:45:10.918Z',
              },
            },
          },
        },
      },
    },
  },
})
