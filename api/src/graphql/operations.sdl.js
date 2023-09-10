export const schema = gql`
  type Operation {
    id: Int!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    operations: [Operation!]! @requireAuth
    operation(id: Int!): Operation @requireAuth
  }

  input CreateOperationInput {
    name: String!
  }

  input UpdateOperationInput {
    name: String
  }

  type Mutation {
    createOperation(input: CreateOperationInput!): Operation! @requireAuth
    updateOperation(id: Int!, input: UpdateOperationInput!): Operation!
      @requireAuth
    deleteOperation(id: Int!): Operation! @requireAuth
  }
`
