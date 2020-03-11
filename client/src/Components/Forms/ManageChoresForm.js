import React, { useState, useEffect } from "react";
import axios from 'axios'
import { List, ListItem } from "../List/index";
import DeleteBtn from "../Buttons/DeleteBtn/index";

const ManageChoresForm = () => {

  const [chores, setChores] = useState()
  const [amount, setAmount] = useState()
  const [choresArray, setChoresArray] = useState([])

  useEffect(() => {
    loadChores()
  }, [])

  // Loads all chores
  function loadChores() {
    axios.get("/api/chores/")
      .then(res =>
        setChoresArray(res.data),
      )
      .catch(err => console.log(err));
  };

  // Deletes a chore from the database with a given chores_id, then reloads chores
  function deleteChore(chores_id) {
    console.log(chores_id)
    axios.delete(`/api/chores/${chores_id}`).then(response => {
      console.log(response);
      loadChores()
    })
  };

  // Add chore to db based on input fields (chore name and amount)
  function addChore(event) {
    var newChore = {
      chore_name: chores,
      amount: amount,
      admin_id: 1,
    };
    axios.post("/api/chores/", newChore).then(
      function () {
        console.log("This is the result", newChore)
      })
  }

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#20638C" }}>
        <a className="navbar-brand" href="/parent" style={{ color: "white" }}>
          <img src="images/logo.png" width="100px" className="d-inline-block align-top" alt="Logo"></img>
        </a>
        <h3 className="header-title">Manage Chores</h3>
      </nav>
      <div className="col-md-8 offset-md-2">
        <br />
        <br />
        <h4>All Chores</h4>

        {/* Goes through Chores Array and lists out each chore. Chore name and amount are displayed and a delete button is created for each chore */}
        {choresArray.length ? (
          <List>
            {choresArray.map(chore => {
              return (
                <ListItem key={chore.chores_id}>

                  <strong>
                    <b> {chore.chore_name} </b> for: <i> ${chore.amount}.00 </i>
                  </strong>

                  <DeleteBtn onClick={() => deleteChore(chore.chores_id)} />
                </ListItem>
              );
            })}
          </List>
        ) : (
            // This will render when there are no chores to be displayed
            <p>Add a Chore Below!</p>
          )}
      </div>

      {/* Add a chore form! */}
      <hr />
      <form>
        <div className="col-md-6 offset-md-3">
          <br />
          <h4>Add a New Chore</h4>
          <br />
          <div className="form-group">
            <h6>Chore Name:</h6>
            <input type="Name" className="form-control" onChange={e => setChores(e.target.value)} id="choreName" placeholder="Do the Dishes"></input>
          </div>
          <br />
          <div className="form-group">
            <h6>Amount (In Dollars):</h6>
            <input type="Amount" className="form-control" onChange={e => setAmount(e.target.value)} id="choreAmount" placeholder="2"></input>
          </div>
          {/* To Do: Change Button Color to match color schema */}
          <button type="submit" onClick={addChore} className="btn btn-primary">Submit</button>
        </div>
      </form>
      <br />
      <br />

      {/* To Do: Footer Code, do we want this to be a component? */}
      <nav className="footer" style={{ backgroundColor: "#20638C" }}>
        <a className="navbar-brand" href="/parent"> <div class="footer-copyright text-white font-small"> © 2020 Copyright: Nuggets</div>
          <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""></img>
        </a>
      </nav>
    </div>
  )
};

export default ManageChoresForm