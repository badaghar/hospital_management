export const schema = gql`
  type Lab {
    id: Int!
    name: String!
    phone_no: String!
    Address: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    LabPriceList: [LabPriceList]!
  }

  type Query {
    labs: [Lab!]! @requireAuth
    lab(id: Int!): Lab @requireAuth
  }

  input CreateLabInput {
    name: String!
    phone_no: String!
    Address: String!
    extra: JSON
  }

  input UpdateLabInput {
    name: String
    phone_no: String
    Address: String
    extra: JSON
  }

  type Mutation {
    createLab(input: CreateLabInput!): Lab! @requireAuth
    updateLab(id: Int!, input: UpdateLabInput!): Lab! @requireAuth
    deleteLab(id: Int!): Lab! @requireAuth
  }
`
