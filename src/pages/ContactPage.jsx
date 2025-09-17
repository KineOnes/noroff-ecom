import buttonStyles from "../components/Button.module.css";
import { useState, useMemo } from "react";
import styles from "./ContactPage.module.css";



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [values, setValues] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    subject: false,
    email: false,
    body: false,
  });

  const errors = useMemo(() => {
    const e = {};
    if (!values.fullName || values.fullName.trim().length < 3) {
      e.fullName = "Full name must be at least 3 characters.";
    }
    if (!values.subject || values.subject.trim().length < 3) {
      e.subject = "Subject must be at least 3 characters.";
    }
    if (!values.email || !emailRegex.test(values.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!values.body || values.body.trim().length < 3) {
      e.body = "Message must be at least 3 characters.";
    }
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ fullName: true, subject: true, email: true, body: true });

    if (!isValid) return;

    console.log("Contact form submitted:", values);

    alert("Thank you! Your message has been sent");
    setValues({ fullName: "", subject: "", email: "", body: "" });
    setTouched({ fullName: false, subject: false, email: false, body: false });
  }

  return (
    <>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* Full name */}
        <div className={styles.field}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            minLength={3}
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.fullName && !!errors.fullName}
            aria-describedby="err-fullName"
            className={styles.input}
          />
          {touched.fullName && errors.fullName && (
            <span id="err-fullName" className={styles.error}>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Subject */}
        <div className={styles.field}>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            minLength={3}
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby="err-subject"
            className={styles.input}
          />
          {touched.subject && errors.subject && (
            <span id="err-subject" className={styles.error}>
              {errors.subject}
            </span>
          )}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby="err-email"
            className={styles.input}
          />
          {touched.email && errors.email && (
            <span id="err-email" className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Body */}
        <div className={styles.field}>
          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            name="body"
            required
            minLength={3}
            rows={6}
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.body && !!errors.body}
            aria-describedby="err-body"
            className={styles.textarea}
          />
          {touched.body && errors.body && (
            <span id="err-body" className={styles.error}>
              {errors.body}
            </span>
          )}
        </div>

        <button
            type="submit"
            disabled={!isValid}
            className={`${buttonStyles.btn} ${
                isValid ? buttonStyles.btnPrimary : buttonStyles.btnDisabled
             }`}
                >
                Send
                </button>

      </form>
    </>
  );
}

