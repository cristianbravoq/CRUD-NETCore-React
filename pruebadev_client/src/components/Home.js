import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";
import Property from "../tablas/Property";
import PropertyImages from "../tablas/PropertyImages";
import PropertyTrace from "../tablas/PropertyTrace";
import Owner from "../tablas/Owner";
import "../App.css";

function Home() {
  const [modalProperty, setModalProperty] = useState(false);
  const [modalPropertyImage, setModalPropertyImage] = useState(false);
  const [modalPropertyTrace, setModalPropertyTrace] = useState(false);
  const [modalOwner, setModalOwner] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const modalPropertyOpen = () => {
    setModalProperty(!modalProperty);
  };
  const modalPropertyImageOpen = () => {
    setModalPropertyImage(!modalPropertyImage);
  };
  const modalPropertyTraceOpen = () => {
    setModalPropertyTrace(!modalPropertyTrace);
  };
  const modalOwnerOpen = () => {
    setModalOwner(!modalOwner);
  };

  return (
    <div>
      <div className="container">
        <div className="abs-center">
          <div>
            <button
              onClick={() => modalPropertyOpen()}
              className="btn btn-primary"
            >
              Properties
            </button>
          </div>
          <div>
            <button
              onClick={() => modalPropertyImageOpen()}
              className="btn btn-primary"
            >
              Property Images
            </button>
          </div>
          <div>
            <button
              onClick={() => modalPropertyTraceOpen()}
              className="btn btn-primary"
            >
              Property Trace
            </button>
          </div>
          <div>
            <button
              onClick={() => modalOwnerOpen()}
              className="btn btn-primary"
            >
              Owners
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalProperty} toggle={()=> toggle()}>
        <Property></Property>
      </Modal>
      <Modal isOpen={modalPropertyImage}>
        <PropertyImages></PropertyImages>
      </Modal>
      <Modal isOpen={modalPropertyTrace}>
        <PropertyTrace></PropertyTrace>
      </Modal>
      <Modal isOpen={modalOwner}>
        <Owner></Owner>
      </Modal>
    </div>
  );
}

export default Home;
