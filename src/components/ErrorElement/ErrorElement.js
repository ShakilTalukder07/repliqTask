import React from 'react';
import { Link } from 'react-router-dom';

const ErrorElement = () => {
    return (
        <div className="mt-0">
            <section className="flex items-center h-full p-16 bg-white">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
                            <img src="https://i.ibb.co/fFsZJwK/98488-bot-error-404.gif" alt="" />
                        </h2>

                        <Link to="/" className="px-8 py-3 font-semibold rounded bg-sky-400 text-gray-100">Back to homepage</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ErrorElement;