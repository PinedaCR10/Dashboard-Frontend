import Header from "../layout/Header";

const NoAuthorizable = () => {
    return (
      <div>
        <Header></Header>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="w-[700px] h-full pt-10 flex ">
            <img
              src="Dashboard-Frontend/Front-Paradigma/src/img/ERROR 401.jpg"
              alt="Error 401 - No autorizado"
              className="w-auto h-auto object-cover"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default NoAuthorizable;