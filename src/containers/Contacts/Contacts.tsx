import React from 'react';

const Contacts = () => {
  return (
    <div className="container mt-3">
      <h1>Contacts</h1>
      <h4>Contact information:</h4>
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Email</h5>
          <p>lorem@ipsum.com</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Address</h5>
          <p>127 Street, Bishkek City, 12345</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;