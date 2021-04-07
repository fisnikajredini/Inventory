import React, { Component } from 'react'

export class terms extends Component {
    render() {
        return (
            <div>
                <div className="page-name">
                <h3>Terms and Condition</h3>
                </div>
                <div className='terms pt2'>
                    <div class="form-group container">
                        <label for="exampleFormControlTextarea1">Regullat dhe kushtet</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <div className="col-sm-12 align-btn-center p2">
                            <button type="button" className="btn btn-success btn-size">Ruaj të dhënat</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default terms
