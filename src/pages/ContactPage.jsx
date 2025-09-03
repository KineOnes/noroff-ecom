import { useState, useMemo } from "react";

/**
 * Krav fra brief:
 * - Full name: min 3 tegn, required
 * - Subject:   min 3 tegn, required
 * - Email:     gyldig e-post, required
 * - Body:      min 3 tegn, required
 * - Ved suksess: console.log(data)
 */

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

  // Validering
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
    // Marker alt som "touched" slik at feil vises
    setTouched({ fullName: true, subject: true, email: true, body: true });

    if (!isValid) return; // ikke send hvis feil

    // 👍 Kravet sier "console.log the data"
    console.log("Contact form submitted:", values);

    // Valgfritt: liten tilbakemelding og reset
    alert("Takk! Skjemaet ble sendt.");
    setValues({ fullName: "", subject: "", email: "", body: "" });
    setTouched({ fullName: false, subject: false, email: false, body: false });
  }

  // Enkle inline-stiler (du kan flytte til CSS senere)
  const fieldStyle = { display: "grid", gap: 6, marginBottom: 14 };
  const inputStyle = { padding: "0.6rem 0.8rem", borderRadius: 8, border: "1px solid #ccc" };
  const errorStyle = { color: "crimson", fontSize: 14 };

  return (
    <>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 520 }}>
        {/* Full name */}
        <div style={fieldStyle}>
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
            style={inputStyle}
          />
          {touched.fullName && errors.fullName && (
            <span id="err-fullName" style={errorStyle}>{errors.fullName}</span>
          )}
        </div>

        {/* Subject */}
        <div style={fieldStyle}>
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
            style={inputStyle}
          />
          {touched.subject && errors.subject && (
            <span id="err-subject" style={errorStyle}>{errors.subject}</span>
          )}
        </div>

        {/* Email */}
        <div style={fieldStyle}>
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
            style={inputStyle}
          />
          {touched.email && errors.email && (
            <span id="err-email" style={errorStyle}>{errors.email}</span>
          )}
        </div>

        {/* Body */}
        <div style={fieldStyle}>
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
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {touched.body && errors.body && (
            <span id="err-body" style={errorStyle}>{errors.body}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            padding: "0.7rem 1.1rem",
            borderRadius: 10,
            border: "1px solid #222",
            background: isValid ? "#222" : "#999",
            color: "white",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Send
        </button>
      </form>
    </>
  );
}
