const getTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Busca el parámetro "token"
    return token;
  };
  
  console.log("Token desde la URL:", getTokenFromUrl());
  