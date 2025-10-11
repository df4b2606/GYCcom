# EmailJS Integration Guide

## Overview

The ContactForm component is ready for EmailJS integration. Follow these steps to enable email sending functionality.

## Prerequisites

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your service credentials

## Installation

```bash
npm install @emailjs/browser
```

## Configuration Steps

### 1. Get Your Credentials

- **Service ID**: Found in your EmailJS dashboard under "Email Services"
- **Template ID**: Found under "Email Templates"
- **Public Key**: Found under "Account" > "General"

### 2. Update the ContactForm Component

Replace the TODO section in `ContactForm.tsx`:

```typescript
import emailjs from "@emailjs/browser";

// Replace the TODO section in handleSubmit with:
await emailjs.send(
  "YOUR_SERVICE_ID", // Replace with your service ID
  "YOUR_TEMPLATE_ID", // Replace with your template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_name: "Your Name", // Your name
    reply_to: formData.email,
  },
  "YOUR_PUBLIC_KEY" // Replace with your public key
);
```

### 3. Environment Variables (Recommended)

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to use environment variables:

```typescript
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_name: "Your Name",
    reply_to: formData.email,
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

### 4. Email Template Variables

Make sure your EmailJS template includes these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message content
- `{{to_name}}` - Your name (recipient)

### 5. Example Template

```html
Hello {{to_name}}, You have received a new message from your website contact
form: From: {{from_name}} ({{from_email}}) Subject: {{subject}} Message:
{{message}} Best regards, Your Website Contact Form
```

## Security Notes

1. **Never expose private keys** - Only use the public key in frontend code
2. **Set up domain restrictions** in EmailJS dashboard to prevent abuse
3. **Consider rate limiting** to prevent spam
4. **Validate email addresses** on both client and server side

## Error Handling

The current implementation includes basic error handling. You may want to add more specific error messages based on EmailJS error codes:

```typescript
try {
  await emailjs.send(/* ... */);
  setSubmitStatus("success");
} catch (error: any) {
  console.error("EmailJS error:", error);
  if (error.status === 400) {
    // Handle bad request
  } else if (error.status === 402) {
    // Handle quota exceeded
  }
  setSubmitStatus("error");
}
```

## Testing

1. Test with a valid email address
2. Check your email inbox for received messages
3. Verify the template formatting
4. Test error scenarios (invalid emails, network issues)

## Troubleshooting

- **403 Forbidden**: Check your public key and domain restrictions
- **400 Bad Request**: Verify template variables match your template
- **402 Payment Required**: Check your EmailJS quota/plan
- **Network errors**: Check internet connection and EmailJS service status

## Additional Features

Consider adding:

- **Captcha integration** for spam protection
- **Email validation** with regex or external service
- **Auto-reply functionality** to confirm receipt
- **Analytics tracking** for form submissions

