import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import "./MarketChart.css"; // Import CSS file

const MarketChart = () => {
  const [coinId, setCoinId] = useState("bitcoin"); // Default to Bitcoin
  const [days, setDays] = useState(30); // Default to 30 days
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch market chart data
  useEffect(() => {
    const fetchMarketChart = async () => {
      try {
        const response = await axios.get(`http://localhost:8005/auth/coins/${coinId}/chart`, {
          params: { days },
        });
        const data = response.data;

        // Format the data
        const prices = data.prices.map(item => ({
          x: new Date(item[0]), // Convert timestamp to Date
          y: item[1], // The stock price
        }));

        setChartData(prices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchMarketChart();
  }, [coinId, days]);

  // Configure the chart options
  const chartOptions = {
    chart: {
      height: "100%",
      type: "line",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    stroke: {
      width: 3,
      curve: "smooth", // Smooth line curve
    },
    title: {
      text: `${coinId.charAt(0).toUpperCase() + coinId.slice(1)} Market Price`,
      align: "left",
      style: {
        fontSize: "20px",
        color: "#333",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#777",
        },
      },
    },
    yaxis: {
      title: {
        text: "Price (USD)",
      },
      labels: {
        style: {
          colors: "#777",
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) => `$${value.toFixed(2)}`,
      },
    },
    colors: ["#00bcd4"], // Line color
  };

  return (
    <div className="chart-container">
      <h1>Market Chart</h1>

      {/* Coin Selection */}
      <select onChange={(e) => setCoinId(e.target.value)} value={coinId}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="litecoin">Litecoin</option>
        <option value="tether">Tether</option>
        <option value="binancecoin">BNB</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="ripple">XRP</option>
        <option value="solana">Solana</option>

        {/* Add more coins here */}
      </select>

      {/* Days Selection */}
      <select onChange={(e) => setDays(Number(e.target.value))} value={days}>
        <option value={7}>7 Days</option>
        <option value={30}>30 Days</option>
        <option value={90}>90 Days</option>
        <option value={180}>180 Days</option>
      </select>

      {/* Render the MarketChart component */}
      <div className="chart-wrapper">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ApexCharts
            options={chartOptions}
            series={[
              {
                name: "Price",
                data: chartData,
              },
            ]}
            type="line"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default MarketChart;
