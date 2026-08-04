function showMessage(id, message, type='error'){
  const el=document.getElementById(id);
  if(!el)return;
  el.textContent=message;
  el.className=`alert ${type} show`;
}
function initials(name=''){
  return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')||'?';
}
async function getSession(){
  const {data,error}=await sb.auth.getSession();
  if(error) console.error(error);
  return data.session;
}
async function updateNav(){
  const session=await getSession();
  document.querySelectorAll('[data-auth="guest"]').forEach(x=>x.classList.toggle('hidden',!!session));
  document.querySelectorAll('[data-auth="user"]').forEach(x=>x.classList.toggle('hidden',!session));
  const email=document.querySelector('[data-user-email]');
  if(email&&session)email.textContent=session.user.email;
}
async function logout(){
  await sb.auth.signOut();
  location.href='index.html';
}
document.addEventListener('DOMContentLoaded',updateNav);