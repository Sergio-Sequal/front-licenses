import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button } from "primereact/button";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminMail, setAdminMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthentication } = useAuth();
  const { setToken } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://api-licences-java.onrender.com/admins/auth`,
        // `http://localhost:8080/admins/auth`,
        {
          adminMail: adminMail,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar la respuesta del servidor
      if (response.status === 200) {
        setAuthentication(true);
        setToken(response.data.data.token); // Almacenar el token en el contexto
        navigate("/licenses/home");
        //window.location.reload();
        setAdminMail("");
        setPassword("");
      }
    } catch (error) {
      toast("User or password invalid", {
        type: "error",
        autoClose: 3000,
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-gradient-primary min-h-screen mx-6 flex items-center justify-center">
      <div className="container">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex">
                {/* Imagen de fondo solo para escritorio */}
                <div className="w-full bg-login-image"></div>

                <div className="w-full p-8">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="text-3xl text-gray-900 mb-4">
                        SBOT LICENSES
                      </h1>
                    </div>
                    <form
                      className="flex flex-col items-center"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4 w-full">
                        <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border rounded outline-blue-400"
                          aria-describedby="emailHelp"
                          placeholder="Email address"
                          value={adminMail}
                          onChange={(e) => setAdminMail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4 w-full">
                        <input
                          type="password"
                          required
                          className="w-full px-3 py-2 border rounded outline-blue-400"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button
                        label="Sign in"
                        type="submit"
                        className="w-full text-white p-button-rounded p-button-outlined bg-sky-500 hover:bg-sky-400"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
