// Formulario.tsx

import React, { useState } from 'react';

interface FormularioProps {
  onHide: () => void;
}

const Formulario: React.FC<FormularioProps> = ({ onHide }) => {
  const [formData, setFormData] = useState({
    customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;

    // Realizar la conversión si el campo es "usersNumber"
    const parsedValue = name === 'usersNumber' ? parseInt(value, 10) : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si alguno de los campos está vacío
    const isEmptyField = Object.values(formData).some((value) => {
      if (typeof value === 'number') {
        return value === null; // Considera null como un valor vacío para campos numéricos
      } else {
        return value.trim() === '';
      }
    });
  
    if (isEmptyField) {
      console.error('Por favor, completa todos los campos antes de guardar.');
      return; // Evitar el envío del formulario si hay campos vacíos
    }
    console.log(formData);
    
  
    try {
      const response = await fetch('http://localhost:8080/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Datos guardados exitosamente');
      } else {
        console.error('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  
    // Después de enviar los datos, cierra el modal
    onHide();
  };
  console.log(formData.usersNumber);
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 flex flex-wrap">
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Correo del Cliente:
        <input
          type="email" 
          placeholder = "user@example.com"
          name="customerMail"
          required
          value={formData.customerMail}
          onChange={handleInputChange}
          className="border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        />
      </label>
    </div>
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Nombre del Cliente:
        <input
          type="text"
          placeholder = "Nombre del Cliente"
          name="customerName"
          required
          value={formData.customerName}
          onChange={handleInputChange}
          className="form-input  border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        />
      </label>
    </div>
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Fecha de Inicio:
        <input
          type="date"
          required
          name="initialDate"
          value={formData.initialDate}
          onChange={handleInputChange}
          className="form-input  border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        />
      </label>
    </div>
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Fecha de Expiración:
        <input
          type="date"
          required
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleInputChange}
          className="form-input  border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        />
      </label>
    </div>
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Fecha de Compra:
        <input
          type="date"
          required
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleInputChange}
          className="form-input  border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        />
      </label>
    </div>
    <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
      <label className="block mb-2">
        Número de Usuarios:
        <input
          type="number"
          placeholder='Numero de usuarios'
          required
          name="usersNumber"
          value={formData.usersNumber}
          onChange={handleInputChange}
          className={`form-input border-2 ${formData.usersNumber === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.usersNumber === '' && <small className="text-red-500">Este campo es obligatorio</small>}
      </label>
    </div>
    <div className="w-full  mb-4 md:mb-0 px-2">
      <label className="block mb-4">
        Tipo de Licencia:
        <select
          required
          name="licenseType"
          value={formData.licenseType}
          onChange={handleInputChange}
          className="form-select border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full"
        >
          <option value="">Selecciona un tipo de licencia</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
          {/* Agrega otras opciones según sea necesario */}
        </select>
      </label>
    </div>
    <div className="w-full flex justify-center px-2">
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Guardar
      </button>
    </div>
  </form>
  );
};

export default Formulario;
