// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import Dashboard from './components/Dashboard.jsx';
// import ProtectedRoute from './components/ProtectedRoute';
// import PublicRoute from './components/PublicRoute';
// import { Provider } from 'react-redux';
// import store from './store/store.jsx';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ItemList from './components/ItemList';
// import './App.css'

// function App() {
//     return (
//         <Provider store={store}>
//             <Router>
//                 <ToastContainer position="top-right" autoClose={3000} />
//                 <Routes>
//                     <Route
//                         path="/login"
//                         element={
//                             <PublicRoute>
//                                 <Login />
//                             </PublicRoute>
//                         }
//                     />
//                     <Route
//                         path="/signup"
//                         element={
//                             <PublicRoute>
//                                 <Signup />
//                             </PublicRoute>
//                         }
//                     />
//                     <Route
//                         path="/dashboard"
//                         element={
//                             <ProtectedRoute>
//                                 <Dashboard />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/items"
//                         element={
//                             <ProtectedRoute>
//                                 <ItemList />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
//                 </Routes>
//             </Router>
//         </Provider>
//     );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cart from "./components/Cart/Cart"
// import HotelList from "./components/Hotel/HotelList"
// import AddHotel from "./components/Hotel/AddHotel";
// import EditHotel from "./components/Hotel/EditHotel";

// function App() {
//     return (
//         <Provider store={store}>
//             <Router>
//                 <ToastContainer position="top-right" autoClose={3000} />
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                     {/* Added a Route for Cart Component */}
//                     <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//                     {/* Added a Route for Hotel List Component */}
//                     <Route path="/hotel" element={<ProtectedRoute><HotelList /></ProtectedRoute>} />
//                     {/* Added a Route for Adding new Hotel Component */}
//                     <Route path="/add-hotel" element={<ProtectedRoute><AddHotel /></ProtectedRoute>} />
//                     {/* Added a Route for Editing new Hotel Component */}
//                     <Route path="/edit-hotel/:id" element={<ProtectedRoute><EditHotel /></ProtectedRoute>} />
//                 </Routes>
//             </Router>
//         </Provider>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./components/Cart/Cart"
import HotelList from "./components/Hotel/HotelList"
import AddHotel from "./components/Hotel/AddHotel";
import EditHotel from "./components/Hotel/EditHotel";
import BookingList from "./components/Booking/BookingList";
import Navigation from "./components/Navigation"; // Add Navigation


function App() {
    return (
        <Provider store={store}>
            <Router>
            <Navigation />
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    {/* Added a Route for Cart Component */}
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    {/* Added a Route for Hotel List Component */}
                    <Route path="/hotel" element={<ProtectedRoute><HotelList /></ProtectedRoute>} />
                    {/* Added a Route for Adding new Hotel Component */}
                    <Route path="/add-hotel" element={<ProtectedRoute><AddHotel /></ProtectedRoute>} />
                    {/* Added a Route for Editing new Hotel Component */}
                    <Route path="/edit-hotel/:id" element={<ProtectedRoute><EditHotel /></ProtectedRoute>} />
                    {/* Added a Route for View Booking List new Hotel Component */}
                    <Route path="/bookings" element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;