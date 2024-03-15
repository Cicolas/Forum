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
import PostService from './services/PostService';

const redirectLoader = (path: string) => async () => redirect(path);

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" loader={redirectLoader("/home")}></Route>
    <Route element={<Root />}>
      <Route path="feed" loader={redirectLoader("recent")}></Route>
      <Route path="feed" element={<Feed />}>
        <Route
          path="recent"
          element={<Recent />}
          loader={PostService.getAllPost}
        ></Route>
        <Route
          path="category/:categoryName"
          element={<Category />}
          loader={({ params }) =>
            PostService.getAllPostByCategory(params.categoryName as string)
          }
        ></Route>
      </Route>
      <Route
        path="post/:postId"
        element={<Post />}
        loader={({ params }) =>
          PostService.getPostById(params.postId as string)
        }
      ></Route>
      <Route
        path="user/:userId"
        element={<UserFeed />}
        loader={({ params }) =>
          PostService.getAllPostByUser(params.userId as string)
        }
      ></Route>
    </Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}