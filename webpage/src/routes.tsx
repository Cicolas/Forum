import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Root } from './root';
import { Post } from './pages/post/post';

import 'dayjs/locale/pt-br';
import { Recent } from './pages/recent/recent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <Root />,
    children: [
      {
        path: '/post/:postId',
        element: <Post />
      },
      {
        path: '/recent',
        element: <Recent />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
