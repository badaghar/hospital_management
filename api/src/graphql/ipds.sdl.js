export const schema = gql`
  type Ipd {
    id: Int!
    patient: Patient!
    patientId: Int!
    consultant_doctor: String!
    date_of_admission: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    paid_amount: Float!
    discharge_date: DateTime
    patientType: String!
    extra: JSON,
    isWaiting: Boolean!
    pharmacyWaiting: Boolean!
    IpdCharges: [IpdCharges]!
    IpdConsultation: [IpdConsultation]!
    IpdPayment: [IpdPayment]!
    Bed: [Bed]!
    IpdLabCharges: [IpdLabCharges]!
    IpdOperationPayment: [IpdOperationPayment]!
    IpdChat: [IpdChat]!
    IpdSummary: [IpdSummary]!
    IpdPrescription: [IpdPrescription]!
    IpdHomoPrescription: [IpdHomoPrescription]!
    File: [File]!
    Complaints: [Complaints]!
    IpdInvestigation: [IpdInvestigation]!
  }

  type Query {
    ipds(type: String!): [Ipd!]! @requireAuth
    ipd(id: Int!): Ipd @skipAuth
    drWaiting(id: Int!): [Ipd!]! @requireAuth
    pharmacyWaiting: [Ipd!]! @requireAuth
  }

  input CreateIpdInput {
    patientId: Int!
    consultant_doctor: String!
    date_of_admission: DateTime!

    paid_amount: Float!
    discharge_date: DateTime
    patientType: String!
    extra: JSON!
    extra_data: JSON!
    isWaiting: Boolean!
  }

  input UpdateIpdInput {
    patientId: Int
    consultant_doctor: String
    date_of_admission: DateTime
    paid_amount: Float
    discharge_date: DateTime
    patientType: String
    extra: JSON
    isWaiting: Boolean!
  }



  type Mutation {
    createIpd(input: CreateIpdInput!): Ipd! @requireAuth
    updateIpd(id: Int!, input: UpdateIpdInput!): Ipd! @requireAuth
    deleteIpd(id: Int!): Ipd @requireAuth
    dischargePatient(id: Int!) : Ipd @requireAuth
    undischargePatient(id: Int!,bed: Int!) : Ipd @requireAuth
    removePatientFromDrWaitingList(id: Int!) : Int @requireAuth
  }
`
