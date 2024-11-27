import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const allowedIps = process.env.ALLOWED_IPS?.split(',') || [];
  const clientIp = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || '';
  console.log(allowedIps)
  console.log(clientIp)
  // IP 인증 로직
  if (!allowedIps.includes(clientIp)) {
    return new NextResponse(
      JSON.stringify({ message: 'Access denied' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 인증 성공 시 요청 계속 진행
  return NextResponse.next();
}
