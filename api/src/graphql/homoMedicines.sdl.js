export const schema = gql`
  type HomoMedicine {
    id: Int!
    name: String!
    no: String!
    potency: String!
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
    no: String!
    potency: String!
    extra: JSON
  }

  input UpdateHomoMedicineInput {
    name: String
    no: String
    potency: String
    extra: JSON
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
