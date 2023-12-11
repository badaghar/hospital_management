export const schema = gql`
  type File {
    id: Int!
    title: String!
    url: String!
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    files: [File!]! @requireAuth
    file(id: Int!): File @requireAuth
  }

  input CreateFileInput {
    title: String!
    url: String!
    ipdId: Int!
  }

  input UpdateFileInput {
    title: String
    url: String
    ipdId: Int
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: Int!): File! @requireAuth
  }
`
