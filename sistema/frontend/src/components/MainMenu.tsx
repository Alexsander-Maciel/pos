import React from 'react';

const MainMenu: React.FC<{ userRole: string }> = ({ userRole }) => {
    const menuItems = getMenuItems(userRole);

    return (
        <nav>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const getMenuItems = (role: string) => {
    const items = [
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/profile' },
    ];

    if (role === 'admin') {
        items.push({ label: 'Admin Dashboard', path: '/admin' });
    }

    return items;
};

export default MainMenu;