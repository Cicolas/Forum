import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Post } from './pages/post/post';

import { Feed } from './components/Feed';
import { Root } from './components/Root';
import { Recent } from './pages/feed/recent';
import { Category } from './pages/feed/category';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { UserFeed } from './pages/user/userFeed';

const redirectLoader = (path: string) => async () => redirect(path);

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" loader={redirectLoader("/home")}></Route>
    <Route element={<Root />}>
      <Route path="feed" loader={redirectLoader("recent")}></Route>
      <Route path="feed" element={<Feed />}>
        <Route path="recent" element={<Recent />}></Route>
        <Route path="category" element={<Category />}></Route>
      </Route>
      <Route path="post/:postId" element={<Post />}></Route>
      <Route path="user/:userId" element={<UserFeed />}></Route>
    </Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}