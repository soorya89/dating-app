import { useState } from 'react';
import RegSection1 from '../pages/RegSection1';
import RegSection2 from '../pages/RegSection2';
import RegSection3 from '../pages/RegSection3';

const Tabui = () => {
  const [tab, setTab] = useState('complete your profile');
  const [isSection1Complete, setIsSection1Complete] = useState(false);
  const [isSection2Complete, setIsSection2Complete] = useState(false);

  const handleSection1Complete = () => {
    setIsSection1Complete(true);
    setTab('employment');
  };

  const handleSection2Complete = () => {
    setIsSection2Complete(true);
    setTab('purpose');
  };

  return (
    <div>
      <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
        <button
          onClick={() => setTab('complete your profile')}
          className={`${
            tab === 'complete your profile' && 'border-b border-solid border-primaryColor'
          } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
        >
          Complete Your Profile
        </button>
        <button
          onClick={() => isSection1Complete && setTab('employment')}
          className={`${
            tab === 'employment' && 'border-b border-solid border-primaryColor'
          } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${
            !isSection1Complete && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Employment
        </button>
        <button
          onClick={() => isSection2Complete && setTab('purpose')}
          className={`${
            tab === 'purpose' && 'border-b border-solid border-primaryColor'
          } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${
            !isSection2Complete && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Purpose
        </button>
      </div>
      <div className="mt-[50px]">
        {tab === 'complete your profile' && <RegSection1 onComplete={handleSection1Complete} />}
        {tab === 'employment' && <RegSection2 onComplete={handleSection2Complete} />}
        {tab === 'purpose' && <RegSection3 />}
      </div>
    </div>
  );
};

export default Tabui;
