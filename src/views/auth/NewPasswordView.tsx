import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react";

export default function NewPasswordView() {
  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código de 6 dígitos que te enviamos a tu email
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token}/>
      )}
    </>
  );
}
