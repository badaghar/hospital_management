export const schema = gql`
  type Complaints {
    id: Int!
    note: String!
    created_at: DateTime!
    updated_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    complaintses: [Complaints!]! @requireAuth
    complaints(id: Int!): Complaints @requireAuth
  }

  input CreateComplaintsInput {
    note: String!

    ipdId: Int!
  }

  input UpdateComplaintsInput {
    note: String
    created_at: DateTime
    updated_at: DateTime
    ipdId: Int
  }

  type Mutation {
    createComplaints(input: CreateComplaintsInput!): Complaints! @requireAuth
    updateComplaints(id: Int!, input: UpdateComplaintsInput!): Complaints!
      @requireAuth
    deleteComplaints(id: Int!): Complaints! @requireAuth
  }
`
