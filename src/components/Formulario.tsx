// Formulario.tsx

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import axiosInstance from "../services/axiosInstance";

interface Licenses {
  customerMail: "";
  customerName: "";
  initialDate: "";
  expirationDate: "";
  purchaseDate: "";
  usersNumber: "";
  licenseType: "";
  _id: "";
  id: "";
  organizationCustomer: "";
}
interface FormularioProps {
  onHide: () => void;
  selectedLicense: Licenses | null;
}

const Formulario: React.FC<FormularioProps> = ({ onHide, selectedLicense }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    _id: "",
    id: "",
    customerMail: "",
    customerName: "",
    initialDate: "",
    expirationDate: "",
    purchaseDate: "",
    usersNumber: "",
    licenseType: "",
    organizationCustomer: "",
  });

  const editMode = !!selectedLicense;

  useEffect(() => {
    if (selectedLicense) {
      // Si hay una licencia seleccionada, inicializa el estado con sus datos

      setFormData({
        _id: selectedLicense._id || "",
        customerMail: selectedLicense.customerMail,
        customerName: selectedLicense.customerName,
        initialDate: selectedLicense.initialDate,
        expirationDate: selectedLicense.expirationDate,
        purchaseDate: selectedLicense.purchaseDate,
        usersNumber: selectedLicense.usersNumber.toString(), // Convertir a cadena si es numérico
        licenseType: selectedLicense.licenseType,
        id: selectedLicense._id || "",
        organizationCustomer: selectedLicense.organizationCustomer,
      });
    } else {
      // Si no hay una licencia seleccionada, reinicia el estado
      setFormData({
        _id: "",
        id: "",
        customerMail: "",
        customerName: "",
        initialDate: "",
        expirationDate: "",
        purchaseDate: "",
        usersNumber: "",
        licenseType: "",
        organizationCustomer: "",
      });
    }
  }, [selectedLicense]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Realizar la conversión si el campo es "usersNumber"
    const parsedValue = name === "usersNumber" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && selectedLicense) {
        let formDataConvert = {
          id: formData.id,
          customerMail: formData.customerMail,
          customerName: formData.customerName,
          initialDate: formData.initialDate,
          expirationDate: formData.expirationDate,
          purchaseDate: formData.purchaseDate,
          usersNumber: formData.usersNumber,
          licenseType: formData.licenseType,
          organizationCustomer: formData.organizationCustomer,
        };

        const response = await axiosInstance.post(
          "/licenses/update",
          formDataConvert,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`
            },
          }
        );

        if (response.status === 200) {
          toast("License updated successfully", {
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
          "http://localhost:8080/licenses",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`
            },
          }
        );

        if (response.status === 200) {
          toast("License added successfully", {
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
          Customer mail:
          <input
            type="email"
            placeholder="user@example.com"
            name="customerMail"
            required
            value={formData.customerMail}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.customerMail === ""
                ? "border-red-500"
                : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.customerMail === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Customer name:
          <input
            type="text"
            placeholder="Nombre del Cliente"
            name="customerName"
            required
            value={formData.customerName}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.customerName === ""
                ? "border-red-500"
                : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.customerName === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full  mb-4  px-2">
        <label className="block mb-2">
          Customer organization:
          <input
            type="text"
            placeholder="Organización del Cliente"
            name="organizationCustomer"
            value={formData.organizationCustomer}
            onChange={handleInputChange}
            className={`form-input border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Start date:
          <input
            type="date"
            required
            name="initialDate"
            value={formData.initialDate}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.initialDate === "" ? "border-red-500" : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.initialDate === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Expiration date:
          <input
            min={formData.initialDate}
            type="date"
            required
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.expirationDate === ""
                ? "border-red-500"
                : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.expirationDate === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Purchase date:
          <input
            type="date"
            required
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.purchaseDate === ""
                ? "border-red-500"
                : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.purchaseDate === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
        <label className="block mb-2">
          Users Number:
          <input
            min={0}
            type="number"
            placeholder="Numero de usuarios"
            required
            name="usersNumber"
            value={formData.usersNumber}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.usersNumber === "" ? "border-red-500" : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          />
          {formData.usersNumber === "" && (
            <small className="text-red-500">This field is required</small>
          )}
        </label>
      </div>
      <div className="w-full  mb-4 md:mb-0 px-2">
        <label className="block mb-4">
          License type:
          <select
            required
            key={"defaulEdition"}
            name="licenseType"
            value={formData.licenseType}
            onChange={handleInputChange}
            className={`form-input border-2 ${
              formData.licenseType === "" ? "border-red-500" : "border-blue-500"
            } focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
          >
            <option value="">Selecciona un tipo de licencia</option>
            <option value="trial">Trial</option>
            <option value="standar">Standar</option>
            {/* Agrega otras opciones según sea necesario */}
          </select>
          {formData.licenseType === "" && (
            <small className="text-red-500">This field is required</small>
          )}
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

export default Formulario;
