import React from 'react';
import './ContactForm.css';

const ContactForm = () => (
    <section className="contact">
        <h2>Contact Us</h2>
        <form>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Jiara Martins" required />
            
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="hello@reallygreatsite.com" required />
            
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message here" required></textarea>
            
            <button type="submit">Send the message</button>
        </form>
    </section>
);

export default ContactForm;