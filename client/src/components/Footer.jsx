import React from 'react';
import logo from "../images/logo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TNC from './TNC';

const Footer = () => {
  const MySwal = withReactContent(Swal);

  const showTermsAndConditions = () => {
    MySwal.fire({
      title: 'Business Policy',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Terms and Conditions</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h1 style="color: #1a365d;  font-size: 2.5em; margin-bottom: 30px;">Terms and Conditions</h1>
          
          <p style="font-style: italic; color: #555;">Welcome to Bustify!</p>
  
          <h2 style="color: #1a365d; font-size: 1.8em; margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Refund Policy</h2>
          <p>Thank you for using our services at Bustify. We are committed to providing a great experience for our customers. However, if a cancellation occurs, our refund policy will apply.</p>
          
          <ul style="padding-left: 20px;">
            <li>We update the ticket status every 5-10 hours to keep you informed about any changes. Please check seat status details regularly.</li>
            <li>If you have a waiting ticket and wish to cancel it, we charge a fee of 40% of the ticket price as cancellation charges.</li>
            <li>If you have a confirmed ticket and wish to cancel it, we charge a fee of 60% of the ticket price as cancellation charges.</li>
            <li>In case you wish to get an instant refund, we charge an additional 5% of the ticket price as a processing fee.</li>
            <li>If you wish to cancel your ticket, you can do so before 24 hours of the departure time. In such a case, we will process your refund after deducting the applicable cancellation charges.</li>
          </ul>
  
          <p>Please note that the refund will be credited back to the same account from which the payment was made, and it may take up to 5-7 business days for the refund to reflect in your account.</p>
  
          <h2 style="color: #1a365d; font-size: 1.8em; margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">General Terms & Conditions</h2>
          <p>These terms and conditions outline the rules and regulations for the use of Bustify's Website, located at www.bustify.in.</p>
          
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use www.bustify.in if you do not agree to take all of the terms and conditions stated on this page.</p>
  
          <h2 style="color: #1a365d; font-size: 1.8em; margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Cookies</h2>
          <p>We employ the use of cookies. By accessing www.bustify.in, you agreed to use cookies in agreement with the Bustify's Privacy Policy.</p>
  
          <h2 style="color: #1a365d; font-size: 1.8em; margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">License</h2>
          <p>Unless otherwise stated, Bustify and/or its licensors own the intellectual property rights for all material on www.bustify.in. All intellectual property rights are reserved.</p>
          
          <p>You must not:</p>
          <ul style="padding-left: 20px;">
            <li>Republish material from www.bustify.in</li>
            <li>Sell, rent or sub-license material from www.bustify.in</li>
            <li>Reproduce, duplicate or copy material from www.bustify.in</li>
            <li>Redistribute content from www.bustify.in</li>
          </ul>
  
          <h2 style="color: #1a365d; font-size: 1.8em; margin-top: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Hyperlinking to our Content</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul style="padding-left: 20px;">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>
        </body>
        </html>
      `,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'I Agree',
      width: '100%'
    });
  };
  
  
  return (
    <footer className="text-white body-font h-full ">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a
          href="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-white"
        >
          <img src={logo} width="200px"  alt="Bustify Logo" className="h-12" />
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 COPYRIGHT BUSTIFY -
          <a
            href="#"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @bustify
          </a>
        </p> 
        <br />
        <span 
          className='text-blue-900 font-medium ml-4 cursor-pointer'
          >
          <TNC />
        </span>.
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="#" className="text-gray-500" aria-label="Facebook">
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a href="#" className="ml-3 text-gray-500" aria-label="Twitter">
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a href="#" className="ml-3 text-gray-500" aria-label="Instagram">
            <svg
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a href="#" className="ml-3 text-gray-500" aria-label="LinkedIn">
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM6 3a3 3 0 00-3 3v14h4V6a3 3 0 00-3-3zM4 0h4v4H4z"></path>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
