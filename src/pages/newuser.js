import React, { Component } from 'react'

export class newuser extends Component {
    render() {
        return (
            <div>
                <div className="page-name">
                <h3>Krijo përdorues të ri</h3>
                </div>
                <div className="newuser pt2">
                    <div className="container input-group">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Username</label>
                                <input type="input" placeholder="mobiphoneuser" className="form-control" id="shifra" aria-describedby="shifra"></input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Email</label>
                                <input type="email" placeholder="user@gmail.com" className="form-control" id="shifra" aria-describedby="shifra"></input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Fjalkalimin</label>
                                <input type="password" placeholder="password" className="form-control" id="shifra" aria-describedby="shifra"></input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Komfirmo fjalkalimin</label>
                                <input type="password" placeholder="password" className="form-control" id="shifra" aria-describedby="shifra"></input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Roli i përdoruesit</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Administrator</option>
                                    <option>User</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12 align-btn-center p2">
                            <button type="button" className="btn btn-success btn-size">Ruaj të dhënat</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default newuser
