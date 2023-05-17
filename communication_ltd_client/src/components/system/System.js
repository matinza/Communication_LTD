// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './System.css';

// const System = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
//   const [clients, setClients] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     //Get the token
//     const token = localStorage.getItem('token');

//     axios.post('https://localhost:4000/systemAddClient', formData, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json;charset=UTF-8'
//       }
//     }).then(response => {
//         toast.success(`${response.data.message}`);
//     }).catch(error => {
//       if(error.response.data.message === "Invalid or expired token"){
//         toast.error(`system error: ${error.response.data.message}, redirecting to login page`);
//         setTimeout(() => {
//           navigate('/login');  
//         }, 5000);              
//       }else{
//         toast.error(`system error: ${error.response.data.message}`);
//       }
//     })
//   };

//   const handleGetClients = () => {
//     //Get the token
//     const token = localStorage.getItem('token');

//     axios.get('https://localhost:4000/systemGetClients', {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json;charset=UTF-8'
//       },
//     })
//     .then(response => {
//         setClients(response.data.clients);
//       })
//     .catch(error => {
//         if(error.response.data.message === "Invalid or expired token"){
//           toast.error(`system error: ${error.response.data.message}, redirecting to login page`);
//           setTimeout(() => {
//             navigate('/login');  
//           }, 5000);              
//         }else{
//           toast.error(`system error: ${error.response.data.message}`);
//         }
//       });
//   };

//   return (
//     <div className="system-screen">
//       <h2>Enter New Customer Details</h2>
//       <form className="customer-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             id="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             id="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             id="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <textarea
//             name="address"
//             id="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Add client</button>
//         <ToastContainer />
//       </form>
//       <div className="clients-list">
//         <h2>All Clients</h2>
//         <button onClick={handleGetClients}>Get Clients</button>
//         {clients.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map(client => (
//                 <tr key={client.id}>
//                   <td>{client.firstName}</td>
//                   <td>{client.lastName}</td>
//                   <td>{client.email}</td>
//                   <td>{client.phone}</td>
//                   <td>{client.address}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No clients available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default System;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './System.css';

const System = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [clients, setClients] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    axios
      .post('https://localhost:4000/systemAddClient', formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        if (error.response.data.message === 'Invalid or expired token') {
          toast.error(`system error: ${error.response.data.message}, redirecting to login page`);
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        } else {
          toast.error(`system error: ${error.response.data.message}`);
        }
      });
  };

  const handleGetClients = () => {
    const token = localStorage.getItem('token');

    axios
      .get('https://localhost:4000/systemGetClients', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        setClients(response.data.clients);
        setShowTable(true);
      })
      .catch((error) => {
        if (error.response.data.message === 'Invalid or expired token') {
          toast.error(`system error: ${error.response.data.message}, redirecting to login page`);
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        } else {
          toast.error(`system error: ${error.response.data.message}`);
        }
      });
  };

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="system-screen">
      <h2>Enter New Customer Details</h2>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add client</button>
        <ToastContainer />
      </form>
      <div className="clients-list">
        <button className="Get-Clients-Button" onClick={handleGetClients}>Get Clients</button>
        {showTable && (
          <div className="table-container">
            <button className="close-button" onClick={handleToggleTable}>
              X
            </button>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.first_name}</td>
                    <td>{client.last_name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default System;
