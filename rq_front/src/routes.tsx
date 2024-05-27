import Contact from './Component/Contact';
import { Email } from './Component/Email';
import Home from './Component/Home';
import Post from './Component/Post';
import Show from './Component/Post/Show';
import Update from './Component/Post/Update';
import { Product } from './Component/Product';
import { ProductCreate } from './Component/Product/ProductMutation/ProductCreate';
import { ProductUpdate } from './Component/Product/ProductMutation/ProductUpdate';
import { TestForm } from './Component/TestForm';

export const routes = [
    { name: 'home' , path: '/', element: <Home /> },
    { name: 'post_index', path: '/posts', element: <Post /> },
    { name: 'post_show', path: '/posts/:id', element: <Show /> },
    { name: 'post_update', path: '/posts/:id/update', element: <Update /> },

    { name: 'product_index', path: '/products', element: <Product /> },
    { name: 'product_create', path: '/products/create', element: <ProductCreate /> },
    { name: 'product_update', path: '/products/:id/update', element: <ProductUpdate /> },

    { name: 'contact', path: '/contact', element: <Contact /> },

    { name: 'email', path: '/email', element: <Email /> },

    { name: 'form', path: '/form', element: <TestForm />},

    // {name: 'post_update', path: '/posts', component: <Post />},
    // {name: 'post_create', path: '/posts', component: <Post />},
];