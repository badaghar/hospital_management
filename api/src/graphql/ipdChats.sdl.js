export const schema = gql`
  type IpdChat {
    id: Int!
    created_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
    date: DateTime!
    drug: String!
    dose: String!
    route: String!
    updated_at: DateTime!
  }

  type Query {
    ipdChats: [IpdChat!]! @requireAuth
    ipdChat(id: Int!): IpdChat @requireAuth
  }

  input CreateIpdChatInput {
    ipdId: Int!
    date: DateTime!
    drug: String!
    dose: String!
    route: String!
  }

  input UpdateIpdChatInput {
    ipdId: Int
    date: DateTime
    drug: String
    dose: String
    route: String
  }

  type Mutation {
    createIpdChat(input: [CreateIpdChatInput]!): IpdChat @requireAuth
    updateIpdChat(id: Int!, input: UpdateIpdChatInput!): IpdChat! @requireAuth
    deleteIpdChat(id: Int!): IpdChat! @requireAuth
  }
`
