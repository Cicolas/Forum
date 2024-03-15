import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Post } from './views/post/post';

import { Feed } from './components/Feed';
import { Root } from './components/Root';
import { Recent } from './views/feed/recent';
import { Category } from './views/feed/category';
import { Login } from './views/auth/login';
import { Register } from './views/auth/register';
import { UserFeed } from './views/user/userFeed';

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