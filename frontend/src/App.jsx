import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Game from './components/Game';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={
        <>
          <SignedIn>
            <Game />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      } />
    </Routes>
  );
}
