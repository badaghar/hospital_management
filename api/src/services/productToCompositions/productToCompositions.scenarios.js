export const standard = defineScenario({
  productToComposition: {
    one: {
      data: {
        cid: {
          create: { name: 'String', updated_at: '2023-05-21T14:30:00.949Z' },
        },
        pid: {
          create: {
            name: 'String',
            updated_at: '2023-05-21T14:30:00.949Z',
            mid: {
              create: {
                name: 'String',
                updated_at: '2023-05-21T14:30:00.949Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        cid: {
          create: { name: 'String', updated_at: '2023-05-21T14:30:00.949Z' },
        },
        pid: {
          create: {
            name: 'String',
            updated_at: '2023-05-21T14:30:00.949Z',
            mid: {
              create: {
                name: 'String',
                updated_at: '2023-05-21T14:30:00.949Z',
              },
            },
          },
        },
      },
    },
  },
})
