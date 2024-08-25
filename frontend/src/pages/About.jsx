import React from 'react';
import '../styles/About.css';
import NavBar from '../components/NavBar';

const About = () => {
    return (
        <div className="about-page">
            <NavBar />
        <div className="about-container">
            <h1>About Zen Recovery</h1>
            <p>
                Welcome to Zen Recovery! We are dedicated to providing high-quality massage and recovery products to help you relax, rejuvenate, and recover. Our mission is to bring you closer to a balanced and harmonious lifestyle by offering products that promote wellness and tranquility.
            </p>
            <h2>Our Story</h2>
            <p>
                Zen Recovery was founded with the belief that everyone deserves a moment of peace and relaxation in their busy lives. We understand the importance of self-care and strive to make it accessible to everyone. Our products are carefully curated and tested to ensure they meet our high standards of quality and effectiveness.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
                <li>High-quality, carefully selected products</li>
                <li>Commitment to customer satisfaction</li>
                <li>Fast and reliable shipping</li>
                <li>Dedicated customer support</li>
            </ul>
            <p>
                Thank you for choosing Zen Recovery. We look forward to helping you on your journey to wellness and relaxation.
            </p>
        </div>
    </div>
    );
};

export default About;
