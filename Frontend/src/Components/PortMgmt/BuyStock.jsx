import React, { useState, useEffect } from 'react';
import './BuyStock.css';
import Navbar from '../LandingPage/Navbar';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const BuyStock = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolioId, setPortfolioId] = useState('');
  const [noOfShares, setNoOfShares] = useState('');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSuccessErrorModalOpen, setIsSuccessErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    // Fetch initial stock data (replace with actual API endpoint)
    fetch('http://localhost:8005/auth/stock/coins')
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stocks:', error));
  }, []);

  const handleBuyButtonClick = (stock) => {
    setSelectedStock(stock); // Store the selected stock for later use
    setIsBuyModalOpen(true); // Open the buy modal
  };

  const handleSubmit = () => {
    if (!portfolioId || !noOfShares || !selectedStock) {
      alert('Please fill out all fields.');
      return;
    }

    fetch(`http://localhost:8005/auth/stock/${portfolioId}/buy-stock?stockSymbol=${selectedStock.id}&noOfShares=${noOfShares}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          setModalType('success');
          setModalMessage('Stock purchased successfully!');
        } else {
          setModalType('error');
          setModalMessage('Sorry, please try again later.');
        }
        setIsBuyModalOpen(false); // Close the buy modal after submission
        setIsSuccessErrorModalOpen(true); // Open the success/error modal
      })
      .catch((error) => {
        console.error('Error purchasing stock:', error);
        setModalType('error');
        setModalMessage('An error occurred while buying the stock. Please try again.');
        setIsBuyModalOpen(false); // Close the buy modal after error
        setIsSuccessErrorModalOpen(true); // Open the success/error modal
      });
  };

  const handleCloseSuccessErrorModal = () => {
    setIsSuccessErrorModalOpen(false); // Close the success/error modal
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Crypto-Currencies</h1>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Stock Name</th>
            <th>Stock Symbol</th>
            <th>Current Price</th>
            <th>24hr %</th>
            <th>Market Cap</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={stock.image}
                  alt={`${stock.name} logo`}
                  className="crypto-logo"
                />
                {stock.name}
              </td>
              <td>{stock.id}</td>
              <td>${stock.current_price.toLocaleString()}</td>
              <td className={stock.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {stock.price_change_percentage_24h >= 0 ? '+' : ''}
                {stock.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${stock.market_cap.toFixed(2)}</td>
              <td>
                <button className="buy-btn" onClick={() => handleBuyButtonClick(stock)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for success/error */}
      <Modal
        open={isSuccessErrorModalOpen}
        onClose={handleCloseSuccessErrorModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          {modalType === 'success' ? (
            <CheckCircleIcon sx={{ fontSize: 80, color: 'green', marginBottom: 2 }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 80, color: 'red', marginBottom: 2 }} />
          )}
          <Typography id="modal-title" variant="h6" component="h2">
            {modalType === 'success' ? 'Success!' : 'Error'}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            {modalMessage}
          </Typography>
          <IconButton
            sx={{ marginTop: 2, color: modalType === 'success' ? 'green' : 'red' }}
            onClick={handleCloseSuccessErrorModal}
          >
            Close
          </IconButton>
        </Box>
      </Modal>

      {/* Buy Stock Modal */}
      {isBuyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Buy Stock</h2>
            <label htmlFor="portfolioId">Portfolio ID:</label>
            <input
              type="text"
              id="portfolioId"
              placeholder="Enter Portfolio ID"
              value={portfolioId}
              onChange={(e) => setPortfolioId(e.target.value)}
            />
            <label htmlFor="noOfShares">Number of Shares:</label>
            <input
              type="number"
              id="noOfShares"
              placeholder="Enter number of shares"
              value={noOfShares}
              onChange={(e) => setNoOfShares(e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit}>
              Confirm Purchase
            </button>
            <button className="close-btn" onClick={() => setIsBuyModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyStock;




// import React, { useState, useEffect } from 'react';
// import './BuyStock.css';
// import Navbar from '../LandingPage/Navbar';


// const BuyStock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [portfolioId, setPortfolioId] = useState('');
//   const [noOfShares, setNoOfShares] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch initial stock data (replace with actual API endpoint)
//     fetch('http://localhost:8005/auth/stock/coins')
//       .then((response) => response.json())
//       .then((data) => setStocks(data))
//       .catch((error) => console.error('Error fetching stocks:', error));
//   }, []);

//   const handleBuyButtonClick = (stock) => {
//     setSelectedStock(stock); // Store the selected stock for later use
//     setIsModalOpen(true); // Open the modal for buying
//   };

//   const handleSubmit = () => {
//     if (!portfolioId || !noOfShares || !selectedStock) {
//       alert('Please fill out all fields.');
//       return;
//     }

//     fetch(`http://localhost:8005/auth/stock/${portfolioId}/buy-stock?stockSymbol=${selectedStock.id}&noOfShares=${noOfShares}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert('Stock purchased successfully!');
//           setIsModalOpen(false); // Close modal
//           setPortfolioId('');
//           setNoOfShares('');
//         } else {
//           alert('Failed to buy stock. Please try again.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error purchasing stock:', error);
//         alert('An error occurred while buying the stock.');
//       });
//   };

//   return (
//     <div className="container">
//       <Navbar />
//       <h1>Crypto-Currencies</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Stock Name</th>
//             <th>Stock Symbol</th>
//             <th>Current Price</th>
//             <th>24hr %</th>
//             <th>Market Cap</th>
//             <th>Buy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stocks.map((stock, index) => (
//             <tr key={stock.id}>
//               <td>{index + 1}</td>
//               <td>
//                 <img
//                   src={stock.image}
//                   alt={`${stock.name} logo`}
//                   className="crypto-logo"
//                 />
//                 {stock.name}
//               </td>
//               <td>{stock.id}</td>
//               <td>${stock.current_price.toLocaleString()}</td>
//               <td className={stock.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
//                 {stock.price_change_percentage_24h >= 0 ? '+' : ''}
//                 {stock.price_change_percentage_24h.toFixed(2)}%
//               </td>
//               <td>${stock.market_cap.toFixed(2)}</td>
//               <td>
//                 <button className="buy-btn" onClick={() => handleBuyButtonClick(stock)}>
//                   Buy
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Buy Stock</h2>
//             <label htmlFor="portfolioId">Portfolio ID:</label>
//             <input
//               type="text"
//               id="portfolioId"
//               placeholder="Enter Portfolio ID"
//               value={portfolioId}
//               onChange={(e) => setPortfolioId(e.target.value)}
//             />
//             <label htmlFor="noOfShares">Number of Shares:</label>
//             <input
//               type="number"
//               id="noOfShares"
//               placeholder="Enter number of shares"
//               value={noOfShares}
//               onChange={(e) => setNoOfShares(e.target.value)}
//             />
//             <button className="submit-btn" onClick={handleSubmit}>
//               Confirm Purchase
//             </button>
//             <button className="close-btn" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyStock;

