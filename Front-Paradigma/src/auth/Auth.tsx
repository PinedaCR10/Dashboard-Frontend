const getJwtToken = () => {
    const jwtCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt=")) // Busca la cookie con clave "jwt"
      ?.split("=")[1]; // Extrae el valor del token
  
    return jwtCookie || null;
  };
  
  console.log("Token JWT:", getJwtToken());
  