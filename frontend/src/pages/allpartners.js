import React, {useState, useEffect} from 'react';
import * as FiIcons from 'react-icons/fi';
import styled2 from 'styled-components';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const EditPartner = styled2.nav`
  right: ${({ editpartner }) => (editpartner ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

function Allpartners() {

    const [partners, setPartners] = useState ([]);
    const [editPartner, setEditPartner] = useState(false);
    const showEditPartner = () => setEditPartner(!editPartner);
    const [editItem, setEditItem] = useState([]);
    const [inputFields, setInputFields] = useState ([
        {partnerName: '', partnerContact: ''},  
    ]);

    useEffect(() => {
        axios.get('/partners/get').then(res=>{
           // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);

    function updatePartner(id){
        let changed_inputs = {
            id: id._id, fields: {
                company_name: inputFields[0].partnerName,
                phone_number: inputFields[0].partnerContact,
            }
        }
        axios.post('/partners/edit', changed_inputs)
                .then(console.log(inputFields[0]))
                .catch(err => {
                    console.log(err)
                })
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    function onEdit(partner) {
        Swal.fire({
            title:
                "Dëshironi të ndryshoni detajet e partnerit? " + partner.company_name ,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                setEditItem([...editItem, partner]);
                setInputFields([{
                    partnerName: partner.company_name,
                    partnerContact: partner.phone_number,
                }])
                console.log(editItem)
            } else if (result.isDenied) {
                Swal.fire("Partneri nuk u selektua!", "", "error");
            }
        });
    };

    const onRemove = (partnerRemove) => {
        setEditItem(
            editItem.filter((partner) => partner !== partnerRemove)
        )
    }

    function removePartner(id) {
        Swal.fire({
          title:
            "Dëshironi të fshini partnerin ? ",
          showDenyButton: true,
          confirmButtonText: `PO`,
          denyButtonText: `JO`,
        }).then((result) => {
          if (result.isConfirmed) {
            let route ='/partners/delete/partner';
            console.log(id)
            axios.post(route,{id:id}).then(data=>{
                axios.get('/partners/get').then(res=>{
                // partners = data.data.data
                console.log(res.data.data)
                setPartners(res.data.data);
        })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
            Swal.fire("Partneri u fshi!", "", "success").then();
          } else if (result.isDenied) {
            Swal.fire("Partneri nuk u fshi!", "", "error");
          }
        });
      };

    return (
        <>
            <div className="page-name">
                <h3>Partnerët e biznesit</h3>
            </div>
        <div className='allpartners pt2 pb2'>
            <TableContainer className="partners-table" component={Paper}>
            <Table sx={{ maxWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow className="table-head">
                        <StyledTableCell className="col-sm-6">Partneri</StyledTableCell>
                        <StyledTableCell className="col-sm-5">Nr. Kontaktit</StyledTableCell>
                        <StyledTableCell>Edit/Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-data">
                    {[...partners].reverse().map(partner => (
                        <StyledTableRow
                        key={partner._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell>{partner.company_name}</StyledTableCell>
                            <StyledTableCell>{partner.phone_number}</StyledTableCell> 
                            <StyledTableCell className="edit-delete"><div className="edit" onClick={() => {
                                onEdit(partner);
                                showEditPartner();}}><FiIcons.FiEdit2 /></div>
                                <div className="delete" onClick={() => removePartner(partner._id)}><FiIcons.FiTrash /></div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <EditPartner editpartner={editPartner} className="garantion-form">
                {editItem.map((partner, idx) => (
                    <>
                        <div className="close-form" onClick={() => {
                            onRemove(partner);
                            showEditPartner();
                        }}>X</div>
                        <div className="popup-form" key={idx}>
                            <div className="form-group">
                                <h3 className="title pt-2">Ndrysho produktin:</h3>
                            </div>
                            {inputFields.map((inputField, index) => (
                                <div key={index}>
                                    <div className="row garantion-inputs col-sm-12">
                                        <div className="col-sm-6">
                                            <label for="tabel" className="form-label">Emri partnerit</label>
                                            <input type="input" className="form-control" name="partnerName" value={inputField.partnerName} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="tabel" className="form-label">Nr. Kontakti</label>
                                            <input type="number" className="form-control" name="partnerContact" value={inputField.partnerContact} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                <Button variant="contained" type="submit" onClick={() => {
                                        updatePartner(partner);
                                        onRemove(partner);
                                        showEditPartner();
                                    }}>Ruaj ndryshimet</Button>
                                    {/* <button type="button" className="btn btn-success" onClick={() => {
                                        updatePartner(partner);
                                        onRemove(partner);
                                        showEditPartner();
                                    }}>Ruaj ndryshimet</button> */}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </EditPartner>
        </>
    )
}

export default Allpartners
