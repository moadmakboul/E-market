import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Cart from './pages/Cart'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import RegisterPage from './pages/RegisterPage'
import CompletionPage from './pages/CompletionPage';
import { LoginContextProvider } from './context/LoginContext';
import { ShopContextProvider } from './context/ShopContext';
import DescriptivePage from './pages/DescriptivePage';
import CheckoutPage from './pages/CheckoutPage';
import { PaymentContextProvider } from './context/PaymentContext';

function App() {
  return (
    <Router>
      <LoginContextProvider>
        <ShopContextProvider>
          <PaymentContextProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/product/:id/' element={<DescriptivePage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/completion' element={<CompletionPage />} />
              </Routes>
            </div>
          </PaymentContextProvider>
        </ShopContextProvider>
      </LoginContextProvider>
    </Router>
  );
}

export default App;
