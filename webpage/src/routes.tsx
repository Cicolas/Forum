import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { PostPage } from './views/post/PostPage';

import { CategoryContainer } from './components/organisms/CategoryContainer/CategoryContainer';
import { Root } from './components/organisms/Root/Root';
import { RecentFeedPage } from './views/feed/RecentFeedPage';
import { CategoryFeedPage } from './views/feed/CategoryFeedPage';
import { LoginPage } from './views/auth/LoginPage';
import { RegisterPage } from './views/auth/RegisterPage';
import { UserPage } from './views/user/UserPage';
import PostService from './services/PostService';
import { HomePage } from './views/home/HomePage';
import _404Page from './views/_404Page';
import { AdminCategoryPage } from './views/admin/category/AdminCategoryPage';

const redirectLoader = (path: string) => async () => redirect(path);

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" loader={redirectLoader("/home")} errorElement={<_404Page/>}></Route>
    <Route element={<Root searchBar={false}/>}>
      <Route path="home" element={<HomePage/>}></Route>
      <Route path="admin">
        <Route element={<CategoryContainer isAdmin />}>
          <Route path="category" element={<AdminCategoryPage/>}></Route>
        </Route>
      </Route>
    </Route>
    <Route element={<Root />}>
      <Route path="feed" loader={redirectLoader("recent")}></Route>
      <Route path="feed" element={<CategoryContainer />}>
        <Route
          path="recent"
          element={<RecentFeedPage />}
          loader={PostService.getAllPost}
        ></Route>
        <Route
          path="category/:categoryName"
          element={<CategoryFeedPage />}
          loader={({ params }) =>
            PostService.getAllPostByCategory(params.categoryName as string)
          }
        ></Route>
      </Route>
      <Route
        path="post/:postId"
        element={<PostPage />}
        loader={({ params }) =>
          PostService.getPostById(params.postId as string)
        }
      ></Route>
      <Route
        path="user/:userId"
        element={<UserPage />}
        loader={({ params }) =>
          PostService.getAllPostByUser(params.userId as string)
        }
      ></Route>
    </Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}