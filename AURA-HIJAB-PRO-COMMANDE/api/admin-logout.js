module.exports=(req,res)=>{res.setHeader('Set-Cookie','aura_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');res.status(200).json({ok:true});};
