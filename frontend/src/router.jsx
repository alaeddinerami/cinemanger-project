import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Signup from "./views/Signup";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import SeatSelection from "./views/SeatSelection";
import Dashboard from "./views/admin/dashboard";
import AdminFilm from "./views/admin/AdminFilm";

const router = createBrowserRouter([


  
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "film/:id",
        element: <FilmDetails />,
      },
      {
        path: "seance/:seanceId",
        element: <SeatSelection />,
      },{
        path:"dashboard",
        element:<Dashboard />
      },{
        path:"admin-user",
        element:<AdminUser />
      }
      ,{
        path:"admin-film",
        element:<AdminFilm />
      }
      ,{
        path:"admin-salle",
        element:<AdminSalle />
      }
      ,{
        path:"admin-session",
        element:<AdminSession />
      }
      
      
      
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;