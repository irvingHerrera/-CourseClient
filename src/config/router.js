// Layaout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SignIn';
import MenuWeb from '../pages/Admin/MenuWeb';

// Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import AdminUser from '../pages/Admin/Users';

//other
import Error404 from '../pages/Error404';

const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true
            },
            {
                path: '/admin/login',
                component: AdminSingIn,
                exact: true
            },
            {
                path: '/admin/users',
                component: AdminUser,
                exact: true
            },
            {
                path: '/admin/menu',
                component: MenuWeb,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    },
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/contact',
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];

export default routes;