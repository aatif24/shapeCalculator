import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export const routes = [
    {
        path: "/",
        component: Home,
        isPrivate: false,
        layout: true,
        header: false,
        footer: false,
    },
];
