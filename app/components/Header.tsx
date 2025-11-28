'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Thêm Link  
import Cookies from 'js-cookie';


export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        
        if (token) {
            setIsLoggedIn(true);
        } 
    } , []);

    const handleLogout = () => {
        Cookies.remove('token');

        setIsLoggedIn(false);
        router.push('/login');
        router.refresh();
    };

    return (
        <header className = "flex justify-center bg-gray-100">
            <div className = "shadow-md p-4 flex justify-between items-center w-full max-w-6xl rounded-lg">
                <Link href = "/" className = "text-2xl font-bold text-blue-700">Todo App</Link>

                <nav className = "">
                    <div>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                Đăng Xuất
                            </button>
                            ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2">
                                Đăng Nhập
                                </Link>
                                <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Đăng Ký
                                </Link>
                            </>
                            )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
