import { createHmac } from 'node:crypto';
const SECRET='a52d76f0670e4a5a7b5af99f305c127dd08b40099ba4bf6bdee2298492e117ef';
function valid(cookie){
  if(!cookie) return false;
  const [exp,sig]=cookie.split('.'); if(!exp||!sig||Number(exp)<Date.now()) return false;
  const expected=createHmac('sha256',SECRET).update(exp).digest('hex');
  return sig===expected;
}
export function middleware(req){
  const p=req.nextUrl.pathname;
  if(p==='/admin-dashboard.html'){
    const c=req.cookies.get('aura_admin')?.value;
    if(!valid(c)) return Response.redirect(new URL('/gestion-aura-9x7k.html',req.url));
  }
}
export const config={matcher:['/admin-dashboard.html']};
