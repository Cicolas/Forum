import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import { Routes } from './routes';
import 'dayjs/locale/pt-br';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from 'react-tooltip'
import { LoadingProvider } from './context/LoadingContext';
import { CategoryProvider } from './context/CategoryContext';

export function App() {
  return <AuthProvider>
    <LoadingProvider>
      <CategoryProvider>
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
        <Tooltip id="tooltip-controller" />
      </CategoryProvider>
    </LoadingProvider>
  </AuthProvider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);