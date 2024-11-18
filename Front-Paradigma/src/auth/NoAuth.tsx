

const NoAuth = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[700px] h-full pt-10 flex flex-col items-center">
        <img
          src="https://www.bluehost.com/blog/wp-content/smush-webp/2023/06/what-is-a-401-error-1024x576.png.webp"
          alt="Error 401 - No autorizado"
          className="w-auto h-auto object-cover mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Acceso no autorizado
        </h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, pero no tienes permisos para acceder a esta página.
        </p>
        <button
          onClick={() => {
            const loginUrl = "https://eshop-loggin.vercel.app/";
            const redirectUrl = "https://dashboard-frontend-kohl.vercel.app/";
            window.location.href = `${loginUrl}?redirect=${encodeURIComponent(redirectUrl)}`;
          }}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Volver al login
        </button>
      </div>
    </div>
  );
};

export default NoAuth;
