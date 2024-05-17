import React from 'react';
import styles from './Contact.module.css'; // Import the CSS module

function Contact() {
  return (
    <div className={styles.Contact}> {/* Use the class name from the CSS module */}
      <div className={styles.title}>
        <h2>Get in Touch</h2>
      </div>
      <div className={styles.box}>
        <div className={`${styles.contact} ${styles.form}`}> {/* Combine multiple classes using template literals */}
          <h3>Send a Message</h3>
          <form>
            <div className={styles.formBox}>
              <div className={styles.row50}>
                <div className={styles.inputBox}>
                  <span>First Name</span>
                  <input type="text" placeholder="Jhon" />
                </div>
                <div className={styles.inputBox}>
                  <span>Last Name</span>
                  <input type="text" placeholder="Doe" />
                </div>
              </div>
              <div className={styles.row50}>
                <div className={styles.inputBox}>
                  <span>Email</span>
                  <input type="text" placeholder="Jhondoe@email.com" />
                </div>
                <div className={styles.inputBox}>
                  <span>Phone</span>
                  <input type="text" placeholder="+0 1204280170" />
                </div>
              </div>
              <div className={styles.row100}>
                <div className={styles.inputBox}>
                  <span>Message</span>
                  <textarea placeholder="Write your message here..."></textarea>
                </div>
              </div>
              <div className={styles.row100}>
                <div className={styles.inputBox}>
                  <input type="submit" value="Send" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={`${styles.contact} ${styles.info}`}> {/* Combine multiple classes using template literals */}
          <h3>Contact Info</h3>
          <div className={styles.infoBox}>
            <div>
              <span><ion-icon name="location"></ion-icon></span>
              <p>The headquarters and main factory are located in Zuffenhausen, a district in Stuttgart-Germany</p>
            </div>
            <div>
              <span><ion-icon name="mail"></ion-icon></span>
              <a href="https://www.porsche.com/china/en/dialogue/contactandinformation/contactpag/porscheag/">contact@porsche.de</a>
            </div>
            <div>
              <span><ion-icon name="call"></ion-icon></span>
              <a href="telephone:+49 (0) 711/ 911 - 0">+49 (0) 711/ 911 - 0</a>
            </div>
            <ul className={styles.sci}>
              <li><a href="https://www.instagram.com/porsche?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><ion-icon name="logo-instagram"></ion-icon></a></li>
              <li><a href="https://www.facebook.com/porsche"><ion-icon name="logo-facebook"></ion-icon></a></li>
              <li><a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.twitter.com%2Fporsche%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR3BcwXTIrReI4xYZo_arhrjYLUjmX2m0vYPHa9EJXpSkGQ0-AzcucCxeg0_aem_AaDkSF9LKEDQTm96WJIzLUxO9LJhU9hMVqH3XfRgh5BVJ1cOa2K4tiMiethpwxYk-wdzkpHh56Tu1qRwpwQNQsNx&h=AT1EysJsjdVoGR3SrfTbUjx9YHjVqwDwDIFaAiBeFi-DaV1g1Cm3tZngWT5TN8sA7PyeHZ_0o4yrhkuMKZ7S8RvqDbdM7gvC7qXvcAXlcOxsdOwa-DX3VePae3x3TJUFNX1AIA"><ion-icon name="logo-twitter"></ion-icon></a></li>
              <li><a href="#"><ion-icon name="logo-youtube"></ion-icon></a></li>
            </ul>
          </div>
        </div>
        <div className={`${styles.contact} ${styles.map}`}> {/* Combine multiple classes using template literals */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.2159565816305!2d9.149396040573238!3d48.8350193024707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799da8737eb48a5%3A0x4191aae7c5f824f8!2sPorscheplatz%2C%2070435%20Zuffenhausen%2C%20Germany!5e0!3m2!1sen!2seg!4v1715354351150!5m2!1sen!2seg" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
