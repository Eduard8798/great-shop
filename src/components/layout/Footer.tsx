import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-10">
            <div className="container mx-auto text-center">
                <p>© 2026 Great Shop. All rights reserved.</p>
                <p>
                    <a href="#" className="hover:underline">Privacy Policy</a> |{' '}
                    <a href="#" className="hover:underline">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
}
