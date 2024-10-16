import React, { useState } from "react";

const TNC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!isOpen) {
    return <span onClick={openModal}>Terms and Conditions</span>;
  }

  return (
    <div className="mt-16" onClick={closeModal} style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <button onClick={closeModal} style={styles.closeButton}>
            ✕
          </button>
        </div>
        <div style={styles.modalBody}>
          <h1 className="text-center" style={styles.heading}>Terms and Conditions</h1>

          <p className="text-center"  style={styles.italic}>Welcome to Bustify!</p>
           
          <div>
          <h2 style={styles.subheading}> 1. Business Policy</h2>
          <p>
            Welcome to Bustify.in! By accessing or using our website, making a
            booking, or engaging with any of our services, you agree to comply
            with and be bound by the following Terms and Conditions. These Terms
            outline your rights and obligations when using our platform or
            services. Please read them carefully.
          </p>
          <br />
          <p>
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions, as
            well as any additional terms or policies that may apply to specific
            sections of our website or services. If you do not agree with these
            terms, please refrain from using our platform.
          </p>

          <h2 style={styles.subheading}>2. Company Information</h2>
          <ul>
            <li>Business Name: Bustify.in</li>
            <li>
              Location: Near GLA University, Mathura, Mathura, UTTAR PRADESH
              281406
            </li>
            <li>
              Primary Service: We offer bus transportation services for students
              who need to travel to off-campus exam locations. Our services are
              provided based on bookings made through our website.
            </li>
            <li>
              Support: If you require assistance, you can contact us via phone
              at 7417582399 or email at bustify.in@gmail.com.
            </li>
          </ul>

          <h2 style={styles.subheading}>3. Eligibility</h2>
          <p>
            To use our website and book our services, you must be at least 18
            years of age and capable of forming a legally binding contract. By
            booking a service on Bustify.in, you represent that you meet these
            requirements. If you are under 18, you may use the service only with
            the involvement of a parent or legal guardian who agrees to be bound
            by these Terms and Conditions.
          </p>

          <h2 style={styles.subheading}>4. Scope of Services</h2>
          <p>
            Bustify.in provides bus services for students who need to travel to
            external exam centers. Our service includes the transportation of
            students between designated locations and the exam center. The exact
            schedule, route, and timings will be made available during the
            booking process. It is the responsibility of the customer to review
            the service details, including pick-up and drop-off points, and
            ensure that they are available at the specified times.
          </p>
          <br />
          <p>
            Please note that our services are only available for specific routes
            and dates. We reserve the right to modify, alter, or discontinue any
            part of our services at any time without prior notice.
          </p>

          <h2 style={styles.subheading}>5. Bookings</h2>
          <h3>5.1 Booking Process</h3>
          <ul style={styles.list}>
            <p>
              To book a seat on one of our buses, you must complete the booking
              process on our website. You are required to provide accurate and
              complete information during the booking process, including your
              name, contact information, and any other details requested. Once
              your booking is complete, you will receive a confirmation email or
              SMS with your booking details. It is your responsibility to review
              these details carefully.
            </p>
          </ul>
          <h3>5.2 Booking Confirmation</h3>
          <ul style={styles.list}>
            <li>
              Booking a seat on our bus service is subject to availability. You
              will receive a booking confirmation once your payment has been
              successfully processed. If for any reason we are unable to fulfill
              your booking request, we will notify you promptly and provide
              alternative options or a full refund if applicable.
            </li>
          </ul>
          <h3>5.3 Responsibility for Information</h3>
          <ul style={styles.list}>
            <li>
              The customer is responsible for ensuring that the information
              provided during the booking process is accurate. Any errors in the
              provided information (such as incorrect names, dates, or
              locations) may result in delays or the inability to use our
              service, and we shall not be held liable in such cases.
            </li>
          </ul>
          <h2 style={styles.subheading}>6. Payment Terms</h2>
          <p>
            All payments must be made in full at the time of booking. We accept
            payments via various methods such as credit cards, debit cards, and
            other available payment gateways. By providing payment information,
            you represent and warrant that you have the legal right to use the
            selected payment method and that the information you provide is
            true, accurate, and complete.
          </p>
          <h3>6.1 Payment Authorization</h3>
          <ul style={styles.list}>
            <li>
              By submitting payment information, you authorize Bustify.in to
              charge the applicable fees to your payment method. You acknowledge
              that additional fees, such as processing fees, may apply depending
              on your payment method or financial institution.
            </li>
          </ul>
          <h3>6.2 Failure of Payment</h3>
          <ul style={styles.list}>
            <li>
              In the event that your payment is not successful, we will notify
              you immediately, and your booking will not be confirmed. You will
              need to retry the payment or use an alternate payment method.
              Failure to provide timely payment may result in the cancellation
              of your booking.
            </li>
          </ul>
          <h2 style={styles.subheading}>7. Pricing and Fees</h2>
          <p>
            Prices for our services are displayed on our website and are subject
            to change without prior notice. All prices are in INR unless
            otherwise stated. Bustify.in reserves the right to modify, update, or
            revise prices at any time. We will make reasonable efforts to notify
            customers of any significant price changes. However, once a booking
            is confirmed and paid for, the price will not be subject to change
            for that booking.
          </p>

          <h2 style={styles.subheading}>8. Cancellation and Refund Policy</h2>
          <p>
            At Bustify.in, we strive to ensure a smooth and hassle-free booking
            experience. However, we understand that plans may change, and you
            may need to cancel your booking.
          </p>
          <br />
          <h3>8.1 Cancellation</h3>
          <ul style={styles.list}>
            <li>
              <strong>Cancellation Request Time:</strong> Cancellations must be
              made at least 2 days before the scheduled bus service.
              Cancellation requests can be submitted via email
              (bustify.in@gmail.com) or by calling our support number
              (7417582399). Cancellation requests made within the 2-day period
              before the scheduled service will not be eligible for a refund.
            </li>
            <li>
              <strong>Non-Refundable Bookings:</strong> Some bookings may be
              labeled as "Non-refundable." In such cases, cancellations will not
              be accepted, and no refunds will be issued.
            </li>
          </ul>
          <h3>8.2 Refunds</h3>
          <ul style={styles.list}>
            <li>
              <strong>Eligibility for Refund:</strong> Refunds will only be
              provided for bookings canceled within the allowable 2-day period.
              Cancellations made after this time will not be eligible for a
              refund. If you are eligible for a refund, it will be processed
              within 6-8 business days from the date of your cancellation
              request.
            </li>
            <li>
              <strong>Refund Method:</strong> Refunds will be issued to the
              original payment method used during the booking process. We are
              not responsible for delays caused by the payment gateway or your
              bank.
            </li>
            <li>
              <strong>Processing Time:</strong> Please allow 6-8 business days
              for refunds to be processed and reflected in your account.
            </li>
          </ul>
          <h3>8.3 Changes to Bookings</h3>
          <ul style={styles.list}>
            <li>
              If you wish to change the details of your booking (such as the
              date or time), you may contact us at least 2 days before the
              scheduled service. We will make reasonable efforts to accommodate
              your request, subject to availability. However, we do not
              guarantee that changes will be possible, and in some cases, a new
              booking may be required.
            </li>
          </ul>
          <h2 style={styles.subheading}>9. Shipping and Delivery</h2>
          <h3>9.1 Delivery of Services</h3>
          <ul style={styles.list}>
            <li>
              Since Bustify.in provides bus transportation services, there is no
              physical product or item to ship. However, the delivery of our
              service occurs when the bus service is provided at the scheduled
              time and location as per your booking.
            </li>
          </ul>
          <h3>9.2 Service Timeline</h3>
          <ul style={styles.list}>
            <li>
              Our services are available based on the booking details provided
              during the purchase process. The service timeline is typically 0-7
              days depending on the exam date and the availability of buses for
              the requested service. We aim to ensure that all services are
              delivered promptly and in accordance with the booking.
            </li>
          </ul>
          <h3>9.3 Delays and Cancellations by Bustify.in</h3>
          <ul style={styles.list}>
            <li>
              In rare instances, due to unforeseen circumstances such as weather
              conditions, road closures, or mechanical issues, the scheduled
              service may be delayed or canceled. In such cases, we will notify
              customers as soon as possible and either provide alternative
              arrangements or issue a full refund if the service cannot be
              rescheduled.
            </li>
          </ul>
          <h2 style={styles.subheading}>10. Liability</h2>
          <h3>10.1 Limitation of Liability</h3>
          <ul style={styles.list}>
            <li>
              Bustify.in, its directors, employees, agents, and affiliates shall
              not be liable for any direct, indirect, incidental, special, or
              consequential damages arising from or in connection with the use
              of our services or website. This includes, but is not limited to,
              loss of profits, data, or other intangible losses resulting from
              the use or inability to use our services.
            </li>
          </ul>
          <h3>10.2 Force Majeure</h3>
          <ul style={styles.list}>
            <li>
              Bustify.in shall not be liable for any delay or failure to provide
              services resulting from events beyond our reasonable control,
              including but not limited to acts of God, war, terrorism, riots,
              embargoes, labor disputes, or governmental restrictions.
            </li>
          </ul>
          <h2 style={styles.subheading}>11. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India. Any disputes arising from or
            related to these Terms shall be subject to the exclusive
            jurisdiction of the courts located in Mathura, India.
          </p>

          <h2 style={styles.subheading}>12. Changes to Terms and Conditions</h2>
          <p>
            We reserve the right to modify, update, or change these Terms and
            Conditions at any time. Any changes will be effective immediately
            upon posting on our website. Your continued use of our services
            after any modifications to these Terms signifies your acceptance of
            the updated Terms and Conditions.
          </p>

          <h2 style={styles.subheading}>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or complaints regarding these
            Terms and Conditions or our services, please feel free to contact
            us:
          </p>
          <ul style={styles.list}>
            <li>Phone: 7417582399</li>
            <li>Email: bustify.in@gmail.com</li>
          </ul>
        </div>

          <h2 style={styles.subheading}>Refund Policy</h2>
          <p>
            Thank you for using our services at Bustify. We are committed to
            providing a great experience for our customers. However, if a
            cancellation occurs, our refund policy will apply.
          </p>

          <ul style={styles.list}>
            <li>
              We update the ticket status every 5-10 hours to keep you informed
              about any changes. Please check seat status details regularly.
            </li>
            <li>
              If you have a waiting ticket and wish to cancel it, we charge a
              fee of 40% of the ticket price as cancellation charges.
            </li>
            <li>
              If you have a confirmed ticket and wish to cancel it, we charge a
              fee of 60% of the ticket price as cancellation charges.
            </li>
            <li>
              In case you wish to get an instant refund, we charge an additional
              5% of the ticket price as a processing fee.
            </li>
            <li>
              If you wish to cancel your ticket, you can do so before 24 hours
              of the departure time. In such a case, we will process your refund
              after deducting the applicable cancellation charges.
            </li>
          </ul>

          <p>
            Please note that the refund will be credited back to the same
            account from which the payment was made, and it may take up to 5-7
            business days for the refund to reflect in your account.
          </p>

          <h2 style={styles.subheading}>General Terms & Conditions</h2>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of Bustify's Website, located at www.bustify.in.
          </p>

          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use www.bustify.in if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 style={styles.subheading}>Cookies</h2>
          <p>
            We employ the use of cookies. By accessing www.bustify.in, you
            agreed to use cookies in agreement with the Bustify's Privacy
            Policy.
          </p>
        </div>

      
        <div style={styles.modalFooter}>
          <button onClick={closeModal} style={styles.button}>
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "80%",
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  modalBody: {
    marginBottom: "20px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },
  heading: {
    fontSize: "28px",
    color: "#1a365d",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "22px",
    color: "#1a365d",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginTop: "30px",
    marginBottom: "15px",
  },
  italic: {
    fontStyle: "italic",
    color: "#555",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "15px",
  },
};

export default TNC;