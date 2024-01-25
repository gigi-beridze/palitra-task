// src/components/UserProfile.js

import React from 'react';
import {Link} from "@inertiajs/react";

const UserProfile = () => {
    return (
        <div className="flex items-center space-x-4">
            <Link to="/cart">
                <img src="../../../public/images/shopping-cart-icon.svg" alt="icon"/>
                <span className="text-gray-600">0</span>
            </Link>
        </div>
    );
};

export default UserProfile;
