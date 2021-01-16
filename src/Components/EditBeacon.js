import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class EditBeacon extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            key:'',
            beaconId:'',
            beaconName:'',
            major:'',
            minor:''
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('beacon').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if(doc.exists)
            {
                const document = doc.data();
                this.setState({
                    key: doc.id,
                    beaconId: document.beaconId,
                    beaconName: document.beaconName,
                    major: document.major,
                    minor: document.minor
                });
            }
            else{
                console.log("No such document is here!")
            }
        });
    }
    onChange = (e) =>
    {
        const state = this.state;
        state[e.target.name] = e.target.value;
        state[e.target.beaconName] = e.target.value;
        state[e.target.major] = e.target.value;
        state[e.target.minor] = e.target.value;
        this.setState({document : state});
    }

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {beaconId,beaconName,major,minor} = this.state;
        const updateRef = firebase.firestore().collection('beacon').doc(this.state.key);
        updateRef.set({
            beaconId,
            beaconName,
            major,
            minor,
        }).then((docRef)=> {
            this.setState({
                key:'',
                beaconId:'',
                beaconName:'',
                major:'',
                minor:'',
            });
            alert("Beacon is successfully edited")
            this.props.history.push("/shows/beacon/"+this.props.match.params.id)
        })
        .catch((error)=>{
            console.error("Error editing the document: ", error);
        });
    }

    render()
    {
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

                    <div className="container">
                        <div className="panel panel-default">
                            
                        <div className="panel-body">
                            <form onSubmit = {this.onSubmit}>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Beacon ID : </label>
                                    <input type="text" className="form-control" name="beaconId" value={this.state.beaconId} onChange={this.onChange} placeholder="Eg: b9407f30-f5f8-466e-aff9-25556b57fe6a"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Name : </label>
                                    <input type="text" className="form-control" name="beaconName" value={this.state.beaconName} onChange={this.onChange} placeholder="Eg: Level 1"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Major : </label>
                                    <input type="text" className="form-control" name="major" value={this.state.major} onChange={this.onChange} placeholder="Enter Major Beacon"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Minor : </label>
                                    <input type="text" className="form-control" name="minor" value={this.state.minor} onChange={this.onChange} placeholder="Enter Minor Beacon"></input>
                                </div>
                                &nbsp;
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                    </Card>
            </div>
        )
    }    
}
export default EditBeacon