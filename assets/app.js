function showMessage(id, message, type='error'){
  const el=document.getElementById(id);
  if(!el)return;
  el.textContent=message;
  el.className=`alert ${type} show`;
}

function initials(name=''){
  return name.trim().split(/\s+/).slice(0,2)
    .map(x=>x[0]?.toUpperCase()||'').join('')||'?';
}

async function getSession(){
  const {data,error}=await sb.auth.getSession();
  if(error) console.error(error);
  return data.session;
}

async function updateNav(){
  const session=await getSession();
  document.querySelectorAll('[data-auth="guest"]')
    .forEach(x=>x.classList.toggle('hidden',!!session));
  document.querySelectorAll('[data-auth="user"]')
    .forEach(x=>x.classList.toggle('hidden',!session));
  const email=document.querySelector('[data-user-email]');
  if(email&&session) email.textContent=session.user.email;
}

async function logout(){
  await sb.auth.signOut();
  location.href='index.html';
}

async function checkAdminAccess(){
  const {data,error}=await sb.rpc('check_my_admin_access');
  if(error){
    console.error('Admin RPC error:',error);
    return {allowed:false,error:error.message};
  }
  return data || {allowed:false};
}

async function requireAdmin(){
  const session=await getSession();
  if(!session){
    location.href='admin-login.html';
    return null;
  }

  const access=await checkAdminAccess();

  if(!access.allowed){
    if(access.suspended){
      await sb.auth.signOut();
      location.href='admin-login.html?reason=suspended';
      return null;
    }
    location.href='dashboard.html?reason=not_admin';
    return null;
  }

  return {session,profile:access};
}

document.addEventListener('DOMContentLoaded',updateNav);
