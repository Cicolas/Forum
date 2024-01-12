import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Post } from './pages/post/post';

import 'dayjs/locale/pt-br';
import { Feed } from './components/Feed';
import { Root } from './components/Root';
import { Recent } from './pages/feed/recent';
import { Category } from './pages/feed/category';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" element={<Root />}>
      <Route path="feed" element={<Feed />}>
        <Route path="recent" element={<Recent />}></Route>
        <Route path="category" element={<Category />}></Route>
      </Route>
      <Route path="post/:postId" element={<Post />}></Route>
    </Route>
    <Route path="/login"></Route>
    <Route path="/register"></Route>
  </>)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
