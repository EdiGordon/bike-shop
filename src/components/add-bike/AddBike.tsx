import "./AddBike.scss";
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { BikeDto, authService } from "../../services/auth.service";
import React from "react";
// import { v4 } from "uuid";
// import { useAppDispatch } from "../../app/hooks";
// import { Card, Category, addCard } from "../../features/cards/cardsSlice";

/**
 * 
 * @returns type ProductPorps = {
    name: string;
    price: number;
    type: string;
    image: any;
    find?: any;
}
 */

const AddCardComponent = (): JSX.Element => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();
  const [file, setFileChange] = useState<File | any>();

  const addProduct = (product: ProductPorps) => {
    const bikeDto: BikeDto = {
      name: product.name,
      type: product.type,
      price: product.price,
    
    };
    authService.addNew(bikeDto, file);
  }

  //dispatch:
  // const dispatch = useAppDispatch();

  // 1) boolean state for the modal:
  const [isOpen, setOpen] = useState(false);
  Modal.setAppElement("#root");

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="d-flex">
        <button onClick={openModal} className="btn primary-button" >
          Add Card
        </button>
      </div>
      <Modal onRequestClose={closeModal} isOpen={isOpen} closeTimeoutMS={500}>
        <div className="d-flex card m-5">
          <h2 className="p-3">Add A Bike:</h2>
          <button className="btn primary-button" onClick={closeModal}>
            Close Modal
          </button>
        </div>
        <hr />
        Name:
        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <br />
        Type:
        <input
          value={type}
          onChange={(e) => setType(e.currentTarget.value)}
        />
        <br />
        Price:
        <input
          min="0"
          max="500"
          type="number"
          value={price}
          onChange={(e) => setPrice(+e.currentTarget.value)}
        />
        <br />
        <input type="file" onChange={(e) => setFileChange(e.target.files ? e.target.files[0] : null)} />



        <button className="primary-button"
          onClick={() => {
            const product: ProductPorps = {
              // id: v4(),
              name: name,
              type: type,
              price: price,
              image: null
            };
            addProduct(product);
            Swal.fire("success", "", "success").then((e) => closeModal());
          }}
        >
          Add Card:
        </button>
      </Modal>
    </>
  );
};

export default AddCardComponent;
