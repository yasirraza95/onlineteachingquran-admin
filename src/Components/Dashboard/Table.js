import React from 'react'
import "./Table.css";
export default function Table() {
  return (
    <div className="container">
    <div className="table-wrap">
        <table className="table table-responsive table-borderless">
            <thead>
                <th>Select</th>
                <th>Donor Name</th>
                <th>Blood Group</th>
                <th>Donor Address</th>
                <th>total</th>
                <th>&nbsp;</th>
            </thead>
            <tbody>
                <tr className="align-middle alert border-bottom" role="alert">
                    <td>
                        <input type="checkbox" id="check"/>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">John Bin</p>
                            {/* <p className="m-0 text-muted">Fugiat Voluptates quasi nemo,ipsa perferencis</p> */}
                        </div>
                    </td>
                    <td>
                        <div className="fw-600">A+</div>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">	Khushab, 4</p>
                        </div>
                    </td>
                    <td>
                        $89.98
                    </td>
                    <td>
                        <div className="btn" data-bs-dismiss="alert">
                            <span className="bi bi-x" style={{color: "red"}}></span>
                        </div>
                    </td>
                </tr>
                <tr className="align-middle alert border-bottom" role="alert">
                    <td>
                        <input type="checkbox" id="check"/>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">John Bin</p>
                        </div>
                    </td>
                    <td>
                        <div className="fw-600">A+</div>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">	Khushab, 4</p>
                        </div>
                    </td>
                    <td>
                        $89.98
                    </td>
                    <td>
                        <div className="btn" data-bs-dismiss="alert">
                            <span className="bi bi-x" style={{color: "red"}}></span>
                        </div>
                    </td>
                </tr>
                <tr className="align-middle alert border-bottom" role="alert">
                    <td>
                        <input type="checkbox" id="check"/>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">John Bin</p>
                        </div>
                    </td>
                    <td>
                        <div className="fw-600">A+</div>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">	Khushab, 4</p>
                        </div>
                    </td>
                    <td>
                        $89.98
                    </td>
                    <td>
                        <div className="btn" data-bs-dismiss="alert">
                            <span className="bi bi-x" style={{color: "red"}}></span>
                        </div>
                    </td>
                </tr>
                <tr className="align-middle alert border-bottom" role="alert">
                    <td>
                        <input type="checkbox" id="check"/>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">John Bin</p>
                        </div>
                    </td>
                    <td>
                        <div className="fw-600">A+</div>
                    </td>
                    <td>
                        <div>
                            <p className="m-0 fw-bold">	Khushab, 4</p>
                        </div>
                    </td>
                    <td>
                        $89.98
                    </td>
                    <td>
                        <div className="btn" data-bs-dismiss="alert">
                            <span className="bi bi-x" style={{color: "red"}}></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}
