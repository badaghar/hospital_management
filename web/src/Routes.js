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










      <Route path="/download-purchase-medicine" page={DownloadsDownloadPurchaseMedicinePage} name="downloadPurchaseMedicine" />
      <Route path="/download-sale-medicine/{id:Int}" page={DownloadsDownloadSaleMedicinePage} name="downloadSaleMedicine" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />


          <Route path="/signup" page={SignupPage} name="signup" />

      <Private unauthenticated='login' >

        <Set wrap={DashboardLayout}>

      <Route path="/view-bed" page={BedViewBedPage} name="viewBed" />




          <Route path="/" page={HomePage} name="home" />
          <Route path="/pharmacy-report/{id:Int}" page={PharmacyReportPage} name="pharmacyReport" />

          <Route path="/view-sale-medicine/{id:Int}" page={ViewSaleMedicinePage} name="viewSaleMedicine" />
          <Set wrap={PharmacyReportLayout}>
          </Set>

          <Route path="/medicine-payment" page={MedicinePaymentPage} name="medicinePayment" />
          <Set wrap={MedicinePaymentLayout}>
          </Set>

          <Set wrap={ScaffoldLayout} title="PaymentPurchaseMedicines" titleTo="paymentPurchaseMedicines" buttonLabel="" buttonTo="paymentPurchaseMedicines">
            <Route path="/payment-purchase-medicines/new" page={PaymentPurchaseMedicineNewPaymentPurchaseMedicinePage} name="newPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}/edit" page={PaymentPurchaseMedicineEditPaymentPurchaseMedicinePage} name="editPaymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines/{id:Int}" page={PaymentPurchaseMedicinePaymentPurchaseMedicinePage} name="paymentPurchaseMedicine" />
            <Route path="/payment-purchase-medicines" page={PaymentPurchaseMedicinePaymentPurchaseMedicinesPage} name="paymentPurchaseMedicines" />
          </Set>

          <Set wrap={ScaffoldLayout} title="SaleMedicines" titleTo="saleMedicines" buttonLabel="New SaleMedicine" buttonTo="newSaleMedicine">
            <Route path="/sale-medicines/new" page={SaleMedicineNewSaleMedicinePage} name="newSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}/edit" page={SaleMedicineEditSaleMedicinePage} name="editSaleMedicine" />
            <Route path="/sale-medicines/{id:Int}" page={SaleMedicineSaleMedicinePage} name="saleMedicine" />
            <Route path="/sale-medicines" page={SaleMedicineSaleMedicinesPage} name="saleMedicines" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Medicines" titleTo="medicines" buttonLabel="Medicine Details" buttonTo="medicines">
            <Route path="/medicines/new" page={MedicineNewMedicinePage} name="newMedicine" />
            <Route path="/medicines/{id:Int}/edit" page={MedicineEditMedicinePage} name="editMedicine" />
            <Route path="/medicines/{id:Int}" page={MedicineMedicinePage} name="medicine" />
            <Route path="/medicines" page={MedicineMedicinesPage} name="medicines" />
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
          <Set wrap={ScaffoldLayout} title="DoctorFees" titleTo="doctorFees" buttonLabel="New DoctorFee" buttonTo="newDoctorFee">
            <Route path="/doctor-fees/new" page={DoctorFeeNewDoctorFeePage} name="newDoctorFee" />
            <Route path="/doctor-fees/{id:Int}/edit" page={DoctorFeeEditDoctorFeePage} name="editDoctorFee" />
            <Route path="/doctor-fees/{id:Int}" page={DoctorFeeDoctorFeePage} name="doctorFee" />
            <Route path="/doctor-fees" page={DoctorFeeDoctorFeesPage} name="doctorFees" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Patients" titleTo="patients" buttonLabel="New Patient" buttonTo="newPatient">
            <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
            <Route path="/patients/{id:Int}/edit" page={PatientEditPatientPage} name="editPatient" />
            <Route path="/patients/{id:Int}" page={PatientPatientPage} name="patient" />
            <Route path="/patients" page={PatientPatientsPage} name="patients" />
          </Set>


          {/* hospitals */}
          <Set wrap={ScaffoldLayout} title="Chargeses" titleTo="chargeses" buttonLabel="New Charges" buttonTo="newCharges">
            <Route path="/chargeses/new" page={ChargesNewChargesPage} name="newCharges" />
            <Route path="/chargeses/{id:Int}/edit" page={ChargesEditChargesPage} name="editCharges" />
            <Route path="/chargeses/{id:Int}" page={ChargesChargesPage} name="charges" />
            <Route path="/chargeses" page={ChargesChargesesPage} name="chargeses" />
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
          <Set wrap={ScaffoldLayout} title="Operations" titleTo="operations" buttonLabel="New Operation" buttonTo="newOperation">
            <Route path="/operations/new" page={OperationNewOperationPage} name="newOperation" />
            <Route path="/operations/{id:Int}/edit" page={OperationEditOperationPage} name="editOperation" />
            <Route path="/operations/{id:Int}" page={OperationOperationPage} name="operation" />
            <Route path="/operations" page={OperationOperationsPage} name="operations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Ipds" titleTo="ipds" buttonLabel="New Ipd" buttonTo="newIpd">
            <Route path="/ipds/new" page={IpdNewIpdPage} name="newIpd" />
            <Route path="/ipds/{id:Int}/edit" page={IpdEditIpdPage} name="editIpd" />
            <Route path="/ipds/{id:Int}" page={IpdIpdPage} name="ipd" />
            <Route path="/ipds" page={IpdIpdsPage} name="ipds" />
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
          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
