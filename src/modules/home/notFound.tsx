"use client";
import React from "react";

function NotFound() {
    return (
        <>
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
                    <div className="space-y-6">
                        <div className="relative animate-float">
                            {/* Glowing 404 */}
                            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 animate-pulse drop-shadow-2xl">
                                404
                            </h1>
                            <div className="absolute -top-4 -left-4 w-full h-full text-8xl md:text-9xl font-black text-slate-600 opacity-30 blur-sm">
                                404
                            </div>
                        </div>

                        <div className="space-y-4 animate-float animation-delay-1000">
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Page{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                    Not Found
                                </span>
                            </h2>

                            <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
                                The page you are looking for does not exist or has been moved.
                                Please check the URL or return to the dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-float animation-delay-2000">
                        <button
                            onClick={() => window.history.back()}
                            className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 border border-green-400/30"
                        >
                            <span className="relative z-10">← Go Back</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        </button>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="group relative px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-teal-400 hover:bg-teal-400/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                        >
                            <span className="relative z-10">🏠 Dashboard</span>
                        </button>
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
