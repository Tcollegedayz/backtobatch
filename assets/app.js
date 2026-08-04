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

async function getMyProfile(){
  const session = await getSession();
  if(!session) return null;
  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();
  if(error) console.error(error);
  return data;
}

async function requireAdmin(){
  const session = await getSession();
  if(!session){
    location.href='login.html?next=admin-dashboard.html';
    return null;
  }
  const { data, error } = await sb
    .from('profiles')
    .select('id,full_name,is_admin,is_suspended')
    .eq('id',session.user.id)
    .maybeSingle();

  if(error || !data || !data.is_admin){
    location.href='dashboard.html';
    return null;
  }
  if(data.is_suspended){
    await sb.auth.signOut();
    location.href='login.html';
    return null;
  }
  return {session,profile:data};
}
