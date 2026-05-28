import React from 'react'
import "../styles/Home.scss";
import { useNavigate } from 'react-router';

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="home">

  {/* HERO */}

  <section className="hero">

    <div className="hero__content">

      <div className="hero__badge">

        AI-Powered Voice Intelligence

      </div>

      <h1>

        Turn Customer Voices Into
        Actionable Business Insights

      </h1>

      <p>

        Collect voice feedback through QR codes,
        analyze customer sentiment using AI,
        and uncover insights that help businesses improve faster.

      </p>

      <div className="hero__actions">

        <button onClick={()=>navigate("/register")} className="hero__primary">

          Get Started

        </button>

        <button onClick={()=>navigate("/login")}  className="hero__secondary">

          Login

        </button>

      </div>

    </div>

    <div className="hero__visual">

      <div className="hero-card">

        <div className="hero-card__top">

          <span>AI Summary</span>

        </div>

        <h3>

          Customers love the food quality,
          but delivery delays are reducing satisfaction.

        </h3>

        <div className="hero-card__metrics">

          <div>

            <h4>84%</h4>

            <p>Positive</p>

          </div>

          <div>

            <h4>124</h4>

            <p>Responses</p>

          </div>

          <div>

            <h4>12</h4>

            <p>Issues</p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* FEATURES */}

  <section className="features">

    <div className="section-header">

      <h2>

        Everything Businesses Need

      </h2>

      <p>

        From feedback collection to AI-driven insights.

      </p>

    </div>

    <div className="features__grid">

      <div className="feature-card">

        <div className="feature-card__icon">

          🎤

        </div>

        <h3>

          Voice Feedback

        </h3>

        <p>

          Customers simply scan and speak —
          no forms or typing needed.

        </p>

      </div>

      <div className="feature-card">

        <div className="feature-card__icon">

          🤖

        </div>

        <h3>

          AI Analysis

        </h3>

        <p>

          Automatically detect sentiment,
          issues, trends, and recommendations.

        </p>

      </div>

      <div className="feature-card">

        <div className="feature-card__icon">

          📊

        </div>

        <h3>

          Smart Dashboard

        </h3>

        <p>

          View insights, customer pain points,
          and business intelligence in one place.

        </p>

      </div>

    </div>

  </section>

  {/* WORKFLOW */}

  <section className="workflow">

    <div className="section-header">

      <h2>

        How It Works

      </h2>

    </div>

    <div className="workflow__steps">

      <div className="step">

        <span>01</span>

        <h3>Create Campaign</h3>

        <p>

          Businesses create feedback campaigns
          and generate QR codes.

        </p>

      </div>

      <div className="step">

        <span>02</span>

        <h3>Collect Voice Feedback</h3>

        <p>

          Customers scan the QR and record
          their voice feedback instantly.

        </p>

      </div>

      <div className="step">

        <span>03</span>

        <h3>AI Generates Insights</h3>

        <p>

          AI analyzes sentiment, identifies trends,
          and generates recommendations.

        </p>

      </div>

    </div>

  </section>

</div>
  )
}

export default Home