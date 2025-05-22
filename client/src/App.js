import logo from './logo.svg';
import './App.css';
//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png';


function navigate(url) {
  window.location.href = url;
}

async function auth(){
  const response = await fetch('http://localhost:3000/request',
  {method:'post'});
  const data = await response.json();
  navigate(data.url);
}

function App() {
  return (

<>
<h1>Sign in with Google</h1>
<h3>Google OAuth</h3>
<button type="button" onClick={()=> auth()}>
  sign in with google
</button>

</>

      )
}

export default App;
