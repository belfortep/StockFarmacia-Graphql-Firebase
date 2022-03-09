import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function MenuBar() {


    const pathname = window.location.pathname;

    const path = pathname === '/' ? 'home' : pathname.substring(1)

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);



    return (
        <Menu size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            >
                Comprimidos
            </Menu.Item>



            <Menu.Item
                name='liquidos'
                active={activeItem === 'liquidos'}
                onClick={handleItemClick}
                as={Link}
                to="/liquidos"
            >
                Liquidos
            </Menu.Item>
        </Menu>
    )

}
