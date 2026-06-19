type SendArgs = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
};

async function send(args: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: args.from,
      to: Array.isArray(args.to) ? args.to : [args.to],
      subject: args.subject,
      html: args.html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${errorText}`);
  }

  return response.json();
}

export const resend = {
  emails: {
    send,
  },
};
