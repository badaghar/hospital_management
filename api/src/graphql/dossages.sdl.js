export const schema = gql`
  type Dossage {
    id: Int!
    dose: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    dossages: [Dossage!]! @requireAuth
    dossage(id: Int!): Dossage @requireAuth
  }

  input CreateDossageInput {
    dose: String!
    extra: JSON
  }

  input UpdateDossageInput {
    dose: String
    extra: JSON
  }

  type Mutation {
    createDossage(input: CreateDossageInput!): Dossage! @requireAuth
    updateDossage(id: Int!, input: UpdateDossageInput!): Dossage! @requireAuth
    deleteDossage(id: Int!): Dossage! @requireAuth
  }
`
