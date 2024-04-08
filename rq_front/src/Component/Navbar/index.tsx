import { NavLink } from "react-router-dom"
import { generateUrl } from "../../functions/urlGenerator"

export const Navbar = () => {
    return (
        <nav style={{display: 'flex', alignItems: 'center', gap: '30px', height: '60px', borderBottom: 'solid 1px rgb(225, 225, 225)', backgroundColor: '#FFF', padding: '0 30px'}}>
            <NavLink to={generateUrl('post_index')}>Posts</NavLink>
            <NavLink to={generateUrl('contact')}>Contact</NavLink>
            <NavLink to={generateUrl('product_index')}>Products</NavLink>
        </nav>
    )
}