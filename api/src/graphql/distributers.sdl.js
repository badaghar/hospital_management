export const schema = gql`
  type Distributer {
    id: Int!
    name: String!
    phoneNo: String!
    gstNo: String
    dlNo: String
    created_at: DateTime!
    updated_at: DateTime!
    purchase_medicine: [PurchaseMedicine]!
  }

  type Query {
    distributers: [Distributer!]! @requireAuth
    distributer(id: Int!): Distributer @requireAuth
  }

  input CreateDistributerInput {
    name: String!
    phoneNo: String!
    gstNo: String
    dlNo: String
  }

  input UpdateDistributerInput {
    name: String
    phoneNo: String
    gstNo: String
    dlNo: String
  }

  type Mutation {
    createDistributer(input: CreateDistributerInput!): Distributer! @requireAuth
    updateDistributer(id: Int!, input: UpdateDistributerInput!): Distributer!
      @requireAuth
    deleteDistributer(id: Int!): Distributer! @requireAuth
  }
`
