import { useEffect, useRef, useState } from "react";
import initWeb3 from "./utils/web3";
import { abi, contractAddress } from "./utils/recycle";
import {listOfMessages, locations } from "./constants";
import "./App.css";

const { ethereum } = window;

function App() {
  const recycleContract = useRef(null);
  const [web3, setWeb3] = useState(null);
  const [doneCheckingForMetaMask, setDoneCheckingForMetaMask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isRinkebyChain, setIsRinkebyChain] = useState(false);
  const [userBalance, setBalance] = useState("");

  const [admin, setAdmin] = useState("");
  const [descp, setDescp] = useState("");
  const [code, setCode] = useState("");
  const [weight, setWeight] = useState("");
  const [addressToReward, setAddress] = useState("");
  // const [amountToReward, setAmount] = useState("");
  const [collector, setCollector] = useState("");
  const [addressToRequestRewardFor, setRequestAddress] = useState("");
  const [weightInputByCollector, setweightInputByCollector] = useState("");
  const [message, setMessage] = useState("");
  // const [status, setStatus] = useState("...");

  const [addingRecyclable, setAddingRecyclable] = useState(false);
  const [rewardingUser, setRewardingUser] = useState(false);
  const [requestingReward, setRequestingReward] = useState(false);


  useEffect(() => {
    let cancelled = false;

    async function initWeb3WithProvider() {
      if (web3 === null) {
        if (!cancelled) {
          setDoneCheckingForMetaMask(false);
          const web3Instance = await initWeb3();
          setWeb3(web3Instance);

          // Transactions done in this app must be done on the Rinkeby test network.
          const chainId = await ethereum.request({ method: "eth_chainId" });
          if (chainId === "0x4") {
            setIsRinkebyChain(true);
          }

          setDoneCheckingForMetaMask(true);

          if (web3Instance !== null) {
            // Create Contract JS object.
            recycleContract.current = new web3Instance.eth.Contract(
              abi,
              contractAddress
            );

            // Check to see if user is already connected.
            try {
              const accounts = await ethereum.request({
                method: "eth_accounts",
              });
              if (accounts.length > 0 && ethereum.isConnected()) {
                setConnected(true);
              }
            } catch (error) {
              console.error(error);
            }

            // Implement `accountsChanged` event handler.
            ethereum.on("accountsChanged", handleAccountsChanged);
          }
        }
      }
    }

    initWeb3WithProvider();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (connected) {
      async function handler() {
        const admin = await recycleContract.current.methods.owner().call();
        const collector = await recycleContract.current.methods
          .wasteCollector()
          .call();
        if (!cancelled) {
          setAdmin(admin);
          await checkUserBalance();
          setCollector(collector);
        }
      }
      handler();
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  const getAccount = async (_event) => {
    setConnecting(true);
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {}
    setConnecting(false);
  };

  const handleAccountsChanged = (_accounts) => {
    window.location.reload();
  };

  /**
   *
   * @dev All functions handling form submissions are defined in this section
   */

  const handleDropdown = (event) => {
    var selection = event.target.value;

    if (selection === "DEFAULT") {
      setCode("");
    } else {
      setCode(event.target.value);
    }
  };

  const showLocation = (val) => {
    switch (val) {
      case "SH":
        return locations[0];
      case "AJ":
        return locations[1];
      case "DU":
        return locations[2];
      case "AD":
        return locations[3];
      case "FU":
        return locations[4];
      case "RK":
        return locations[5];
      case "UQ":
        return locations[6];
      default:
        break;
    }
  };


  const handleUserSubmission = async (event) => {
    event.preventDefault();

    if (descp === "" || code === "" || weight === "") {
      showMessage(listOfMessages[0]);
    } else if (weight < 1) {
      showMessage(listOfMessages[3]);
    } else {
      setAddingRecyclable(true);
      const accounts = await web3.eth.getAccounts();
      showMessage(listOfMessages[1]);
      await recycleContract.current.methods
        .addRecyclable(descp, code, Math.round(weight))
        .send({
          from: accounts[0],
        });
      // var numOfItems = result.events.LogRecyclableAdded.returnValues.itemId;
      // var statusIndex =
      //   result.events.LogRecyclableAdded.returnValues.statusOfRecyclable;

      // console.log("Testing for: " + numOfItems + " / " + statusIndex);

      // setStatus(statesOfItems[statusIndex]);
      // showMessage(`✅ You have recycled a total of ${numOfItems} items`);
      showMessage(listOfMessages[2]);
      // console.log(statusOfItems);

      setAddingRecyclable(false);
    }
  };

  const handleCollectorSubmission = async (event) => {
    event.preventDefault();

    if (addressToRequestRewardFor === "" || weightInputByCollector === "") {
      showMessage(listOfMessages[0]);
    } else if (weightInputByCollector < 1) {
      showMessage(listOfMessages[3]);
    } else {
      setRequestingReward(true);
      showMessage(listOfMessages[1]);
      // const amountWei = web3.utils.toWei("0.001", "ether");
      await recycleContract.current.methods
        .requestReward(addressToRequestRewardFor, Math.round(weightInputByCollector))
        .send({
          from: collector,
        });
      
      // var statusIndex =
      //   result.events.LogRecieved.returnValues.statusOfRecyclable;

      // setStatus(statesOfItems[statusIndex]);

      showMessage(listOfMessages[4]);

      setRequestingReward(false);
    }
  };

  const handleAdminSubmission = async (event) => {
    event.preventDefault();

    if (addressToReward === "") {
      showMessage(listOfMessages[0]);
    } else {
      setRewardingUser(true);
      showMessage(listOfMessages[1]);
      const amountWei = web3.utils.toWei("0.002", "ether");
      await recycleContract.current.methods
        .awardRecycler(addressToReward)
        .send({
          from: admin,
          value: amountWei,
        });

      // var statusIndex =
      //   result.events.LogRewarded.returnValues.statusOfRecyclable;

      // setStatus(statesOfItems[statusIndex]);

      showMessage(listOfMessages[5]);

      setRewardingUser(false);
    }
  };

  //

  const checkUserBalance = async () => {
    var userAdd = await web3.eth.getAccounts();
    var balance = await web3.eth.getBalance(userAdd[0]);
    var balanceInEther = web3.utils.fromWei(balance, "ether");
    setBalance(balanceInEther);
  };

  const showMessage = async (msg) => {
    setMessage(msg);
  };

  return (
    <div className="App">
      {web3 === null && !doneCheckingForMetaMask && (
        <div className="page-center">
          <div className="alert info">
            <h1 className="no-margin-top">Recycle Contract</h1>
            <p className="no-margin">
              Checking for MetaMask Ethereum Provider...
            </p>
          </div>
        </div>
      )}

      {web3 === null && doneCheckingForMetaMask && (
        <div className="page-center">
          <div className="alert error">
            <h1 className="no-margin-top">Recycle Contract</h1>
            <p className="no-margin">
              MetaMask is required to run this app! Please install MetaMask and
              then refresh this page.
            </p>
          </div>
        </div>
      )}

      {web3 !== null && doneCheckingForMetaMask && !isRinkebyChain && (
        <div className="page-center">
          <div className="alert error">
            <h1 className="no-margin-top">Recycle Contract</h1>
            <p className="no-margin">
              You must be connected to the <strong>Rinkeby test network</strong>{" "}
              for Ether transactions made via this app.
            </p>
          </div>
        </div>
      )}

      {web3 !== null && !connected && isRinkebyChain && (
        <div className="page-center">
          <section className="card">
            <h1 className="no-margin-top">Recycle Contract</h1>
            <p>Connect with MetaMask and start recycling!</p>
            <div className="center">
              <button
                className="btn primaryBtn"
                type="button"
                onClick={getAccount}
                disabled={connecting}
              >
                Connect with MetaMask
              </button>
            </div>
          </section>
        </div>
      )}

      {web3 !== null && connected && isRinkebyChain && (
        <div className="page-center">
          <section className="card">
            <h1 className="no-margin-top">Your Portal to E-waste Recycling</h1>
            <p>This contract is managed by {admin}.</p>
            <p>The assigned e-waste collector is {collector}.</p>
            <div className="user-info">
              <p>
                🔐 Your Address is {ethereum.selectedAddress} <br />
                📩 Your Balance is {userBalance} Ξ
              </p>
            </div>
            {/* <p>Your assigned waste collector is {collector} </p> */}

            {/* <hr className="line"/> */}

            {/* Only recycler fills this form */}

            {admin.toLowerCase() !== ethereum.selectedAddress &&
              collector.toLowerCase() !== ethereum.selectedAddress && (
                <div>
                  <form onSubmit={handleUserSubmission}>
                    <h4>Want to recycle?</h4>
                    <div className="input-area">
                      <label>Enter item description:</label>{" "}
                      <input
                        value={descp}
                        onChange={(event) => setDescp(event.target.value)}
                      />{" "}
                    </div>
                    <div className="input-area">
                      <label>Enter city:</label>{" "}
                      {/* <input
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        maxLength="2"
                      />{" "} */}
                      <select name="cities" onChange={handleDropdown}>
                        <option value="DEFAULT">-- Select an option --</option>
                        <option value="SH">Sharjah</option>
                        <option value="AJ">Ajman</option>
                        <option value="DU">Dubai</option>
                        <option value="AD">Abu Dhabi</option>
                        <option value="FU">Fujairah</option>
                        <option value="RK">Ras Al Khaimah</option>
                        <option value="UQ">Umm Al Quwain</option>
                      </select>
                    </div>
                    <div className="input-area">
                      <label>Enter weight (in KGs):</label>{" "}
                      <input
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                      />{" "}
                    </div>
                    <button
                      className="btn primaryBtn"
                      type="submit"
                      disabled={addingRecyclable}
                    >
                      Enter
                    </button>
                  </form>
                </div>
              )}

            {/* Only collector fills this form */}
            {collector.toLowerCase() === ethereum.selectedAddress && (
              <div>
                <form onSubmit={handleCollectorSubmission}>
                  <h4>Want to request a reward?</h4>
                  <div className="input-area">
                    <label>Enter address to be rewarded:</label>{" "}
                    <input
                      value={addressToRequestRewardFor}
                      onChange={(event) =>
                        setRequestAddress(event.target.value)
                      }
                    />{" "}
                  </div>
                  <div className="input-area">
                    <label>Enter total weight (in KGs):</label>{" "}
                    <input
                      value={weightInputByCollector}
                      onChange={(event) => setweightInputByCollector(event.target.value)}
                    />{" "}
                  </div>
                  <div className="input-area">
                    <button
                      className="btn primaryBtn"
                      type="submit"
                      disabled={requestingReward}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Only admin fills this form */}

            {admin.toLowerCase() === ethereum.selectedAddress && (
              <div>
                <h4>Approve the following request:</h4>
                <form onSubmit={handleAdminSubmission}>
                  <h4>Want to reward?</h4>
                  <div className="input-area">
                    <label>Enter address to be rewarded:</label>{" "}
                    <input
                      value={addressToReward}
                      onChange={(event) => setAddress(event.target.value)}
                    />{" "}
                  </div>
                  {/* <div className="input-area">
                    <label>Enter amount to be rewarded (in Ether):</label>{" "}
                    <input
                      value={amountToReward}
                      onChange={(event) => setAmount(event.target.value)}
                    />{" "}
                  </div> */}
                  <div className="input-area">
                    <button
                      className="btn primaryBtn"
                      type="submit"
                      disabled={rewardingUser}
                    >
                      Go Forth & Reward
                    </button>
                  </div>
                </form>
                </div>
            )}

            <h2>{message}</h2>

            {/** Transaction details for a recycler */}
            {ethereum.selectedAddress !== admin.toLowerCase() &&
              ethereum.selectedAddress !== collector.toLowerCase() && (
                <div className="txn-details">
                  <div className="row">
                    <div className="column">
                      <table>
                        <caption>🧾👇 Your transaction details:</caption>
                        <tbody>
                          <tr>
                            <th>Description</th>
                            <th>City</th>
                            <th>Weight</th>
                            {/* <th>Status</th> */}
                            <th>Drop-off Location</th>
                          </tr>
                          <tr>
                            <td>{descp}</td>
                            <td>{code}</td>
                            <td>{weight}</td>
                            {/* <td>{status}</td> */}
                            <td>{showLocation(code)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            {/** Transaction details for a collector */}
            {ethereum.selectedAddress === collector.toLowerCase() && (
              <div className="txn-details">
                <div className="row">
                  <div className="column">
                    <table>
                      <caption>🧾👇 Your reward request details:</caption>
                      <tbody>
                        <tr>
                          <th>Recycler's Address</th>
                          <th>Weight</th>
                        </tr>
                        <tr>
                          <td>{addressToRequestRewardFor}</td>
                          <td>{weightInputByCollector}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>

          <footer>&copy; Copyright 2021 E-Recycle</footer>
        </div>
      )}
    </div>
  );
}

export default App;
