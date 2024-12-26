import React, { useState } from 'react';
import './Learn.css';
import Navbar from '../LandingPage/Navbar';

// Videos array with actual YouTube links and thumbnails
const videos = {
  crypto: [
    {
      title: 'Top cryptos to hold in 2025',
      thumbnail: 'https://i.ytimg.com/vi/yFLr-HE9YyI/maxresdefault.jpg',
      link: 'https://www.youtube.com/shorts/WIsgjUH1CMo',
    },
    {
      title: 'Most Humble Crypto Billionaire #267',
      thumbnail: 'https://miro.medium.com/v2/resize:fit:489/1*VrzY_4Or4ikDqs8E1PSV8w.jpeg',
      link: 'https://www.youtube.com/watch?v=W0vEdn2jwyI',
    },
    {
      title: 'Top 3 richest men in crypto',
      thumbnail: 'https://i.ytimg.com/vi/HZ2yqmM9bdA/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=CFdTXuNWrcI',
    },
  ],
  stocks: [
    {
      title: 'Stock Market Basics',
      thumbnail: 'https://i.ytimg.com/vi/uMTdM4lu7FA/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=by9_zHQzeZk',
    },
    {
      title: 'Top 5 stocks for 2024',
      thumbnail: 'https://i.ytimg.com/vi/1HbYMVO9sAI/maxresdefault.jpg',
      link: 'https://www.youtube.com/shorts/zhHmn0h3KW0',
    },
    {
      title: 'How to invest in the S&P 500',
      thumbnail: 'https://cdn.corporatefinanceinstitute.com/assets/invest-in-the-sp-500-index.jpeg',
      link: 'https://www.youtube.com/watch?v=Nmzb_kyy-zs',
    },
  ],
  NFTs: [
    {
      title: 'introduction to NFS',
      thumbnail: 'https://th.bing.com/th/id/OIP.EXvqOBU5Ce_QAtALX0YQMAHaFj?rs=1&pid=ImgDetMain',
      link: 'https://www.youtube.com/watch?v=tnZOuxGzMyw',
    },
    {
      title: 'How to keep your nfs safe',
      thumbnail: 'https://th.bing.com/th/id/OIP.ZsY0p2uRswvbLOxMYvQ1fAHaE8?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      link: 'https://www.youtube.com/watch?v=3UMPUEkTjhYS',
    },
    {
      title: 'improve your nfs',
      thumbnail: 'https://th.bing.com/th/id/OIP.QHaySdTgNXj3hnUwZGbvSgHaEK?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      link: 'https://www.youtube.com/watch?v=q2cT_jMup_w',
    },
  ],
  bitcoin: [
    {
      title: 'what is Bitcoin',
      thumbnail: 'https://th.bing.com/th/id/R.4077e337bac40b4e403a6ac336ac44b5?rik=uJ8OajioCe%2b%2b5g&riu=http%3a%2f%2ftech.eu%2fwp-content%2fuploads%2f2014%2f04%2fbitcoin.jpg&ehk=ON6Qtu9zJQwNIkoWtVz%2fy2pkZ8bITim2azHWPWkyoY4%3d&risl=&pid=ImgRaw&r=0',
      link: 'https://www.youtube.com/watch?v=kKn_QsdGZQM',
    },
    {
      title: 'How the value of bit coin changed over time',
      thumbnail: 'https://www.the-sun.com/wp-content/uploads/sites/6/2021/05/VP-GRAPH-BITCOIN.jpg?w=1500',
      link: 'https://www.youtube.com/watch?v=cxrffRNJNKM',
    },
    {
      title: 'Bitcoin trading',
      thumbnail: 'https://th.bing.com/th/id/OIP.gxAFR53VVsu63cwMP7nWaAHaE8?rs=1&pid=ImgDetMain',
      link: 'https://www.youtube.com/watch?v=q2cT_jMup_w',
    },
  ],
  Trading: [
    {
      title: 'Trading',
      thumbnail: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL29ubGluZS10cmFkaW5nLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19',
      link: 'https://www.youtube.com/watch?v=WY2-Sn4L-XU&t=2s',
    },
    {
      title: 'Trading Screen',
      thumbnail: 'https://th.bing.com/th/id/OIP.pABQqkr1reRXS-36WUHeGQAAAA?rs=1&pid=ImgDetMain',
      link: 'https://www.youtube.com/watch?v=nW_0Nn-w7WI',
    },
    {
      title: 'Top 3 richest men in crypto',
      thumbnail: 'https://cdn.cloudflare.steamstatic.com/steam/apps/955070/ss_5edc4378cf875465ff23df1974260ec8ee9f5444.1920x1080.jpg?t=1556340488',
      link: 'https://www.youtube.com/watch?v=3UMPUEkTjhYS',
    },
  ],

};

const articles = {
  crypto: [
    { title: 'The Future of Cryptocurrency', link: 'https://economictimes.indiatimes.com/markets/cryptocurrency/the-future-of-crypto-top-trends-for-2024/articleshow/105717702.cms' },
    { title: 'Understanding Blockchain', link: 'https://alison.com/course/fundamentals-of-blockchain-and-bitcoin?utm_source=bing&utm_medium=cpc&utm_campaign=531498933&utm_content=1357899397970729&utm_term=kwd-84869877409174:loc-90&msclkid=4522d3317def1740f0c0b463c1dd9bb8' },
    { title: 'Top 10 Cryptos to Watch', link: 'https://economictimes.indiatimes.com/wealth/invest/top-10-cryptos-to-watch-as-the-market-hints-at-a-supercycle/articleshow/115419037.cms?from=mdr' },
  ],
  stocks: [
    { title: 'Stock Market Trends 2024', link: 'https://tradingeconomics.com/united-states/stock-market' },
    { title: 'How to Start Investing', link: 'https://www.investopedia.com/articles/basics/06/invest1000.asp' },
    { title: 'Understanding Stock Dividends', link: 'https://www.investopedia.com/terms/s/stockdividend.asp' },
  ],
  NFTs: [
    { title: 'The Future of Cryptocurrency', link: 'https://www.angelone.in/knowledge-center/cryptocurrency/future-of-cryptocurrency' },
    { title: 'Understanding Blockchain', link: 'https://www.investopedia.com/terms/b/blockchain.asp' },
    { title: 'Top 10 Cryptos to Watch', link: 'https://www.investopedia.com/terms/s/stockdividend.asp' },
  ],
  bitcoin: [
    { title: 'Stock Market Trends 2024', link: 'https://tradingeconomics.com/united-states/stock-market' },
    { title: 'How to Start Investing', link: 'https://www.investopedia.com/articles/basics/06/invest1000.asp' },
    { title: 'Understanding Stock Dividends', link: 'https://www.investopedia.com/articles/basics/06/invest1000.asp' },
  ],
  Trading: [
    { title: 'Stock Market Trends 2024', link: 'https://www.ameriprise.com/financial-news-research/insights/q4-2024-market-outlook' },
    { title: 'How to Start Investing', link: 'https://www.investopedia.com/terms/s/stockdividend.asp' },
    { title: 'Understanding Stock Dividends', link: 'https://www.angelone.in/knowledge-center/cryptocurrency/future-of-cryptocurrency' },
  ],
};



const categories = ['crypto', 'stocks', 'NFTs', 'bitcoin', 'Trading'];

const Learn = ({ initialCategory = 'crypto' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const fallbackMessage = "Select a category to view relevant content.";

  return (
    <div className="learn-page">
      <Navbar />
      <div className="learn-header">
        <div className="learn-text">
          <h1>Learn</h1>
          <p>Learn about the latest trends in cryptocurrency.</p>
        </div>
        <div className="learn-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/683/055/non_2x/stock-market-or-forex-trading-graph-in-graphic-concept.jpg"
            alt="Learn Illustration"
          />
        </div>
      </div>

      <div className="filters">
        {categories.map((category) => (
          <label key={category} className="filter-option">
            <input
              type="radio"
              checked={selectedCategory === category}
              onChange={() => handleFilterClick(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="recent-articles">
        <h2>Recent Articles</h2>
        {articles[selectedCategory]?.length > 0 ? (
          <ul>
            {articles[selectedCategory].map((article, index) => (
              <li key={index}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>{fallbackMessage}</p>
        )}
      </div>

      <div className="video-section">
        <h2>Top Videos</h2>
        <div className="video-list">
          {(videos[selectedCategory] || []).map((video, index) => (
            <div key={index} className="video-card">
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <img src={video.thumbnail} alt={video.title} />
                <p>{video.title}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;