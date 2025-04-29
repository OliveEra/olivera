import React from 'react';
import { FileSignature as Signature } from 'lucide-react';

const Logo = () => {
  return (
    <div className="fixed top-8 left-8 text-white/80">
      <Signature size={48} />
    </div>
  );
};

export default Logo;