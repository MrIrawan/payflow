export default function AdminSignInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Left Side - Blue Background with Greeting */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden p-12 flex-col justify-between">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-16 left-16 w-56 h-56 border-2 border-white rounded-2xl transform -rotate-12"></div>
                        <div className="absolute top-32 left-32 w-72 h-72 border-2 border-white rounded-2xl transform -rotate-45"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-xl">✦</span>
                                </div>
                                <h1 className="text-2xl font-bold text-white">PayFlow</h1>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Hello Admin<br />PayFlow! 👋
                            </h2>
                            <p className="text-blue-100 text-base leading-relaxed">
                                Streamline your payment operations. Manage transactions, track analytics, and control your business with powerful admin tools.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10">
                        <p className="text-blue-100 text-sm">© 2026 PayFlow. All rights reserved.</p>
                    </div>
                </div>
                {/* Right Side - Login Form */}
                {children}
            </div>
        </div>
    )
}