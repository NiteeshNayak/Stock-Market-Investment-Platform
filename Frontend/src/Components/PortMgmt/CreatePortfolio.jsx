import React, { useState } from 'react';
import './CreatePortfolio.css';
import { useLocation } from 'react-router-dom';

const CreatePortfolio = ({ onPortfolioCreated }) => {
  const [portfolioName, setPortfolioName] = useState('');
  const [investmentAgenda, setInvestmentAgenda] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  if (!userId) {
    console.error("userId is missing or invalid");
    return <div>Error: userId is missing</div>;
  }
  const handleSave = async () => {
    if (!portfolioName || !investmentAgenda) {
      setErrorMessage('Please fill out both fields.');
      return;
    }
    if (!userId || isNaN(userId)) {
      setErrorMessage('Invalid user ID.');
      return;
    }
    try {
      const portfolioData = {
        portfolioName,
        investmentAgenda,
      };

      console.log('Sending portfolio data:', portfolioData); // Log the data being sent

      const response = await fetch(`http://localhost:8005/auth/portfolios/add/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData),
      });

      console.log('Response status:', response.status); // Log the response status
      const responseData = await response.json(); // Assuming the response is in JSON format
      console.log('Response data:', responseData); // Log the response data

      if (response.ok) {
        alert('Portfolio created successfully!');
        if (onPortfolioCreated) onPortfolioCreated();
        window.location.href = '/portfolio'; // Redirect to My Portfolios
      } else {
        setErrorMessage('Failed to create portfolio. Please try again.');
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };



  const handleCancel = () => {
    window.location.href = '/portfolio'; // Redirect to My Portfolios
  };

  return (
    <div className="create-portfolio-container">
      <h2>Create Portfolio</h2>
      <div className="form-group">
        <label htmlFor="portfolioName">Portfolio Name</label>
        <input
          type="text"
          id="portfolioName"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          placeholder="Enter portfolio name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="investmentAgenda">Investment Agenda</label>
        <textarea
          id="investmentAgenda"
          value={investmentAgenda}
          onChange={(e) => setInvestmentAgenda(e.target.value)}
          placeholder="Enter a brief description of your investment strategy"
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button className="btn save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePortfolio;