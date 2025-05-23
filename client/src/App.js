import logo from './logo.svg';
import './App.css';
//import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png';


function navigate(url) {
  window.location.href = url;
}

async function googleAuth() {
  const response = await fetch('http://localhost:3000/request',
  {method:'post'});
  const data = await response.json();
  navigate(data.url);
}

async function linkedinAuth() {
  const response = await fetch('http://localhost:3000/auth/linkedin/request',
  {method:'post'});
  const data = await response.json();
  navigate(data.url);
}

function App() {
  return (
    <>
      <h1>Sign in with Social Media</h1>
      <div className="auth-buttons">
        <button type="button" onClick={()=> googleAuth()}>
          Sign in with Google
        </button>
        <button type="button" onClick={()=> linkedinAuth()}>
          Sign in with LinkedIn
        </button>
      </div>
    </>
  )
}

export default App;
