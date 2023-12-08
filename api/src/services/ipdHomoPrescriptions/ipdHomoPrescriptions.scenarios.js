export const standard = defineScenario({
  ipdHomoPrescription: {
    one: {
      data: {
        medicine: 'String',
        dosage: 'String',
        timing: 'String',
        frequency: 'String',
        duration: 'String',
        rate: 128624,
        updated_at: '2023-12-08T09:49:13.521Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-12-08T09:49:13.521Z',
            updated_at: '2023-12-08T09:49:13.521Z',
            paid_amount: 7636847.440298689,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 2378103,
                updated_at: '2023-12-08T09:49:13.521Z',
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
        rate: 9841201,
        updated_at: '2023-12-08T09:49:13.521Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-12-08T09:49:13.521Z',
            updated_at: '2023-12-08T09:49:13.521Z',
            paid_amount: 7864344.816671336,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 5453316,
                updated_at: '2023-12-08T09:49:13.521Z',
              },
            },
          },
        },
      },
    },
  },
})
