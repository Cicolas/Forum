import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { Post } from './views/post/post';

import { CategoryContainer } from './components/CategoryContainer';
import { Root } from './components/Page/Root';
import { Recent } from './views/feed/recent';
import { Category } from './views/feed/category';
import { Login } from './views/auth/login';
import { Register } from './views/auth/register';
import { UserFeed } from './views/user/userFeed';
import PostService from './services/PostService';
import { Home } from './views/home/home';
import Error404 from './404';
import { CategoryAdmin } from './views/admin/category/categoryAdmin';

const redirectLoader = (path: string) => async () => redirect(path);

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" loader={redirectLoader("/home")} errorElement={<Error404/>}></Route>
    <Route element={<Root searchBar={false}/>}>
      <Route path="home" element={<Home/>}></Route>
      <Route path="admin">
        <Route element={<CategoryContainer isAdmin />}>
          <Route path="category" element={<CategoryAdmin/>}></Route>
        </Route>
      </Route>
    </Route>
    <Route element={<Root />}>
      <Route path="feed" loader={redirectLoader("recent")}></Route>
      <Route path="feed" element={<CategoryContainer />}>
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