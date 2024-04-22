// FormLicense.tsx

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import axiosInstance from "../services/axiosInstance";

interface Admin {
  _id: "";
  id: "";
  adminMail: "";
  adminName: "";
  password: "";
}
interface FormAdminProps {
  onHide: () => void;
  selectedAdmin: Admin | null;
}

const FormAdmin: React.FC<FormAdminProps> = ({ onHide, selectedAdmin }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    _id: "",
    id: "",
    adminMail: "",
    adminName: "",
    password: "",
  });

  const editMode = !!selectedAdmin;

  useEffect(() => {
    if (selectedAdmin) {
      // Si hay una licencia seleccionada, inicializa el estado con sus datos

      setFormData({
        _id: selectedAdmin._id || "",
        id: selectedAdmin._id || "",
        adminMail: selectedAdmin.adminMail,
        adminName: selectedAdmin.adminName,
        password: selectedAdmin.password,
      });
    } else {
      // Si no hay una licencia seleccionada, reinicia el estado
      setFormData({
        _id: "",
        id: "",
        adminMail: "",
        adminName: "",
        password: "",
      });
    }
  }, [selectedAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log()
    // Realizar la conversión si el campo es "usersNumber"
    //const parsedValue = name === "adminMail" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({      
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && selectedAdmin) {
        let formDataConvert = {
          id: formData.id,
          adminMail: formData.adminMail,
          adminName: formData.adminName,
          password: formData.password,
        };

        const response = await axiosInstance.post(
          "/admins/update",
          formDataConvert,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast("Admin updated successfully", {
            type: "success",
            autoClose: 2000,
            position: "top-center",
            theme: "colored",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("Error al actualizar los datos");
        }
      } else {
        const response = await axiosInstance.post(
          "/admins",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast("Admin added successfully", {
            type: "success",
            autoClose: 2000,
            position: "top-center",
            theme: "colored",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("Error al guardar los datos");
        }
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }

    onHide();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 flex flex-wrap"
    >
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Admin mail:
          <input
            type="text"
            placeholder="user@example.com"
            name="adminMail"
            required
            value={formData.adminMail}
            onChange={handleInputChange}
            className={`form-input border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Admin Name:
          <input
            type="text"
            required
            name="adminName"
            value={formData.adminName}
            onChange={handleInputChange}
            className={`form-input border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
        </label>
      </div>
      <div className="w-full  mb-4  px-2">
        <label className="block mb-2">
          Password:
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
        </label>
      </div>
      <div className="w-full flex justify-center px-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 w-full px-4 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default FormAdmin;
