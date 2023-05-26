export const standard = defineScenario({
  purchaseMedicine: {
    one: {
      data: {
        invoiceNo: 'String',
        date: '2023-05-21T14:30:37.156Z',
        medicine: { foo: 'bar' },
        total: 5917769.716907158,
        discount: 8500232.391088152,
        sgst: 1868014.3880817955,
        cgst: 8717639.847176235,
        grand_total: 7327041.825644061,
        updated_at: '2023-05-21T14:30:37.156Z',
        did: {
          create: {
            name: 'String',
            phoneNo: 'String',
            updated_at: '2023-05-21T14:30:37.156Z',
          },
        },
      },
    },
    two: {
      data: {
        invoiceNo: 'String',
        date: '2023-05-21T14:30:37.156Z',
        medicine: { foo: 'bar' },
        total: 1858331.5430005442,
        discount: 8897011.05340862,
        sgst: 2729294.0825145175,
        cgst: 8636552.198614541,
        grand_total: 6769883.079227823,
        updated_at: '2023-05-21T14:30:37.156Z',
        did: {
          create: {
            name: 'String',
            phoneNo: 'String',
            updated_at: '2023-05-21T14:30:37.156Z',
          },
        },
      },
    },
  },
})
