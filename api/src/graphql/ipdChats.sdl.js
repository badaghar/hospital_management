export const schema = gql`
  type IpdChat {
    id: Int!
    created_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
    updated_at: DateTime!
  }

  type Query {
    ipdChats: [IpdChat!]! @requireAuth
    ipdChat(id: Int!): IpdChat @requireAuth
  }

  input CreateIpdChatInput {
    created_at: DateTime!
    ipdId: Int!
    updated_at: DateTime!
  }

  input UpdateIpdChatInput {
    created_at: DateTime
    ipdId: Int
    updated_at: DateTime
  }

  type Mutation {
    createIpdChat(input: CreateIpdChatInput!): IpdChat! @requireAuth
    updateIpdChat(id: Int!, input: UpdateIpdChatInput!): IpdChat! @requireAuth
    deleteIpdChat(id: Int!): IpdChat! @requireAuth
  }
`
