import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Signin from './pages/signin.jsx';
import ForgotPassword from './pages/forgotPassword.jsx';
import Verifycode from './pages/verifycode.jsx';
import Resetpassword from './pages/resetpassword.jsx';
import Resetsuccess from './pages/resetsuccess.jsx';
import HotelPage from './pages/HotelPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { ToastContainer } from 'react-toastify';
import Addnewhotel from './admincomponents/Addnewhotel.jsx';
import SubSuccess from './pages/SubSuccess.jsx';
import BookingSuccess from './pages/BookingSuccess.jsx';
import StripeCheckout from "./components/Payment.jsx";
import AdminSignin from './pages/AdminSignin.jsx';
import Bookings from './admincomponents/bookings.jsx';
import EditHotel from './admincomponents/EditHotel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DeleteHotel from './admincomponents/DeleteHotel.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Appcontent />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

function Appcontent() {




  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminsignin" element={<AdminSignin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifycode" element={<Verifycode />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/resetsuccess" element={<Resetsuccess />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path='/adminpage' element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/addnewhotel" element={
          <ProtectedRoute>
            <Addnewhotel />
          </ProtectedRoute>
        } />
        <Route path="/edithotel" element={
          <ProtectedRoute>
            <EditHotel />
          </ProtectedRoute>
        } />
        <Route path="/deletehotel" element={
          <ProtectedRoute>
            <DeleteHotel/>
          </ProtectedRoute>
        } />
        <Route path="/subsuccess" element={<SubSuccess />} />
        <Route path="/bookingsuccess" element={<BookingSuccess />} />
        <Route path="/payment" element={<StripeCheckout />} />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings/>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
