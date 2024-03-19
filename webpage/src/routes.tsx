import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import { PostPage } from './views/post/PostPage';

import { CategoryLayout } from './components/organisms/CategoryLayout/CategoryLayout';
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
import { NewPostPage } from './views/post/NewPostPage';
import UserService from './services/UserService';
import { FeedPage } from './views/feed/FeedPage';

const redirectLoader = (path: string) => async () => redirect(path);

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" loader={redirectLoader("/home")} errorElement={<_404Page/>}></Route>
    <Route element={<Root searchBar={false}/>}>
      <Route path="home" element={<HomePage/>}></Route>
      <Route path="admin">
        <Route element={<CategoryLayout isAdmin />}>
          <Route path="category" element={<AdminCategoryPage/>}></Route>
        </Route>
      </Route>
    </Route>
    <Route element={<Root />}>
      <Route path="feed" element={<CategoryLayout />}>
        <Route
          path=""
          element={<FeedPage />}
          loader={({ params }) =>
            PostService.getAllPost({
              title: params.title??undefined,
              author: params.author??undefined,
            })
          }
        ></Route>
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
      <Route path="post">
        <Route
          path=":postId"
          element={<PostPage />}
          loader={({ params }) =>
            PostService.getPostById(params.postId as string)
          }
        ></Route>
        <Route
          path="new"
          element={<NewPostPage />}
        >
        </Route>
      </Route>
      <Route
        path="user/:userId"
        element={<UserPage />}
        loader={async ({ params }) =>
          ({
            posts: await PostService.getAllPost({author: params.userId as string}),
            user: (await UserService.getUser(params.userId as string))[0],
          })
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