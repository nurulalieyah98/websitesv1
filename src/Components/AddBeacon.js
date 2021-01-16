import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class AddBeacon extends React.Component{
    constructor(props)
    {
        super(props);
        this.ref = firebase.firestore().collection('beacon');
        this.state ={
            beaconId: '',
            major: '',
            minor: '',
            beaconName: ''
        }
    }
    onChange = (e) =>
    {
        const state = this.state;
        state[e.target.beaconId] = e.target.value;
        state[e.target.major] = e.target.value;
        state[e.target.minor] = e.target.value;
        state[e.target.name] = e.target.value;
        state[e.target.beaconName] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) =>
    {
            e.preventDefault();
            const {beaconId,beaconName,major,minor} = this.state;
            this.ref.add({
                beaconId,
                beaconName,
                major,
                minor
            }).then((docRef)=> {
                this.setState({
                    beaconId:'',
                    beaconName:'',
                    major:'',
                    minor:''
                });
                alert("Beacon is successfully added")
                this.props.history.push("/beacon")
            })
            .catch((error)=>{
                alert("Error adding book")
                console.error("Error adding document: ", error);
            });
    }
    render()
    {
        const {beaconId,beaconName,major,minor} = this.state;
        const cardStyles =
        {
            width: '60rem',
            // height: 'auto',
            // backgroundColor: 'white',
            // margin: 'auto',
            // display: 'block',
            // marginTop: '60px',
            // opacity: 0.5,
            // paddingTop: '10px',
            // paddingLeft: '20px',
            // paddingRight: '20px',
            borderStyle: 'outset',
            borderLeft: '50px solid black',
            borderRadius: '20px'
        }
        return (
            <div>
                <Card className="cardStyles" style={cardStyles}>
                <div className="Buttons">
                      <Link to="/beacon">
                          <button className="Edit-Button">
                              Show Beacon
                          </button>
                      </Link>
                   </div>
                   <div>
                   <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Beacon Id : </label>
                        <input type="text" className="form-control" name="beaconId" value={beaconId} onChange={this.onChange} placeholder="Eg: b9407f30-f5f8-466e-aff9-25556b57fe6a "></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Name : </label>
                        <input type="text" className="form-control" name="beaconName" value={beaconName} onChange={this.onChange} placeholder="Eg: Level 1"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Major : </label>
                        <input type="text" className="form-control" name="major" value={major} onChange={this.onChange} placeholder="Please Enter Major"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Minor : </label>
                        <input type="text" className="form-control" name="minor" value={minor} onChange={this.onChange} placeholder="Please Enter Minor"></input>
                    </div>
                   </div>

                    <div className="Buttons">
                        <button className="Submit-Button" onClick={this.onSubmit}>Save All</button>
                    </div>

                </Card>
            </div>
        )
    }
}
export default AddBeacon;