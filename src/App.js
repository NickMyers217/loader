import React, { Component } from 'react';

import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';

import Nav from './components/Nav';
import PlusSign from './components/PlusSign';
import Transformation from './components/Transformation';

// TODO: Starting Data upload from file or clipboard
    // TODO: Modal dialog

// TODO: Add a new node
    // TODO: form
    // TODO: node types
        // TODO: transform (map, filter, and reduce)
        // TODO: ajax (extract and load)

// TODO: display the node
    // TODO: edit node
        // TODO:
    // TODO: delete node

// TODO: run
    // TODO: debug buttons
    // TODO: autorun feature? (except for ajax operations)

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            startData: {
                _id: "user-nmyers@alitek.com",
                _rev: "686-38bb6a7e478d3cf4cb707b5583bb9d5c",
                username: "nmyers@alitek.com",
                email: "nmyers@alitek.com",
                userCompany: "Clariant",
                docType: "UserProfile",
                templateId: "UserProfile",
                authorizations: {
                    AUTHORIZE_IP: [
                        "*"
                    ],
                    AUTHORIZE_ROLE: [
                        "*",
                        "Admin",
                        "Analytics",
                        "AssetReportAdmin",
                        "BulkEmail",
                        "ChemicalAdmin",
                        "CouchAccess",
                        "DataAdmin",
                        "DictionaryAuthor",
                        "Integration",
                        "JobApprover",
                        "SODDelete",
                        "Scheduler",
                        "Tech",
                        "TreaterTruck",
                        "UserAdmin"
                    ],
                    AUTHORIZE_REPLICATE_GROUP: [
                        "Clariant",
                        "ClariantActivities",
                        "U69C - XTO Energy",
                        "USTX - Encana"
                    ]
                },
                employeeName: "Nick Myers",
                employeeNumber: "99999992345",
                contactTelephoneNumber: "832.361.8410",
                validationStatus: "valid",
                completionStatus: "Not Completed",
                replicationType: "doNotReplicate",
                docOwnerId: "wjohnson@enbasesolutions.com",
                sourceSystemId: "",
                clariantRegion: "South",
                infoCompletionStatus: "Not Completed",
                language: "en",
                internalBillingDistrictCode: "3423454334",
                systemOfMeasurement: "imperial",
                plantLocations: [
                    "USTX RUNG",
                    "USTX WEST"
                ],
                authorizationCodes: {
                },
                md5: "eb53bd21ab967d665aeed2a472abc42b",
                createdBy: "wjohnson@enbasesolutions.com",
                createdDate: "2016-06-07T18:54:55.487Z",
                modifiedBy: "nmyers@alitek.com",
                modifiedDate: "2018-02-15T11:49:35-06:00",
                serverModifiedDate: "2018-02-20T15:28:25-06:00",
                serverCreatedDate: "2016-08-05T17:48:09+00:00"
            },
            transformationTree: [{ title: 'Node 1', children: [{ title: 'Node 2' }] }],
        };
    }

    render () {
        return (
            <div>
                <Nav title='Unified FieldLink Loader' />
                <div className="container">
                    <div>
                        <div>
                            <h3>Starting Data <PlusSign onClick={() => document.getElementById('myModal').modal({})}/></h3>
                        </div>
                        <hr />
                        <Transformation
                            title="Transformations"
                            treeData={this.state.transformationTree}
                            onChange={transformationTree => this.setState({ ...this.state, transformationTree })}
                        />
                    </div>
                </div>

                <div className="modal" id="myModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
