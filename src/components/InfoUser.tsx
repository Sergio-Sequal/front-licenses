import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../App.css'
interface LicensesDetails {
    customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
    usersWithLicense: [],
    status: boolean,
    organizationCustomer: ""

}

interface InfoUserProps {
    onHide: () => void;
    selectedLicenseDetails: LicensesDetails | null;
}

const InfoUser: React.FC<InfoUserProps> = ({ selectedLicenseDetails }) => {

    const renderUsersWithLicense = () => {
        return (
            <DataTable value={selectedLicenseDetails?.usersWithLicense}>
                <Column field="_id" header="User Name"></Column>
                <Column
                    field="active"
                    header="Active"
                    body={(rowData) => (
                        <span
                            style={{
                                color: rowData.active === 'true' ? 'green' : 'red',
                                border: `1px solid ${rowData.active === 'true' ? 'green' : 'red'}`,
                                padding: '2px 4px',
                                borderRadius: '4px',
                                display: 'inline-block',
                            }}
                        >
                            {rowData.active === 'true' ? 'Activo' : 'Inactivo'}
                        </span>
                    )}
                ></Column>
                <Column field="profile" header="Profile"></Column>
                {/* Agregar más columnas según sea necesario */}
            </DataTable>
        );
    };
    console.log(selectedLicenseDetails?.organizationCustomer);
    
    return (
        <div className="container_detail_principal">
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Customer Information: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.customerName}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Customer Email: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.customerMail}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Customer Organization: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.organizationCustomer}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title"> Initial Date: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.initialDate}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Expiration Date: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.expirationDate}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Purchase Date: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.purchaseDate}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">User Number: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.usersNumber}</h4>

            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Licence Type: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.licenseType}</h4>
            </div>
            <div className="container_detail_principal_header">
                <h1 className="container_detail_principal_header_title">Status: </h1>
                <h4 className='container_detail_principal_header_descripcion'>{selectedLicenseDetails?.status === true ? 'Activo' : 'Inactivo'}</h4>
            </div>

            <div className="info-row">
                <div className="p-col-12">
                    <h3>Users with License</h3>
                    {renderUsersWithLicense()}
                </div>
            </div>
        </div>
    );
};

export default InfoUser;