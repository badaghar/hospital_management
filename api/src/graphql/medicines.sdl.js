export const schema = gql`
  type Medicine {
    id: Int!
    quantity: Int!
    pid: Product!
    productId: Int!
    batch: String!
    exp: DateTime!
    mrp: Float!
    sgst: Float!
    cgst: Float!
    discount: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    medicines: [Medicine!]! @requireAuth
    medicine(id: Int!): Medicine @requireAuth
  }

  input CreateMedicineInput {
    quantity: Int!
    productId: Int!
    batch: String!
    exp: DateTime!
    mrp: Float!
    sgst: Float!
    cgst: Float!
    discount: Float!
  }

  input UpdateMedicineInput {
    quantity: Int
    productId: Int
    batch: String
    exp: DateTime
    mrp: Float
    sgst: Float
    cgst: Float
    discount: Float
  }

  type Mutation {
    createMedicine(input: CreateMedicineInput!): Medicine! @requireAuth
    updateMedicine(id: Int!, input: UpdateMedicineInput!): Medicine!
      @requireAuth
    deleteMedicine(id: Int!): Medicine! @requireAuth
  }
`
