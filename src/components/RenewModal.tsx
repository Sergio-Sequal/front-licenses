import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../App.css'
interface LicensesRenueDate {
  _id: '',
  id: '',
  initialDate: '',
  expirationDate: '',
  purchaseDate: '',

}

interface RenewModalProps {
  visible: boolean;
  onHide: () => void;
  selectedLicenseRenuew: LicensesRenueDate | null;

}

const RenewModal: React.FC<RenewModalProps> = ({ visible, onHide, selectedLicenseRenuew }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({
    id: '' ,
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
  });

  useEffect(() => {
    if (selectedLicenseRenuew) {
      setId(selectedLicenseRenuew._id);
      setStartDate(selectedLicenseRenuew.initialDate);
      setEndDate(selectedLicenseRenuew.expirationDate);
      setPurchaseDate(selectedLicenseRenuew.purchaseDate);

      setFormData({
        id: selectedLicenseRenuew._id,
        initialDate: selectedLicenseRenuew.initialDate,
        expirationDate: selectedLicenseRenuew.expirationDate,
        purchaseDate: selectedLicenseRenuew.purchaseDate,
      });
    }
  }, [selectedLicenseRenuew]);

  useEffect(() => {
    if (selectedLicenseRenuew) {
      setId(selectedLicenseRenuew._id);
      setStartDate(selectedLicenseRenuew.initialDate);
      setEndDate(selectedLicenseRenuew.expirationDate);
      setPurchaseDate(selectedLicenseRenuew.expirationDate);

    }
  }, [selectedLicenseRenuew]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRenewClick = async () => {
    try {
      console.log(formData);
      
        // Llamada a la API para renovar la licencia
        await axios.post(`http://localhost:8080/licenses/renewal`, {
          id,
          startDate,
          endDate,
          purchaseDate
        });

        onHide();
    
    } catch (error) {
      console.error('Error en la renovación:', error);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Renovar Licencia"
      modal
      style={{ width: '400px' }}
      footer={
        <div>
          <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
          <Button label="Renovar" icon="pi pi-check" onClick={handleRenewClick} autoFocus />
        </div>
      }
    >
      <div className='container_renuew'>
        <div className="">
          <label className="mb-2">Fecha de Inicio:</label>
          <input
            type="date"
            value={formData.initialDate}
            onChange={handleInputChange}
            className='form-input border-2 focus:border-blue-500 px-4 py-2 rounded-md w-full'
          />
        </div>

        <div className="">
          <label className="mb-2">Fecha de Fin:</label>
          <input
            type="date"
            value={formData.expirationDate}
            onChange={handleInputChange}
            className='form-input border-2 focus:border-blue-500 px-4 py-2 rounded-md w-full'
          />
        </div>

        <div className="">
          <label className="mb-2">Fecha de Compra:</label>
          <input
            type="date"
            value={formData.purchaseDate}
            onChange={handleInputChange}
            className='form-input border-2 focus:border-blue-500 px-4 py-2 rounded-md w-full'
          />
        </div>
      </div>

    </Dialog>
  );
};

export default RenewModal;
