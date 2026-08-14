// Tarifs de livraison par wilaya (DA).
// Chaque wilaya possède un tarif pour le bureau et un tarif à domicile.
const DEFAULT_DELIVERY_PRICES={"Adrar":{"bureau":1200,"domicile":1400},"Chlef":{"bureau":700,"domicile":900},"Laghouat":{"bureau":850,"domicile":1050},"Oum El Bouaghi":{"bureau":700,"domicile":900},"Batna":{"bureau":700,"domicile":900},"Béjaïa":{"bureau":700,"domicile":900},"Biskra":{"bureau":850,"domicile":1050},"Béchar":{"bureau":850,"domicile":1050},"Blida":{"bureau":700,"domicile":900},"Bouira":{"bureau":700,"domicile":900},"Tamanrasset":{"bureau":1600,"domicile":1800},"Tébessa":{"bureau":850,"domicile":1050},"Tlemcen":{"bureau":700,"domicile":900},"Tiaret":{"bureau":700,"domicile":900},"Tizi Ouzou":{"bureau":700,"domicile":900},"Alger":{"bureau":550,"domicile":750},"Djelfa":{"bureau":850,"domicile":1050},"Jijel":{"bureau":700,"domicile":900},"Sétif":{"bureau":700,"domicile":900},"Saïda":{"bureau":700,"domicile":900},"Skikda":{"bureau":700,"domicile":900},"Sidi Bel Abbès":{"bureau":550,"domicile":750},"Annaba":{"bureau":700,"domicile":900},"Guelma":{"bureau":700,"domicile":900},"Constantine":{"bureau":700,"domicile":900},"Médéa":{"bureau":700,"domicile":900},"Mostaganem":{"bureau":550,"domicile":750},"M'Sila":{"bureau":700,"domicile":900},"Mascara":{"bureau":550,"domicile":750},"Ouargla":{"bureau":850,"domicile":1050},"Oran":{"bureau":400,"domicile":500},"El Bayadh":{"bureau":1200,"domicile":1400},"Illizi":{"bureau":1600,"domicile":1800},"Bordj Bou Arréridj":{"bureau":700,"domicile":900},"Boumerdès":{"bureau":700,"domicile":900},"El Tarf":{"bureau":700,"domicile":900},"Tindouf":{"bureau":1600,"domicile":1800},"Tissemsilt":{"bureau":700,"domicile":900},"El Oued":{"bureau":850,"domicile":1050},"Khenchela":{"bureau":700,"domicile":900},"Souk Ahras":{"bureau":700,"domicile":900},"Tipaza":{"bureau":700,"domicile":900},"Mila":{"bureau":700,"domicile":900},"Aïn Defla":{"bureau":700,"domicile":900},"Naâma":{"bureau":1200,"domicile":1400},"Aïn Témouchent":{"bureau":550,"domicile":750},"Ghardaïa":{"bureau":850,"domicile":1050},"Relizane":{"bureau":700,"domicile":900},"Timimoun":{"bureau":1200,"domicile":1400},"Bordj Badji Mokhtar":{"bureau":1500,"domicile":1700},"Ouled Djellal":{"bureau":850,"domicile":1050},"Béni Abbès":{"bureau":950,"domicile":1150},"In Salah":{"bureau":1600,"domicile":1800},"In Guezzam":{"bureau":1900,"domicile":2100},"Touggourt":{"bureau":850,"domicile":1050},"Djanet":{"bureau":1900,"domicile":2100},"El M'Ghair":{"bureau":850,"domicile":1050},"El Meniaa":{"bureau":850,"domicile":1050}};
const DELIVERY_VERSION='2026-08-10-v2';
function normalizeDeliveryPrices(x){
  const out={};
  Object.entries(DEFAULT_DELIVERY_PRICES).forEach(([w,def])=>{
    const v=x&&x[w];
    if(typeof v==='number') out[w]={bureau:Math.max(0,v-200),domicile:Number(v)||def.domicile};
    else if(v&&typeof v==='object') out[w]={bureau:Number(v.bureau)||0,domicile:Number(v.domicile)||0};
    else out[w]={...def};
  });
  return out;
}
function getDeliveryPrices(){
  try{
    const x=JSON.parse(localStorage.getItem('aura_delivery')||'null');
    const n=normalizeDeliveryPrices(x);
    if(!x||localStorage.getItem('aura_delivery_version')!==DELIVERY_VERSION){
      localStorage.setItem('aura_delivery',JSON.stringify(n));
      localStorage.setItem('aura_delivery_version',DELIVERY_VERSION);
    }
    return n;
  }catch(e){return DEFAULT_DELIVERY_PRICES}
}
function saveDeliveryPrices(x){localStorage.setItem('aura_delivery',JSON.stringify(normalizeDeliveryPrices(x)));localStorage.setItem('aura_delivery_version',DELIVERY_VERSION);}
function deliveryPrice(w,type='domicile'){const p=getDeliveryPrices()[w];return Number(p?.[type]||0)}
