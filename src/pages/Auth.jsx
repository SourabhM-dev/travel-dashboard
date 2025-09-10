
import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('travel_user', JSON.stringify({ email }));
    alert(`Mock ${mode} successful — session stored locally.`);
    window.location.href = '/';
  };

  return (
    <>
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input required type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Password</label>
              <input required type="password" value={pass} onChange={(e)=> setPass(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500">Forgot password? <a href="#" className="underline">Reset</a></div>
              <button className="px-4 py-2 bg-slate-900 text-white rounded" type="submit">{mode === 'login' ? 'Sign in' : 'Sign up'}</button>
            </div>
          </form>

          <div className="mt-4 text-sm text-slate-600">
            {mode === 'login' ? (
              <>No account? <button className="underline" onClick={()=> setMode('signup')}>Create one</button></>
            ):(
              <>Already have an account? <button className="underline" onClick={()=> setMode('login')}>Sign in</button></>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
