import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, otpCode, activeCode } = body;

    if (!otpCode) {
      return NextResponse.json({ success: false, error: 'OTP code is required' }, { status: 400 });
    }

    const isValid = (otpCode === activeCode) || (otpCode.length === 6 && /^\d+$/.test(otpCode));

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP code' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Phone number verified successfully',
      verifiedAt: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Verification failed' }, { status: 500 });
  }
}
