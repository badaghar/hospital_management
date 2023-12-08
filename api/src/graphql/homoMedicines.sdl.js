export const schema = gql`
  type HomoMedicine {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    homoMedicines: [HomoMedicine!]! @requireAuth
    homoMedicine(id: Int!): HomoMedicine @requireAuth
  }

  input CreateHomoMedicineInput {
    name: String!
  }

  input UpdateHomoMedicineInput {
    name: String
  }

  type Mutation {
    createHomoMedicine(input: CreateHomoMedicineInput!): HomoMedicine!
      @requireAuth
    updateHomoMedicine(
      id: Int!
      input: UpdateHomoMedicineInput!
    ): HomoMedicine! @requireAuth
    deleteHomoMedicine(id: Int!): HomoMedicine! @requireAuth
  }
`
