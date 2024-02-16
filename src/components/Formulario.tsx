// Formulario.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface Licenses {

  customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
    _id: '',
    id: '',
    organizationCustomer: ''
 
}
interface FormularioProps {
  onHide: () => void;
  selectedLicense: Licenses | null;
}

const Formulario: React.FC<FormularioProps> = ({ onHide, selectedLicense }) => {
  const [formData, setFormData] = useState({
    _id: '',
    id: '',
    customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
    organizationCustomer: ''
  });
  
  const editMode = !!selectedLicense;
  
  useEffect(() => {
    if (selectedLicense) {
      // Si hay una licencia seleccionada, inicializa el estado con sus datos
      
      setFormData({
        _id: selectedLicense._id || '',
        customerMail: selectedLicense.customerMail,
        customerName: selectedLicense.customerName,
        initialDate: selectedLicense.initialDate,
        expirationDate: selectedLicense.expirationDate,
        purchaseDate: selectedLicense.purchaseDate,
        usersNumber: selectedLicense.usersNumber.toString(), // Convertir a cadena si es numérico
        licenseType: selectedLicense.licenseType,
        id: selectedLicense._id || '',
      organizationCustomer: selectedLicense.organizationCustomer

      });
    } else {
      // Si no hay una licencia seleccionada, reinicia el estado
      setFormData({
        _id: '',
        id: '',
        customerMail: '',
        customerName: '',
        initialDate: '',
        expirationDate: '',
        purchaseDate: '',
        usersNumber: '',
        licenseType: '',
        organizationCustomer: ''
      });
    }
  }, [selectedLicense]);

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
          organizationCustomer: formData.organizationCustomer
        }
        console.log(formDataConvert);
        
        const response = await axios.post('http://localhost:8080/licenses/update', formDataConvert, {

          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          window.location.reload();
          console.log('Datos actualizados exitosamente');
        } else {
          console.error('Error al actualizar los datos');
        }
      } else {
        const response = await axios.post('http://localhost:8080/licenses', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          window.location.reload();
          console.log('Datos guardados exitosamente');
        } else {
          console.error('Error al guardar los datos');
        }
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }

    onHide();
  };
  
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
          className={`form-input border-2 ${formData.customerMail === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.customerMail === '' && <small className="text-red-500">Este campo es obligatorio</small>}

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
          className={`form-input border-2 ${formData.customerName === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.customerName === '' && <small className="text-red-500">Este campo es obligatorio</small>}

      </label>
    </div>
    <div className="w-full  mb-4  px-2">
      <label className="block mb-2">
        Organización del Cliente:
        <input
          type="text"
          placeholder = "Organización del Cliente"
          name="organizationCustomer"
          required
          value={formData.organizationCustomer}
          onChange={handleInputChange}
          className={`form-input border-2 ${formData.organizationCustomer === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.organizationCustomer === '' && <small className="text-red-500">Este campo es obligatorio</small>}

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
          className={`form-input border-2 ${formData.initialDate === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.initialDate === '' && <small className="text-red-500">Este campo es obligatorio</small>}

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
          className={`form-input border-2 ${formData.expirationDate === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.expirationDate === '' && <small className="text-red-500">Este campo es obligatorio</small>}

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
          className={`form-input border-2 ${formData.purchaseDate === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        />
         {formData.purchaseDate === '' && <small className="text-red-500">Este campo es obligatorio</small>}
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
          key={'defaulEdition'}
          name="licenseType"
          value={formData.licenseType}
          onChange={handleInputChange}
          className={`form-input border-2 ${formData.licenseType === '' ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:border-blue-700 px-4 py-2 rounded-md w-full`}
        >
          <option value="">Selecciona un tipo de licencia</option>
          <option value="trial">Trial</option>
          <option value="standar">Standar</option>
          {/* Agrega otras opciones según sea necesario */}
        </select>
        {formData.licenseType === '' && <small className="text-red-500">Este campo es obligatorio</small>}
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
