import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import {Button} from 'react-bootstrap'
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
// import { GoogleMap } from "react-google-maps";
import Geolocation from 'react-geolocation';
import GoogleMapReact from 'google-map-react';

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  
  const mapsbaazi = {
    center: {
      lat: 26.8140544,
      lng: 75.7497856
    },
    zoom: 11
  };
  const AnyReactComponent = ({
    text
  }) => < div > {
    text
  } </div>;
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {

    return (
      <>

        

        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>




        </div> 
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Alternate Phone (Optional)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>

        


        <div> <br/>

                    <Geolocation className="flexRow"
  render={({
    fetchingPosition,
    position: { coords: { latitude, longitude } = {} } = {},
    error,
    getCurrentPosition
  }) =>
    <div>
      <Button variant ="danger" onClick={getCurrentPosition}>Request Location Access</Button>
      {/* {error &&
        <div>
          {error.message}
        </div>} */}
      <pre> <br/>
        Latitude: {latitude} Longitude: {longitude}
      </pre>
    </div>}
/>


< div style = {
    {
      height: '70vh',
      width: '100%'
    }
  } >
        <GoogleMapReact
          bootstrapURLKeys = {
          {
          key: ""
          }
          }
          defaultCenter = {
          mapsbaazi.center
        }
        defaultZoom = {
        mapsbaazi.zoom
      } >
    <AnyReactComponent
      lat = {
        59.955413
      }
      lng = {
      30.337844
      }
      text = "My Marker" /
      >
    </GoogleMapReact> </div >

        <br></br><hr/>
          <label>Address Type</label> <br/>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span style={{marginRight:"10px", marginLeft:"10px"}}>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span style={{marginLeft:"10px"}}>Work</span>
            </div>
          </div>
          <div>

          

          </div>
        </div> <br/>
        <div className="flexRow">
          <Button variant ="success"
            title="SAVE AND DELIVER HERE"
            onClick={onAddressSubmit}
            // style={{
            //   width: "250px",
            //   margin: "20px 0",
            // }}
          >Save and Deliver Here</Button>
        </div>
      </>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
