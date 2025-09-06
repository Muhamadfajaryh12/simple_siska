export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full bg-red-700 h-screen">
                <h1 className="text-center text-white font-bold text-3xl mt-24">
                    Sistem Informasi Akademik
                </h1>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
