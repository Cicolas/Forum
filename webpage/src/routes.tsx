import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Post } from './pages/post/post';

import 'dayjs/locale/pt-br';
import { Recent } from './pages/recent/recent';
import { Feed } from './components/Feed';
import { Root } from './components/Root';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" element={<Root />}>
      <Route path="feed" element={<Feed />}>
        <Route path="recent" element={<Recent />}></Route>
        <Route path="category"></Route>
      </Route>
      <Route path="post/:postId" element={<Post />}></Route>
    </Route>
    {/* Absoulte pathings */}
    <Route path="/feed/*" element={<Navigate to="/feed/recent" replace/>}></Route>
  </>)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
