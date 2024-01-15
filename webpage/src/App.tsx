import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './routes';
import 'dayjs/locale/pt-br';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return <AuthProvider>
    <Routes />
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </AuthProvider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);