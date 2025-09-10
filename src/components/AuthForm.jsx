import React, { useState } from 'react';
import { signUp, signIn } from '../services/appwrite';

export default function AuthForm() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [mode,setMode] = useState('login');

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        await signUp(email, password);
        alert('Registered — now sign in');
        setMode('login');
      } else {
        await signIn(email, password);
        window.location.reload();
      }
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
      <button type="submit">{mode==='signup' ? 'Sign up' : 'Sign in'}</button>
      <button type="button" onClick={()=>setMode(mode==='signup' ? 'login' : 'signup')}>
        {mode==='signup' ? 'Switch to sign in' : 'Switch to sign up'}
      </button>
    </form>
  );
}
