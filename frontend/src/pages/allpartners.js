import React, {useState, useEffect} from 'react';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";

function Allpartners() {

    const [partners, setPartners] = useState ([])

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
        <div className='allpartners pt6'>
        <table class="table table-hover table-sm">
                <thead class="table-dark">
                    <tr>
                    <th scope="col">Partneri</th>
                    <th scope="col">Nr. Kontaktit</th>
                    <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                {[...partners].reverse().map(partner => (
                <tbody>
                    <tr>
                    <td>{partner.company_name}</td>
                    <td>{partner.phone_number}</td> 
                    <td className="edit-delete"><div className="edit"><FiIcons.FiEdit2 /></div><div className="delete" onClick={() => removePartner(partner._id)}><FiIcons.FiTrash /></div></td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
        </>
    )
}

export default Allpartners
