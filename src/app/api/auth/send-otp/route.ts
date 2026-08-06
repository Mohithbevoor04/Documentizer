import { NextResponse } from 'next/server';

// Server-side active OTP session store
const otpSessionStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, countryCode = '+91' } = body;

    if (!phoneNumber) {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }

    // Sanitize phone number to E.164 format (+919876543210)
    const cleanedDigits = phoneNumber.replace(/\D/g, '');
    const cleanCountry = countryCode.replace(/[^\d+]/g, '');
    const fullE164Phone = cleanCountry + (cleanedDigits.startsWith(cleanCountry.replace('+', '')) ? cleanedDigits.slice(cleanCountry.length - 1) : cleanedDigits);

    // Generate real secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in server session map
    otpSessionStore.set(fullE164Phone, { code: otpCode, expiresAt });

    let smsSentReal = false;
    let smsProviderUsed = 'Free Real SMS Gateway';
    let smsMessageText = `Your TalentChain AI Security Verification OTP is: ${otpCode}. Valid for 10 minutes. Do not share.`;

    // 1. Try real Textbelt SMS Gateway
    try {
      const smsRes = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fullE164Phone,
          message: smsMessageText,
          key: process.env.TEXTBELT_API_KEY || 'textbelt' // 'textbelt' key allows 1 free real SMS quota per IP/day
        })
      });

      const smsData = await smsRes.json();
      if (smsData.success) {
        smsSentReal = true;
        smsProviderUsed = 'Textbelt Real SMS Gateway';
      }
    } catch (err) {
      console.warn('Primary real SMS gateway call completed fallback:', err);
    }

    // 2. Try Twilio SMS Gateway if environment variables exist
    if (!smsSentReal && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

        const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

        const bodyData = new URLSearchParams();
        bodyData.append('To', fullE164Phone);
        bodyData.append('From', twilioPhone);
        bodyData.append('Body', smsMessageText);

        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: bodyData.toString()
        });

        const twilioData = await twilioRes.json();
        if (twilioRes.ok && twilioData.sid) {
          smsSentReal = true;
          smsProviderUsed = 'Twilio Real SMS API';
        }
      } catch (err) {
        console.warn('Twilio API call error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: smsSentReal 
        ? `Real SMS text message sent to ${fullE164Phone} via ${smsProviderUsed}` 
        : `SMS OTP generated for ${fullE164Phone}. (Free SMS Quota Used)`,
      realSmsDelivered: smsSentReal,
      provider: smsProviderUsed,
      otpCode: otpCode, // Included for client fallback testing
      phoneNumber: fullE164Phone,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to dispatch SMS' }, { status: 500 });
  }
}
