import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useEffect, useState } from "react";

function PropertyImages() {
  const URL = "https://localhost:44316/api/PropertyImages";

  //Estado para guardar datos que llegan
  const [data, setData] = useState([]);
  //Estado para manipulat el modal
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  //Estado para guardar datos de los input
  const [tblProperty, settblProperty] = useState({
    idPropertyImage: 0,
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
    delete tblProperty.idPropertyImage;
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
      .put(URL + "/" + tblProperty.idPropertyImage, tblProperty)
      .then((res) => {
        var respuesta = res.data;
        var dataAux = data;
        dataAux.map((gestor) => {
          if (gestor.idPropertyImage === tblProperty.idPropertyImage) {
            gestor.idProperty = respuesta.idProperty;
          }
        });
        modalEditarOpen();
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(URL + "/" + tblProperty.idPropertyImage)
      .then((res) => {
        setData(data.filter((item) => item.idPropertyImage !== res.data));
        modalEliminarOpen();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const seleccionarDato = (dato, caso) => {
    settblProperty(dato);
    caso === "Editar" ? modalEditarOpen() : modalEliminarOpen();
  };

  return (
    <div className="App container">
      <button onClick={() => modalInsertarOpen()} className="btn btn-success">
        Insertar nueva propiedad
      </button>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>PropertyImages Id</th>
            <th>Property Id</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idPropertyImage}>
              <td>{item.idPropertyImage}</td>
              <td>{item.idProperty}</td>
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
            <label>Property Id:</label>
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
            <label>PropertyImages Id:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="idPropertyImage"
              readOnly
              value={tblProperty && tblProperty.idPropertyImage}
            />
            <label>Property Id:</label>
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
          {tblProperty && tblProperty.idProperty}?
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

export default PropertyImages;
