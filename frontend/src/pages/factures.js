import React, { useState, useEffect } from 'react';
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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const EditFacture = styled2.nav`
  right: ${({ editfacture }) => (editfacture ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function Factures() {

    const [factures, setFactures] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [editfacture, setEditFacture] = useState(false);
    const [partners, setPartners] = useState([]);
    const showEditFacture = () => setEditFacture(!editfacture);
    const [editItem, setEditItem] = useState([]);
    const [inputFields, setInputFields] = useState([
        { facture_id: '', partner: '', fac_date: '', fac_val: '', fac_payed: '' },
    ]);

    useEffect(() => {
        axios.get('/factures/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setFactures(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        axios.get('/partners/get').then(res => {
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

    const handleExpandClick = (e) => {
        setExpanded(!expanded);
      };

    function onEdit(factures) {
        Swal.fire({
            title:
                "Dëshironi të ndryshoni fakturën? " + factures.facture_id,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                setEditItem([...editItem, factures]);
                setInputFields([{
                    facture_id: factures.facture_id,
                    partner: factures.facture_issuer,
                    fac_date: factures.facture_date,
                    fac_val: factures.facture_price,
                    fac_payed: factures.facture_payment,

                }])
                console.log(editItem)
            } else if (result.isDenied) {
                Swal.fire("Faktura nuk u selektua!", "", "error");
            }
        });
    };

    function updateFacture(id) {
        let changed_inputs = {
            id: id._id, fields: {
                facture_id: inputFields[0].facture_id,
                facture_issuer: inputFields[0].partner,
                facture_date: inputFields[0].fac_date,
                facture_price: inputFields[0].fac_val,
                facture_payment: inputFields[0].fac_payed,
            }
        }
        axios.post('/factures/edit', changed_inputs)
            .then(console.log(inputFields[0]))
            .catch(err => {
                console.log(err)
            })
    }

    function removeFacture(id) {
        Swal.fire({
            title:
                "Dëshironi të fshini fakturën ? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                let route = '/factures/delete/facture';
                console.log(id)
                axios.post(route, { id: id }).then(data => {
                    axios.get('/factures/get').then(res => {
                        // partners = data.data.data
                        console.log(res.data.data)
                        setFactures(res.data.data)
                    })
                        .catch(err => {
                            console.log(err)
                        })
                })
                    .catch(err => {
                        console.log(err)
                    })
                Swal.fire({
                    icon: "success",
                    confirmButtonText: `OK`,
                    title: "Faktura u fshi!",
                    showConfirmButton: true,
                    timer: 1500
                }).then();
            } else if (result.isDenied) {
                Swal.fire("Faktura nuk u fshi!", "", "error");
            }
        });
    };

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }
    const onRemove = (factureRemove) => {
        setEditItem(
            editItem.filter((facture) => facture !== factureRemove)
        )
    }

    return (
        <>
            <div className="page-name">
                <h3>Fakturat e gjeneruara</h3>
            </div>
            <div className='allpartners pt2 pb2' onEdit={onEdit}>
                <TableContainer className="partners-table" component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow className="table-head">
                                <StyledTableCell>Partneri</StyledTableCell>
                                <StyledTableCell align="right">Nr. Tel</StyledTableCell>
                                <StyledTableCell align="right">Blerjet Tot.</StyledTableCell>
                                <StyledTableCell align="right">Borxhi i mbetur</StyledTableCell>
                                <StyledTableCell>Edit/Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-data">
                            {[...partners].reverse().map(partner => (
                            <StyledTableRow>
                                <div
                                    key={partner._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell><ExpandMore
                                        expand={expanded}
                                        onClick={e => handleExpandClick(e)}
                                        aria-expanded={expanded}
                                        aria-label="show more"><ExpandMoreIcon/></ExpandMore>{partner.company_name}</StyledTableCell>
                                    <StyledTableCell align="right">{partner.phone_number}</StyledTableCell>
                                    <StyledTableCell align="right">0</StyledTableCell>
                                    <StyledTableCell align="right">0</StyledTableCell>
                                    <StyledTableCell align="right">0</StyledTableCell>
                                    {/* <StyledTableCell align="right">{factures.facture_date}</StyledTableCell>
                                    <StyledTableCell align="right">{factures.facture_price}</StyledTableCell>
                                    <StyledTableCell align="right">{factures.facture_payment || factures.facture_price}</StyledTableCell>
                                    <StyledTableCell align="right">{(factures.facture_price) - (factures.facture_payment || factures.facture_price)}</StyledTableCell> */}
                                    {/* <StyledTableCell className="edit-delete"><div className="edit" onClick={() => {
                                        onEdit(factures);
                                        showEditFacture();
                                    }}><FiIcons.FiEdit2 /></div>
                                        <div className="delete" onClick={() => removeFacture(factures._id)}><FiIcons.FiTrash /></div>
                                    </StyledTableCell> */}
                                </div>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nr. Faktures</th>
                                                        <th scope="col" align="right">Data e faktures</th>
                                                        <th scope="col" align="right">Vlera e faktures</th>
                                                        <th scope="col" align="right">Borxhi i mbetur</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...factures].reverse().map(factures => (
                                                        partner.company_name === factures.facture_issuer ?
                                                        <tr
                                                        key={factures._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <th scope="col">{factures.facture_id}</th>
                                                            <th scope="col" align="right">{factures.facture_date}</th>
                                                            <th scope="col" align="right">{factures.facture_price}</th>
                                                            <th scope="col" align="right">{(factures.facture_price) - (factures.facture_payment || factures.facture_price)}</th>
                                                        </tr>
                                                            : null 
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CardContent>
                                    </Collapse>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <EditFacture editfacture={editfacture} className="garantion-form">
                {editItem.map((facture, idx) => (
                    <>
                        <div className="close-form" onClick={() => {
                            onRemove(facture);
                            showEditFacture();
                        }}>X</div>
                        <div className="popup-form" key={idx}>
                            <div className="form-group">
                                <h3 className="title pt-2">Ndrysho produktin:</h3>
                            </div>
                            {inputFields.map((inputField, index) => (
                                <div key={index}>
                                    <div className="row garantion-inputs col-sm-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Nr. Factures</label>
                                                <input type="input" name="facture_id"
                                                    value={inputField.facture_id}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    className="form-control"
                                                    aria-describedby="facture id"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Partneri</label>
                                                <select className="form-control"
                                                    name="partner"
                                                    value={inputField.partner}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra">
                                                    <option value="" disabled selected>Zgjidhe Partnerin</option>
                                                    {partners.map(partner => (
                                                        <option key={partner.id}>{partner.company_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Data</label>
                                                <input type="date" className="form-control"
                                                    name="fac_date"
                                                    value={inputField.fac_date}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="facture date"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Vlera e fakturës</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="fac_val"
                                                    value={inputField.fac_val}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Vlera e paguar</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="fac_payed"
                                                    value={inputField.fac_payed}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                    <Button variant="contained"
                                        onClick={() => {
                                            updateFacture(facture);
                                            onRemove(facture);
                                            showEditFacture();
                                        }} >Ruaj ndryshimet</Button>
                                    {/* <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product);
                                        onRemove(product);
                                        showEditProduct();
                                    }}>Ruaj ndryshimet</button> */}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </EditFacture>
        </>
    )
}

export default Factures
