import { useEffect, useState } from 'react';

const STORAGE_KEY = 'btg_donation_total';
const DEFAULT_TOTAL = 5699;

export default function DonationWidget(){
  const [total, setTotal] = useState(() => DEFAULT_TOTAL);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try{
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (!Number.isNaN(saved) && saved > 0){
        setTotal(saved);
      } else {
        localStorage.setItem(STORAGE_KEY, String(DEFAULT_TOTAL));
      }
    }catch{
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try{
      localStorage.setItem(STORAGE_KEY, String(total));
    }catch{
      /* ignore */
    }
  }, [total]);

  return (
    <div className="donation-total-box">
      <div className="donation-total-label">Total raised</div>
      <div className="donation-amount">RS {total.toLocaleString()}</div>
    </div>
  );
}
