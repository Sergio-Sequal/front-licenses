import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useAuth } from './AuthContext';
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setAuthentication } = useAuth();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Realizar la solicitud Axios aquí
        axios
            .get('tu_url_de_login', {
                params: {
                    email: email,
                    password: password,
                },
            })
            .then((response) => {
                // Verificar si el correo es correcto
                console.log(email);
                console.log(password);
                if (response.data.email === email && response.data.password === password) {
                    // Manejar la respuesta exitosa aquí
                    console.log('Inicio de sesión exitoso', response.data);
                    setAuthentication(true);
                    navigate('/front-licenses/home');
                    setEmail('');
                    setPassword('');
                } else {
                    console.error('El correo no coincide con la base de datos');
                    setEmail('');
                    setPassword('');
                    
                }
            })
            .catch((error) => {
                // Manejar el error aquí
                console.error('Error al iniciar sesión', error);
                setAuthentication(true);
                navigate('/front-licenses/home');
                setEmail('');
                setPassword('');
            });
    };


    return (
        <div className="bg-gradient-primary min-h-screen flex items-center justify-center">
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
                                            <h1 className="text-3xl text-gray-900 mb-4">Bienvenido</h1>
                                        </div>
                                        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full px-3 py-2 border rounded"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    required
                                                    className="w-full px-3 py-2 border rounded"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            {/* <div className="mb-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2"
                                                        id="customCheck"
                                                        checked={rememberMe}
                                                        onChange={() => setRememberMe(!rememberMe)}
                                                    />
                                                    <label htmlFor="customCheck" className="text-sm text-gray-700">
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div> */}
                                            <Button
                                                label="Iniciar Sesión"
                                                type='submit'
                                                className="p-button-primary p-button-rounded p-button-outlined custom-hover"
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