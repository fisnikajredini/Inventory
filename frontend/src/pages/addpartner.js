import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';

const Partnerbutton = styled(Link)`
`;

function Addpartner() {
    const [inputFields, setInputFields] = useState ([
        {partnerName: '', partnerContact: ''},  
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            inputFields[0].partnerName !== null &&
            inputFields[0].partnerName !== "" &&
            inputFields[0].partnerName !== undefined &&
            inputFields[0].partnerContact !== null &&
            inputFields[0].partnerContact !== "" &&
            inputFields[0].partnerContact !== undefined
            ) {
                for (let i = 0; i < inputFields.length; i++) { 
                axios.post('/partners/add', {
                company_name: inputFields[i].partnerName,
                phone_number: inputFields[i].partnerContact
            }).then();}
        Swal.fire({
            icon: "success",
            confirmButtonText: `OK`,
            title: "Partneri u shtua me sukses",
            showConfirmButton: true,
            timer: 1500,
          }).then();
        } else {
          Swal.fire({
            icon: "error",
            title: "Plotësoni të gjitha fushat",
            showConfirmButton: true,
            timer: 1500,
          });
        }
        console.log("InputFields", inputFields);
    };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('/partners/add', {
    //         company_name: inputFields[0].partnerName,
    //         phone_number: inputFields[0].partnerContact
    //     })
    //         .then()
    //     console.log("InputFields", inputFields);
    // };
    
    const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    }

    //Function to duplicate the fields
    const handleAddFields = () => {
        setInputFields([...inputFields, { partnerName: '', partnerContact: ''}])
    }
    
    //Function to remove the fields
    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <>
            <div className="page-name">
                <h3>Shto partner</h3>
            </div>
        <div className='addpartner pt2'>
            <div className="btn-all-partners">
            <Partnerbutton to={'./allpartners'} ><Button variant="contained" color="info">Shiko partnerët</Button></Partnerbutton>
            </div>
            <div className="form-container" onSubmit={handleSubmit}>
            { inputFields.map((inputField, index) => (
                <div className="partner-container container input-group" key={index}>
                    <div className="col-sm-6">
                        <label for="tabel" className="form-label">Emri partnerit</label>
                        <input type="input" className="form-control" name="partnerName" value={inputField.partnerName} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                    </div>
                    <div className="col-sm-6">
                        <label for="tabel" className="form-label">Nr. Kontakti</label>
                        <input type="number" className="form-control" name="partnerContact" value={inputField.partnerContact} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                    </div>
                    <div className="col-sm-12 pt-2">
                        <Button variant="outlined" className="dupf-btn" color="error" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <AiIcons.AiOutlineMinusCircle />
                        </Button>
                        <Button variant="contained" className="dupf-btn" disableElevation onClick={handleAddFields}>
                            <AiIcons.AiOutlinePlusCircle />
                        </Button>
                        {/* <button type="button" className="btn btn-danger btn-size-4" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        <AiIcons.AiOutlineMinusCircle />
                        </button>
                        <button type="button" className="btn btn-success btn-size-5" onClick={handleAddFields}>
                        <AiIcons.AiOutlinePlusCircle />
                        </button> */}
                    </div>
                </div>
                )) }
                    <div className="col-sm-12 align-btn-center p2">
                        {/* <div className="col-sm-6">
                            <Partnerbutton type="button" className="btn btn-warning btn-size" to={'./allpartners'} >Shiko partnerët</Partnerbutton>
                        </div> */}
                        <Button variant="contained" type="submit" onClick={handleSubmit}>Shto Partnerin</Button>
                            {/* <button type="button" className="btn btn-success btn-size" onClick={handleSubmit}>Shto partnerin</button> */}
                    </div>
            </div>
        </div>
        </>
    )
}

export default Addpartner
