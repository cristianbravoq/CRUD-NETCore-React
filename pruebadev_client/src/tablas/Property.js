import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";

function Property() {
    const URL = "https://localhost:44316/api/Properties";

    //Estado para guardar datos que llegan
    const [data, setData] = useState([]);
    //Estado para manipulat el modal
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    //Estado para guardar datos de los input
    const [tblProperty, settblProperty] = useState({
      idProperty: 0,
      name: "",
      address: "",
      price: "",
      codeInternal: "",
      year: "",
      idOwner: 0,
    });
  
    const peticionGet = async () => {
      await axios
        .get(URL)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    useEffect(() => {
      peticionGet();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      settblProperty({
        ...tblProperty,
        [name]: value,
      });
      console.log(tblProperty);
    };
  
    const modalInsertarOpen = () => {
      setModalInsertar(!modalInsertar);
    };
  
    const modalEditarOpen = () => {
      setModalEditar(!modalEditar);
    };
  
    const modalEliminarOpen = () => {
      setModalEliminar(!modalEliminar);
    };
  
    const peticionPost = async () => {
      delete tblProperty.idProperty;
      await axios
        .post(URL, tblProperty)
        .then((res) => {
          setData(data.concat(res.data));
          modalInsertarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const peticionPut = async () => {
      await axios
        .put(URL + "/" + tblProperty.idProperty, tblProperty)
        .then((res) => {
          var respuesta = res.data;
          var dataAux = data;
          dataAux.map((gestor) => {
            if (gestor.idProperty === tblProperty.idProperty) {
              gestor.name = respuesta.name;
              gestor.address = respuesta.address;
              gestor.price = respuesta.price;
              gestor.codeInternal = respuesta.codeInternal;
              gestor.year = respuesta.year;
              gestor.idOwner = respuesta.idOwner;
            }
          });
          modalEditarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const peticionDelete = async () => {
      await axios
        .delete(URL + "/" + tblProperty.idProperty)
        .then((res) => {
          setData(data.filter(item => item.idProperty !== res.data))
          modalEliminarOpen();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const seleccionarDato = (dato, caso) => {
      caso === "Editar" ? modalEditarOpen() : modalEliminarOpen();
      settblProperty(dato);
    };
  
    return (
      <div className="App container">
        <button onClick={() => modalInsertarOpen()} className="btn btn-success">
          Insertar nueva propiedad
        </button>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>IdProperty</th>
              <th>Name</th>
              <th>Address</th>
              <th>Price</th>
              <th>CodeInternal</th>
              <th>Year</th>
              <th>IdOwner</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idProperty}>
                <td>{item.idProperty}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.price}</td>
                <td>{item.codeInternal}</td>
                <td>{item.year}</td>
                <td>{item.idOwner}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarDato(item, "Editar")}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarDato(item, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar nueva Propiedad</ModalHeader>
          <ModalBody>
            <div>
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="name"
              />
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="address"
              />
              <label>Price:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="price"
              />
              <label>CodeInternal:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="codeInternal"
              />
              <label>Year:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="year"
              />
              <label>Owner Id:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="idOwner"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPost()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => modalInsertarOpen()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar datos de propiedad</ModalHeader>
          <ModalBody>
            <div>
              <label>Property Id:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="idProperty"
                readOnly
                value={tblProperty && tblProperty.idProperty}
              />
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="name"
                value={tblProperty && tblProperty.name}
              />
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="address"
                value={tblProperty && tblProperty.address}
              />
              <label>Price:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="price"
                value={tblProperty && tblProperty.price}
              />
              <label>CodeInternal:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="codeInternal"
                value={tblProperty && tblProperty.codeInternal}
              />
              <label>Year:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="year"
                value={tblProperty && tblProperty.year}
              />
              <label>Owner Id:</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="idOwner"
                value={tblProperty && tblProperty.idOwner}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPut()}>
              Insertar
            </button>
            <button className="btn btn-danger" onClick={() => modalEditarOpen()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={modalEliminar}>
          <ModalHeader>Editar datos de propiedad</ModalHeader>
          <ModalBody>
            ¿Estas seguro que deseas eliminar este registro de la base de datos{" "}
            {tblProperty && tblProperty.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>
              Si
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => modalEliminarOpen()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default Property;