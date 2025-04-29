const NotLoginRegisterUser = () => {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-6">
        <div className="text-center max-w-xl space-y-6">
          <h1 className="text-5xl font-bold text-gray-700 dark:text-white">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            You must be <span className="font-semibold text-purple-600">logged in</span> or <span className="font-semibold text-purple-600">registered</span> to view this page.
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
  