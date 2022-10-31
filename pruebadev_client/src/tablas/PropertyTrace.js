import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";

function PropertyTrace() {
  const URL = "https://localhost:44316/api/PropertyTraces";

  //Estado para guardar datos que llegan
  const [data, setData] = useState([]);
  //Estado para manipulat el modal
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  //Estado para guardar datos de los input
  const [tblProperty, settblProperty] = useState({
    idPropertyTrace: 0,
    dateSale: "",
    name: "",
    value: "",
    tax: "",
    idProperty: 0,
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
    delete tblProperty.idPropertyTrace;
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
      .put(URL + "/" + tblProperty.idPropertyTrace, tblProperty)
      .then((res) => {
        var respuesta = res.data;
        var dataAux = data;
        dataAux.map((gestor) => {
          if (gestor.idPropertyTrace === tblProperty.idPropertyTrace) {
            gestor.dateSale = respuesta.dateSale;
            gestor.name = respuesta.name;
            gestor.value = respuesta.value;
            gestor.tax = respuesta.tax;
            gestor.idProperty = respuesta.idProperty;
          }
        });
        setData(dataAux);
        modalEditarOpen();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(URL + "/" + tblProperty.idPropertyTrace)
      .then((res) => {
        setData(data.filter((item) => item.idPropertyTrace !== res.data));
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
            <th>IdPropertyTrace</th>
            <th>Date sale</th>
            <th>Name</th>
            <th>Value</th>
            <th>Tax</th>
            <th>Id Property</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items) => (
            <tr key={items.idPropertyTrace}>
              <td>{items.idPropertyTrace}</td>
              <td>{items.dateSale}</td>
              <td>{items.name}</td>
              <td>{items.value}</td>
              <td>{items.tax}</td>
              <td>{items.idProperty}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarDato(items, "Editar")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarDato(items, "Eliminar")}
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
            <label>Date sale:</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="dateSale"
            />
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="name"
            />
            <label>Value:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="value"
            />
            <label>Tax:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="tax"
            />
            <label>Id property:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="idProperty"
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
            <label>PropertyTrace Id:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="idPropertyTrace"
              readOnly
              value={tblProperty && tblProperty.idPropertyTrace}
            />
            <label>Date sale:</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="dateSale"
            />
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="name"
            />
            <label>Value:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="value"
            />
            <label>Tax:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="tax"
            />
            <label>Id property:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="idProperty"
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

export default PropertyTrace;
