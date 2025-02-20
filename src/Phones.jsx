import Swal from "sweetalert2";
import "./myModal.css";
import { useRef, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

export default function Phones() {
  const [phones, setPhones] = useState([
    { name: "Iphone x", price: 2000, qty: 123 },
    { name: "Iphone 11", price: 10000, qty: 153 },
    { name: "Iphone 13", price: 11000, qty: 567 },
  ]);
  const [modalIndex, setModalIndex] = useState(false);
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();

  const [EditModalIndex, setEditModalIndex] = useState(false);
  const [editedphoneName, setEditedPhoneName] = useState("");
  const [editedphonePrice, setEditedPhonePrice] = useState(0);
  const [editedphoneQty, setEditedPhoneQty] = useState(0);
  const [phoneIndex, setPhoneIndex] = useState(0);

  //Add Items
  let handleSubmit = (e) => {
    e.preventDefault();
    let newPhones = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };
    const copy = [...phones];
    copy.push(newPhones);
    setPhones(copy);
    Swal.fire({
      icon: "success",
      title: "Phone Added Successfully",
      timer: 1200,
    }).then(() => {
      setModalIndex(false);
    });
  };
  //End Add Items

  //Edit Items
  let editItems = (index) => {
    setPhoneIndex(index);
    let phone = phones[index];
    setEditedPhoneName(phone.name);
    setEditedPhonePrice(phone.price);
    setEditedPhoneQty(phone.qty);
    setEditModalIndex(true);
  };

  let confirmEdit = (e) => {
    e.preventDefault();
    let obj = {
      name: editedphoneName,
      price: +editedphonePrice,
      qty: +editedphoneQty,
    };
    let copy = [...phones];
    copy[phoneIndex] = obj;
    setPhones(copy);

    Swal.fire({
      icon: "success",
      title: "Edited Successfully",
      confirmButtonText: "Confirm",
      timer: 1200,
    }).then(() => {
      setEditModalIndex(false);
    });
  };
  // End Edit Items

  //Remove Items
  let removeItem = (phoneIndex) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure ?",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then((r) => {
      if (r.isConfirmed) {
        const copy = [...phones];
        copy.splice(phoneIndex, 1);
        setPhones(copy);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1200,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      }
    });
  };
  //End Remove Items

  return (
    <div>
      <button onClick={() => setModalIndex(true)} className="btn btn-primary">
        Add Phones
      </button>

      {modalIndex == true ? (
        <div
          onClick={() => setModalIndex(false)}
          className="myModal d-flex flex-column justify-content-center align-items-center"
        >
          <form
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" col-12 col-md-5 d-flex flex-column bg-white gap-3 shadow p-3 border rounded-1 animate__animated animate__fadeInDown"
          >
            <input
              ref={nameInput}
              className="form-control"
              type="text"
              placeholder="Enter Your Phone Name"
            />
            <input
              ref={priceInput}
              className="form-control"
              type="number"
              placeholder="Enter Your Phone Price"
            />
            <input
              ref={qtyInput}
              className="form-control"
              type="number"
              placeholder="Enter Your Phone Quantity"
            />
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : null}

      <table className="table table-dark table-bordered align-middle text-center">
        <thead>
          <tr>
            <th>-</th>
            <th>Phone Name</th>
            <th>Phone Price</th>
            <th>Phone Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{el.qty}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <FaRegTrashAlt
                      onClick={() => {
                        removeItem(index);
                      }}
                      className="fs-5 text-danger"
                    />
                    <FaRegEdit
                      onClick={() => {
                        editItems(index);
                      }}
                      className="fs-5 text-warning"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {EditModalIndex == true ? (
        <div
          onClick={() => setEditModalIndex(false)}
          className="myModal d-flex flex-column justify-content-center align-items-center"
        >
          <form
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" col-12 col-md-5 d-flex flex-column bg-white gap-3 shadow p-3 border rounded-1 animate__animated animate__fadeInDown"
          >
            <input
              defaultValue={editedphoneName}
              onKeyUp={(event) => {
                setEditedPhoneName(event.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Enter Your Phone Name"
            />
            <input
              defaultValue={editedphonePrice}
              onKeyUp={(event) => {
                setEditedPhonePrice(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter Your Phone Price"
            />
            <input
              defaultValue={editedphoneQty}
              onKeyUp={(event) => {
                setEditedPhoneQty(event.target.value);
              }}
              className="form-control"
              type="number"
              placeholder="Enter Your Phone Quantity"
            />
            <button onClick={confirmEdit} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
