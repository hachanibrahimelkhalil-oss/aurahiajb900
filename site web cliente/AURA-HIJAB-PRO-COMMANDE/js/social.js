
const SOCIAL_DEFAULTS = {
  instagram: "",
  facebook: "",
  tiktok: "",
  snapchat: ""
};
function getSocials(){
  return JSON.parse(localStorage.getItem("aura_socials") || JSON.stringify(SOCIAL_DEFAULTS));
}
function saveSocials(s){
  localStorage.setItem("aura_socials", JSON.stringify(s));
}
function validSocialUrl(v){
  if(!v) return true;
  try { const u=new URL(v); return ["http:","https:"].includes(u.protocol); } catch(e){ return false; }
}
function renderSocialLinks(){
  const s=getSocials();
  const box=document.getElementById("socialLinks");
  if(!box) return;
  const items=[
    ["instagram","Instagram","◎"],
    ["facebook","Facebook","f"],
    ["tiktok","TikTok","♪"],
    ["snapchat","Snapchat","◉"]
  ];
  box.innerHTML=items.filter(x=>s[x[0]]).map(x=>`<a class="social-link" href="${s[x[0]]}" target="_blank" rel="noopener" aria-label="${x[1]}"><span>${x[2]}</span>${x[1]}</a>`).join("");
  if(!box.innerHTML) box.innerHTML='<span class="social-empty">Nos réseaux sociaux seront bientôt disponibles.</span>';
}
