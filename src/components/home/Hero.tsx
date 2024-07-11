import { BiArrowToRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center select-none">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-semibold text-gray-900">School Manage</h1>
        <span className="text-base font-semibold text-gray-800">Modern way for managing school.</span>

        <div className="mt-12 flex items-center gap-4">
          <Link
            className="px-6 py-2 flex items-center gap-2 text-base font-semibold border-2 border-gray-800 rounded-md shadow-md transition-all hover:bg-white"
            to="/auth/login"
          >
            Login
          </Link>
          <Link
            className="px-6 py-2 flex items-center gap-2 text-base font-semibold bg-gray-200 border-2 border-gray-800 rounded-md shadow-md transition-all hover:bg-transparent"
            to="/auth/signup"
          >
            Get Started
            <BiArrowToRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
