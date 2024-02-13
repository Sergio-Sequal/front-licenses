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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si alguno de los campos está vacío
    const isEmptyField = Object.values(formData).some((value) => value.trim() === '');
  
    if (isEmptyField) {
      console.error('Por favor, completa todos los campos antes de guardar.');
      return; // Evitar el envío del formulario si hay campos vacíos
    }
  
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <label className="block mb-2">
        Correo del Cliente:
        <input
          type="text"
          name="customerMail"
          value={formData.customerMail}
          onChange={handleInputChange}
          className="border-2 border-blue-500 focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md"
        />
      </label>
      <label className="block mb-2">
        Nombre del Cliente:
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          className="form-input border"
        />
      </label>
      <label className="block mb-2">
        Fecha de Inicio:
        <input
          type="text"
          name="initialDate"
          value={formData.initialDate}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="block mb-2">
        Fecha de Expiración:
        <input
          type="text"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="block mb-2">
        Fecha de Compra:
        <input
          type="text"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="block mb-2">
        Número de Usuarios:
        <input
          type="text"
          name="usersNumber"
          value={formData.usersNumber}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label className="block mb-4">
        Tipo de Licencia:
        <input
          type="text"
          name="licenseType"
          value={formData.licenseType}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>
  );
};

export default Formulario;
