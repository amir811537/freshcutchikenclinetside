import { BiErrorCircle } from "react-icons/bi";

const NotLoginRegisterUser = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <div className="text-center max-w-md space-y-6">
        <BiErrorCircle className="text-purple-600 mx-auto text-7xl" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          403 - Access Denied
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You need to <span className="font-semibold text-purple-600">log in</span> or{" "}
          <span className="font-semibold text-purple-600">register</span> to access this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
};

export default NotLoginRegisterUser;
