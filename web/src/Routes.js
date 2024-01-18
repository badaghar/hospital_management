// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import PharmacyReportLayout from './layouts/PharmacyReportLayout/PharmacyReportLayout'
import MedicinePaymentLayout from './layouts/MedicinePaymentLayout/MedicinePaymentLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>









      <Set wrap={ScaffoldLayout} title="IpdHomoPrescriptions" titleTo="ipdHomoPrescriptions" buttonLabel="New IpdHomoPrescription" buttonTo="newIpdHomoPrescription">

        <Route path="/ipd-homo-prescriptions/new" page={IpdHomoPrescriptionNewIpdHomoPrescriptionPage} name="newIpdHomoPrescription" />

        <Route path="/ipd-homo-prescriptions/{id:Int}/edit" page={IpdHomoPrescriptionEditIpdHomoPrescriptionPage} name="editIpdHomoPrescription" />

        <Route path="/ipd-homo-prescriptions/{id:Int}" page={IpdHomoPrescriptionIpdHomoPrescriptionPage} name="ipdHomoPrescription" />

        <Route path="/ipd-homo-prescriptions" page={IpdHomoPrescriptionIpdHomoPrescriptionsPage} name="ipdHomoPrescriptions" />

      </Set>

      <Route path="/download-prescription/{id:Int}" page={DownloadsDownloadPrescriptionPage} name="downloadPrescription" />
      <Set wrap={ScaffoldLayout} title="IpdPrescriptions" titleTo="ipdPrescriptions" buttonLabel="New IpdPrescription" buttonTo="newIpdPrescription">
        <Route path="/ipd-prescriptions/new" page={IpdPrescriptionNewIpdPrescriptionPage} name="newIpdPrescription" />
        <Route path="/ipd-prescriptions/{id:Int}/edit" page={IpdPrescriptionEditIpdPrescriptionPage} name="editIpdPrescription" />
        <Route path="/ipd-prescriptions/{id:Int}" page={IpdPrescriptionIpdPrescriptionPage} name="ipdPrescription" />
        <Route path="/ipd-prescriptions" page={IpdPrescriptionIpdPrescriptionsPage} name="ipdPrescriptions" />
      </Set>
      {/* <Set wrap={ScaffoldLayout} title="ReturnExpiryMedicines" titleTo="returnExpiryMedicines" buttonLabel="New ReturnExpiryMedicine" buttonTo="newReturnExpiryMedicine">
        <Route path="/return-expiry-medicines/new" page={ReturnExpiryMedicineNewReturnExpiryMedicinePage} name="newReturnExpiryMedicine" />
        <Route path="/return-expiry-medicines/{id:Int}/edit" page={ReturnExpiryMedicineEditReturnExpiryMedicinePage} name="editReturnExpiryMedicine" />
        <Route path="/return-expiry-medicines/{id:Int}" page={ReturnExpiryMedicineReturnExpiryMedicinePage} name="returnExpiryMedicine" />
        <Route path="/return-expiry-medicines" page={ReturnExpiryMedicineReturnExpiryMedicinesPage} name="returnExpiryMedicines" />
      </Set> */}



      <Route path="/download-opd-form/{id:Int}" page={DownloadsDownloadOpdFormPage} name="downloadOpdForm" />
      <Route path="/download-other-charges/{id:Int}" page={DownloadsDownloadOtherChargesPage} name="downloadOtherCharges" />
      <Route path="/download-lab-charges/{id:Int}" page={DownloadsDownloadLabChargesPage} name="downloadLabCharges" />
      <Route path="/download-discharge-summary/{id:Int}" page={DownloadsDownloadDischargeSummaryPage} name="downloadDischargeSummary" />
      <Route path="/download-purchase-medicine" page={DownloadsDownloadPurchaseMedicinePage} name="downloadPurchaseMedicine" />
      <Route path="/download-sale-medicine/{id:Int}" page={DownloadsDownloadSaleMedicinePage} name="downloadSaleMedicine" />
      <Route path="/birth-certificates/{id:Int}" page={BirthCertificateBirthCertificatePage} name="birthCertificate" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />



      <Private unauthenticated='login' >

        <Set wrap={DashboardLayout}>

          <Route path="/view-bed" page={BedViewBedPage} name="viewBed" />

          <Route path="/opd-prescription" page={OpdPrescriptionPage} name="opdPrescription" />
          <Route path="/opd-prescripde-cell/{id:Int}" page={OpdPrescripdeCellPage} name="opdPrescripdeCell" />




          <Route path="/" page={HomePage} name="home" />
          <Set wrap={ScaffoldLayout} title="Patients" titleTo="patients" buttonLabel="New Patient" buttonTo="newPatient">
            <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
            <Route path="/patients/{id:Int}/edit" page={PatientEditPatientPage} name="editPatient" />
            <Route path="/patients/{id:Int}" page={PatientPatientPage} name="patient" />
            <Route path="/patients" page={PatientPatientsPage} name="patients" />
          </Set>


          <Private unauthenticated="home" roles={["admin"]}>
            <Route path="/user-roles" page={UserRolesPage} name="userRoles" />
            <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="signup">
              <Route path="/signup" page={SignupPage} name="signup" />

              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
              <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
              <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Set>

            <Set wrap={ScaffoldLayout} title="ReturnExpiryMedicines" titleTo="returnExpiryMedicines" buttonLabel="" buttonTo="returnExpiryMedicines">
              <Route path="/return-expiry-medicines/new" page={ReturnExpiryMedicineNewReturnExpiryMedicinePage} name="newReturnExpiryMedicine" />
              <Route path="/return-expiry-medicines/{id:Int}/edit" page={ReturnExpiryMedicineEditReturnExpiryMedicinePage} name="editReturnExpiryMedicine" />
              <Route path="/return-expiry-medicines/{id:Int}" page={ReturnExpiryMedicineReturnExpiryMedicinePage} name="returnExpiryMedicine" />
              <Route path="/return-expiry-medicines" page={ReturnExpiryMedicineReturnExpiryMedicinesPage} name="returnExpiryMedicines" />
            </Set>
          </Private>


          <Route path="/pharmacy-report/{id:Int}" page={PharmacyReportPage} name="pharmacyReport" />
          <Route path="/view-sale-medicine/{id:Int}" page={ViewSaleMedicinePage} name="viewSaleMedicine" />
          <Route path="/medicine-payment" page={MedicinePaymentPage} name="medicinePayment" />
          <Set wrap={ScaffoldLayout} title="PaymentPurchaseMedicines" titleTo="paymentPurchaseMedicines" buttonLabel="" buttonTo="paymentPurchaseMedicines">
            <Route path="/payment-purchase-medicines/new" page={PaymentPurchaseMedicineNewPaymentPurchaseMedicinePage} name="newPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}/edit" page={PaymentPurchaseMedicineEditPaymentPurchaseMedicinePage} name="editPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}" page={PaymentPurchaseMedicinePaymentPurchaseMedicinePage} name="paymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines" page={PaymentPurchaseMedicinePaymentPurchaseMedicinesPage} name="paymentPurchaseMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Return Medicines" titleTo="returnMedicines" buttonLabel="New ReturnMedicine" buttonTo="newReturnMedicine">
            <Route path="/return-medicines/new" page={ReturnMedicineNewReturnMedicinePage} name="newReturnMedicine" />
            <Route path="/return-medicines/{id:Int}/edit" page={ReturnMedicineEditReturnMedicinePage} name="editReturnMedicine" />
            <Route path="/return-medicines/{id:Int}" page={ReturnMedicineReturnMedicinePage} name="returnMedicine" />
            <Route path="/return-medicines" page={ReturnMedicineReturnMedicinesPage} name="returnMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="SaleMedicines" titleTo="saleMedicines" buttonLabel="New SaleMedicine" buttonTo="newSaleMedicine">
            <Route path="/sale-medicines/new" page={SaleMedicineNewSaleMedicinePage} name="newSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}/edit" page={SaleMedicineEditSaleMedicinePage} name="editSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}" page={SaleMedicineSaleMedicinePage} name="saleMedicine" />
            <Route path="/sale-medicines" page={SaleMedicineSaleMedicinesPage} name="saleMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Medicines" titleTo="medicines" buttonLabel="Medicine Details" buttonTo="medicines">
            <Route path="/medicines/new" page={MedicineNewMedicinePage} name="newMedicine" />
            <Route path="/medicines/{id:Int}/edit" page={MedicineEditMedicinePage} name="editMedicine" />
            <Route path="/medicines/{id:Int}" page={MedicineMedicinePage} name="medicine" />
            <Route path="/medicines" page={MedicineMedicinesPage} name="medicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="HomoMedicines" titleTo="homoMedicines" buttonLabel="New HomoMedicine" buttonTo="newHomoMedicine">
            <Route path="/homo-medicines/new" page={HomoMedicineNewHomoMedicinePage} name="newHomoMedicine" />
            <Route path="/homo-medicines/{id:Int}/edit" page={HomoMedicineEditHomoMedicinePage} name="editHomoMedicine" />
            <Route path="/homo-medicines/{id:Int}" page={HomoMedicineHomoMedicinePage} name="homoMedicine" />
            <Route path="/homo-medicines" page={HomoMedicineHomoMedicinesPage} name="homoMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="PurchaseMedicines" titleTo="purchaseMedicines" buttonLabel="New PurchaseMedicine" buttonTo="newPurchaseMedicine">
            <Route path="/purchase-medicines/new" page={PurchaseMedicineNewPurchaseMedicinePage} name="newPurchaseMedicine" />
            <Route path="/purchase-medicines/{id:Int}/edit" page={PurchaseMedicineEditPurchaseMedicinePage} name="editPurchaseMedicine" />
            <Route path="/purchase-medicines/{id:Int}" page={PurchaseMedicinePurchaseMedicinePage} name="purchaseMedicine" />
            <Route path="/purchase-medicines" page={PurchaseMedicinePurchaseMedicinesPage} name="purchaseMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Products" titleTo="products" buttonLabel="New Product" buttonTo="newProduct">
            <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
            <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
            <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
            <Route path="/products" page={ProductProductsPage} name="products" />
          </Set>
          <Set wrap={ScaffoldLayout} title="ProductToCompositions" titleTo="productToCompositions" buttonLabel="New ProductToComposition" buttonTo="newProductToComposition">
            <Route path="/product-to-compositions/new" page={ProductToCompositionNewProductToCompositionPage} name="newProductToComposition" />
            <Route path="/product-to-compositions/{id:Int}/edit" page={ProductToCompositionEditProductToCompositionPage} name="editProductToComposition" />
            <Route path="/product-to-compositions/{id:Int}" page={ProductToCompositionProductToCompositionPage} name="productToComposition" />
            <Route path="/product-to-compositions" page={ProductToCompositionProductToCompositionsPage} name="productToCompositions" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Compositions" titleTo="compositions" buttonLabel="New Composition" buttonTo="newComposition">
            <Route path="/compositions/new" page={CompositionNewCompositionPage} name="newComposition" />
            <Route path="/compositions/{id:Int}/edit" page={CompositionEditCompositionPage} name="editComposition" />
            <Route path="/compositions/{id:Int}" page={CompositionCompositionPage} name="composition" />
            <Route path="/compositions" page={CompositionCompositionsPage} name="compositions" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Manufacturers" titleTo="manufacturers" buttonLabel="New Manufacturer" buttonTo="newManufacturer">
            <Route path="/manufacturers/new" page={ManufacturerNewManufacturerPage} name="newManufacturer" />
            <Route path="/manufacturers/{id:Int}/edit" page={ManufacturerEditManufacturerPage} name="editManufacturer" />
            <Route path="/manufacturers/{id:Int}" page={ManufacturerManufacturerPage} name="manufacturer" />
            <Route path="/manufacturers" page={ManufacturerManufacturersPage} name="manufacturers" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Distributers" titleTo="distributers" buttonLabel="New Distributer" buttonTo="newDistributer">
            <Route path="/distributers/new" page={DistributerNewDistributerPage} name="newDistributer" />
            <Route path="/distributers/{id:Int}/edit" page={DistributerEditDistributerPage} name="editDistributer" />
            <Route path="/distributers/{id:Int}" page={DistributerDistributerPage} name="distributer" />
            <Route path="/distributers" page={DistributerDistributersPage} name="distributers" />
          </Set>
          {/* </Private> */}










          {/* hospitals */}

          {/* <Private unauthenticated="home" roles={["admin", "reciptionist", "doctor"]}> */}

          <Set wrap={ScaffoldLayout} title="Certificate" titleTo="birthCertificates" buttonLabel="New Certificate" buttonTo="newBirthCertificate" hide='hide'>
            <Route path="/birth-certificates/new" page={BirthCertificateNewBirthCertificatePage} name="newBirthCertificate" />
            <Route path="/birth-certificates/{id:Int}/edit" page={BirthCertificateEditBirthCertificatePage} name="editBirthCertificate" />

            <Route path="/birth-certificates/{type:String}" page={BirthCertificateBirthCertificatesPage} name="birthCertificates" />
          </Set>

          <Set wrap={ScaffoldLayout} title="DoctorFees" titleTo="doctorFees" buttonLabel="New DoctorFee" buttonTo="newDoctorFee">
            <Route path="/doctor-fees/new" page={DoctorFeeNewDoctorFeePage} name="newDoctorFee" />
            <Route path="/doctor-fees/{id:Int}/edit" page={DoctorFeeEditDoctorFeePage} name="editDoctorFee" />
            <Route path="/doctor-fees/{id:Int}" page={DoctorFeeDoctorFeePage} name="doctorFee" />
            <Route path="/doctor-fees" page={DoctorFeeDoctorFeesPage} name="doctorFees" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Chargeses" titleTo="chargeses" buttonLabel="New Charges" buttonTo="newCharges">
            <Route path="/chargeses/new" page={ChargesNewChargesPage} name="newCharges" />
            <Route path="/chargeses/{id:Int}/edit" page={ChargesEditChargesPage} name="editCharges" />
            <Route path="/chargeses/{id:Int}" page={ChargesChargesPage} name="charges" />
            <Route path="/chargeses" page={ChargesChargesesPage} name="chargeses" />
          </Set>
          <Set wrap={ScaffoldLayout} title="LabChargeses" titleTo="labChargeses" buttonLabel="New LabCharges" buttonTo="newLabCharges">
            <Route path="/lab-chargeses/new" page={LabChargesNewLabChargesPage} name="newLabCharges" />
            <Route path="/lab-chargeses/{id:Int}" page={LabChargesLabChargesPage} name="labCharges" />
            <Route path="/lab-chargeses" page={LabChargesLabChargesesPage} name="labChargeses" />
            <Route path="/lab-chargeses/{id:Int}/edit" page={LabChargesEditLabChargesPage} name="editLabCharges" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdPayments" titleTo="ipdPayments" buttonLabel="New IpdPayment" buttonTo="newIpdPayment">
            <Route path="/ipd-payments/new" page={IpdPaymentNewIpdPaymentPage} name="newIpdPayment" />
            <Route path="/ipd-payments/{id:Int}/edit" page={IpdPaymentEditIpdPaymentPage} name="editIpdPayment" />
            <Route path="/ipd-payments/{id:Int}" page={IpdPaymentIpdPaymentPage} name="ipdPayment" />
            <Route path="/ipd-payments" page={IpdPaymentIpdPaymentsPage} name="ipdPayments" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdConsultations" titleTo="ipdConsultations" buttonLabel="New IpdConsultation" buttonTo="newIpdConsultation">
            <Route path="/ipd-consultations/new" page={IpdConsultationNewIpdConsultationPage} name="newIpdConsultation" />
            <Route path="/ipd-consultations/{id:Int}/edit" page={IpdConsultationEditIpdConsultationPage} name="editIpdConsultation" />
            <Route path="/ipd-consultations/{id:Int}" page={IpdConsultationIpdConsultationPage} name="ipdConsultation" />
            <Route path="/ipd-consultations" page={IpdConsultationIpdConsultationsPage} name="ipdConsultations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdChargeses" titleTo="ipdChargeses" buttonLabel="New IpdCharges" buttonTo="newIpdCharges">
            <Route path="/ipd-chargeses/new" page={IpdChargesNewIpdChargesPage} name="newIpdCharges" />
            <Route path="/ipd-chargeses/{id:Int}/edit" page={IpdChargesEditIpdChargesPage} name="editIpdCharges" />
            <Route path="/ipd-chargeses/{id:Int}" page={IpdChargesIpdChargesPage} name="ipdCharges" />
            <Route path="/ipd-chargeses" page={IpdChargesIpdChargesesPage} name="ipdChargeses" />
          </Set>
          <Set wrap={ScaffoldLayout} title="operations" titleTo="operations" buttonLabel="New Operation" buttonTo="newOperation">
            <Route path="/operations/new" page={OperationNewOperationPage} name="newOperation" />
            <Route path="/operations/{id:Int}/edit" page={OperationEditOperationPage} name="editOperation" />
            <Route path="/operations/{id:Int}" page={OperationOperationPage} name="operation" />
            <Route path="/operations" page={OperationOperationsPage} name="operations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="OPDS" titleTo="ipds" buttonLabel="New OPD" buttonTo="newIpd" hide='hide'>
            <Route path="/ipds/new/{type:String}" page={IpdNewIpdPage} name="newIpd" />
            <Route path="/ipds/{id:Int}/edit" page={IpdEditIpdPage} name="editIpd" />
            <Route path="/ipds/{id:Int}" page={IpdIpdPage} name="ipd" />
            <Route path="/ipds/{type:String}" page={IpdIpdsPage} name="ipds" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Opds" titleTo="opds" buttonLabel="New Opd" buttonTo="newOpd">
            <Route path="/opds/new" page={OpdNewOpdPage} name="newOpd" />
            <Route path="/opds/{id:Int}/edit" page={OpdEditOpdPage} name="editOpd" />
            <Route path="/opds/{id:Int}" page={OpdOpdPage} name="opd" />
            <Route path="/opds" page={OpdOpdsPage} name="opds" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Beds" titleTo="beds" buttonLabel="New Bed" buttonTo="newBed">
            <Route path="/beds/new" page={BedNewBedPage} name="newBed" />
            <Route path="/beds/{id:Int}/edit" page={BedEditBedPage} name="editBed" />
            <Route path="/beds/{id:Int}" page={BedBedPage} name="bed" />
            <Route path="/beds" page={BedBedsPage} name="beds" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Floors" titleTo="floors" buttonLabel="New Floor" buttonTo="newFloor">
            <Route path="/floors/new" page={FloorNewFloorPage} name="newFloor" />
            <Route path="/floors/{id:Int}/edit" page={FloorEditFloorPage} name="editFloor" />
            <Route path="/floors/{id:Int}" page={FloorFloorPage} name="floor" />
            <Route path="/floors" page={FloorFloorsPage} name="floors" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdLabChargeses" titleTo="ipdLabChargeses" buttonLabel="New IpdLabCharges" buttonTo="newIpdLabCharges">
            <Route path="/ipd-lab-chargeses/new" page={IpdLabChargesNewIpdLabChargesPage} name="newIpdLabCharges" />
            <Route path="/ipd-lab-chargeses/{id:Int}/edit" page={IpdLabChargesEditIpdLabChargesPage} name="editIpdLabCharges" />
            <Route path="/ipd-lab-chargeses/{id:Int}" page={IpdLabChargesIpdLabChargesPage} name="ipdLabCharges" />
            <Route path="/ipd-lab-chargeses" page={IpdLabChargesIpdLabChargesesPage} name="ipdLabChargeses" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Operations" titleTo="ipdOperationPayments" buttonLabel="New Operations" buttonTo="newIpdOperationPayment">
            <Route path="/ipd-operation-payments/new" page={IpdOperationPaymentNewIpdOperationPaymentPage} name="newIpdOperationPayment" />
            <Route path="/ipd-operation-payments/{id:Int}/edit" page={IpdOperationPaymentEditIpdOperationPaymentPage} name="editIpdOperationPayment" />
            <Route path="/ipd-operation-payments/{id:Int}" page={IpdOperationPaymentIpdOperationPaymentPage} name="ipdOperationPayment" />
            <Route path="/ipd-operation-payments" page={IpdOperationPaymentIpdOperationPaymentsPage} name="ipdOperationPayments" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdSummaries" titleTo="ipdSummaries" buttonLabel="New IpdSummary" buttonTo="newIpdSummary">
            <Route path="/ipd-summaries/new" page={IpdSummaryNewIpdSummaryPage} name="newIpdSummary" />
            <Route path="/ipd-summaries/{id:Int}/edit" page={IpdSummaryEditIpdSummaryPage} name="editIpdSummary" />
            <Route path="/ipd-summaries/{id:Int}" page={IpdSummaryIpdSummaryPage} name="ipdSummary" />
            <Route path="/ipd-summaries" page={IpdSummaryIpdSummariesPage} name="ipdSummaries" />
          </Set>
          <Set wrap={ScaffoldLayout} title="IpdChats" titleTo="ipdChats" buttonLabel="New IpdChat" buttonTo="newIpdChat">
            <Route path="/ipd-chats/new" page={IpdChatNewIpdChatPage} name="newIpdChat" />
            <Route path="/ipd-chats/{id:Int}/edit" page={IpdChatEditIpdChatPage} name="editIpdChat" />
            <Route path="/ipd-chats/{id:Int}" page={IpdChatIpdChatPage} name="ipdChat" />
            <Route path="/ipd-chats" page={IpdChatIpdChatsPage} name="ipdChats" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Files" titleTo="files" buttonLabel="New File" buttonTo="newFile">
            <Route path="/files/new" page={FileNewFilePage} name="newFile" />
            <Route path="/files/{id:Int}/edit" page={FileEditFilePage} name="editFile" />
            <Route path="/files/{id:Int}" page={FileFilePage} name="file" />
            <Route path="/files" page={FileFilesPage} name="files" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Complaintses" titleTo="complaintses" buttonLabel="New Complaints" buttonTo="newComplaints">
            <Route path="/complaintses/new" page={ComplaintsNewComplaintsPage} name="newComplaints" />
            <Route path="/complaintses/{id:Int}/edit" page={ComplaintsEditComplaintsPage} name="editComplaints" />
            <Route path="/complaintses/{id:Int}" page={ComplaintsComplaintsPage} name="complaints" />
            <Route path="/complaintses" page={ComplaintsComplaintsesPage} name="complaintses" />
          </Set>


          <Set wrap={ScaffoldLayout} title="Durations" titleTo="durations" buttonLabel="New Duration" buttonTo="newDuration">
        <Route path="/durations/new" page={DurationNewDurationPage} name="newDuration" />
        <Route path="/durations/{id:Int}/edit" page={DurationEditDurationPage} name="editDuration" />
        <Route path="/durations/{id:Int}" page={DurationDurationPage} name="duration" />
        <Route path="/durations" page={DurationDurationsPage} name="durations" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Frequencies" titleTo="frequencies" buttonLabel="New Frequency" buttonTo="newFrequency">
        <Route path="/frequencies/new" page={FrequencyNewFrequencyPage} name="newFrequency" />
        <Route path="/frequencies/{id:Int}/edit" page={FrequencyEditFrequencyPage} name="editFrequency" />
        <Route path="/frequencies/{id:Int}" page={FrequencyFrequencyPage} name="frequency" />
        <Route path="/frequencies" page={FrequencyFrequenciesPage} name="frequencies" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Dossages" titleTo="dossages" buttonLabel="New Dossage" buttonTo="newDossage">
        <Route path="/dossages/new" page={DossageNewDossagePage} name="newDossage" />
        <Route path="/dossages/{id:Int}/edit" page={DossageEditDossagePage} name="editDossage" />
        <Route path="/dossages/{id:Int}" page={DossageDossagePage} name="dossage" />
        <Route path="/dossages" page={DossageDossagesPage} name="dossages" />
      </Set>
          {/* </Private> */}


          {/* <Set wrap={ScaffoldLayout} title="ManufacturerPurchaseMedicines" titleTo="manufacturerPurchaseMedicines" buttonLabel="New ManufacturerPurchaseMedicine" buttonTo="newManufacturerPurchaseMedicine">
            <Route path="/manufacturer-purchase-medicines/new" page={ManufacturerPurchaseMedicineNewManufacturerPurchaseMedicinePage} name="newManufacturerPurchaseMedicine" />
            <Route path="/manufacturer-purchase-medicines/{id:Int}/edit" page={ManufacturerPurchaseMedicineEditManufacturerPurchaseMedicinePage} name="editManufacturerPurchaseMedicine" />
            <Route path="/manufacturer-purchase-medicines/{id:Int}" page={ManufacturerPurchaseMedicineManufacturerPurchaseMedicinePage} name="manufacturerPurchaseMedicine" />
            <Route path="/manufacturer-purchase-medicines" page={ManufacturerPurchaseMedicineManufacturerPurchaseMedicinesPage} name="manufacturerPurchaseMedicines" />
          </Set> */}

          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
