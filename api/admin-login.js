const crypto = require('crypto');
const ADMIN_EMAIL = 'hachanibrahimelkhalil@gmail.com';
const SALT = '1f7bc6185e2eb258e960f826845ebd36';
const PASSWORD_HASH = '30bef2dc2a488251225367de2593784f4789ffbd93742389210bfe16c6f02f35c11d9fd79c8db11600222203c9229c2f7b98fc82d9b501564eec51f8f184cb58';
const SESSION_SECRET = 'a52d76f0670e4a5a7b5af99f305c127dd08b40099ba4bf6bdee2298492e117ef';
function sign(v){return crypto.createHmac('sha256', SESSION_SECRET).update(v).digest('hex')}
module.exports = (req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'Méthode non autorisée'});
  let body=req.body||{}; if(typeof body==='string'){try{body=JSON.parse(body)}catch{body={}}}
  const email=String(body.email||'').trim().toLowerCase(), password=String(body.password||'');
  if(email!==ADMIN_EMAIL) return res.status(401).json({error:'Adresse e-mail ou mot de passe incorrect.'});
  const test=crypto.scryptSync(password,SALT,64);
  if(!crypto.timingSafeEqual(test,Buffer.from(PASSWORD_HASH,'hex'))) return res.status(401).json({error:'Adresse e-mail ou mot de passe incorrect.'});
  const exp=Date.now()+8*60*60*1000, payload=String(exp), token=payload+'.'+sign(payload);
  res.setHeader('Set-Cookie', 'aura_admin='+token+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800');
  return res.status(200).json({ok:true});
};
