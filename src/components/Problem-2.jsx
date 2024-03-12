import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [allCountries, setAllCountries] = useState([]);
  const [usaCountry, setUsaCountry] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const [searchVal, setSearchVal] = useState("");
  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    fetch(
      `https://contact.mediusware.com/api/contacts/?search=${searchVal}&page=1&page_size=17`
    )
      .then((res) => res.json())
      .then((data) => setAllCountries(data.results));
  }, [searchVal]);

  useEffect(() => {
    fetch(
      `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${searchVal}&page=1&page_size=17`
    )
      .then((res) => res.json())
      .then((data) => setUsaCountry(data.results));
  }, [searchVal]);

  const filteredEven = usaCountry.filter((each) => {
    if (isChecked === false) return true;
    return parseInt(each.id) % 2 === 0;
  });

  const filteredEven1 = allCountries.filter((each) => {
    if (isChecked === false) return true;
    return parseInt(each.id) % 2 === 0;
  });

  //   console.log(allCountries);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={handleShow}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={handleShow2}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Only Even</InputGroup.Text>
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                onChange={() => setIsChecked(!isChecked)}
              />

              <Form.Control
                placeholder="Search"
                value={searchVal}
                onChange={handleInputChange}
                aria-label="Text input with checkbox"
              />
            </InputGroup>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Phone</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {filteredEven1.map(({ id, phone, country }) => (
                  <>
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{phone}</td>
                      <td>{country.name}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">All Contacts</Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                handleShow2();
              }}
            >
              US Contacts
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>US Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Only Even</InputGroup.Text>
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                onChange={() => setIsChecked(!isChecked)}
              />

              <Form.Control
                placeholder="Search"
                value={searchVal}
                onChange={handleInputChange}
                aria-label="Text input with checkbox"
              />
            </InputGroup>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Phone</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {filteredEven.map(({ id, phone, country }) => (
                  <>
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{phone}</td>
                      <td>{country.name}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleClose2();
                handleShow();
              }}
            >
              All Contacts
            </Button>
            <Button variant="primary">US Contacts</Button>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
