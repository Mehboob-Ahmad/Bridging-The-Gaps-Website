import { useEffect, useRef, useState } from 'react';

export default function DonationSlipUpload(){
  const [previewUrl, setPreviewUrl] = useState('');
  const [info, setInfo] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFileChange(e){
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')){
      alert('Please select an image file (jpg, png, etc.).');
      e.target.value = '';
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setInfo(`Selected: ${file.name} — ${(file.size / 1024).toFixed(1)} KB`);
  }

  function clearSelection(){
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    setInfo('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="donation-slip-upload">
      <label htmlFor="donationSlipUpload">Choose slip image (JPG/PNG):</label>
      <input
        id="donationSlipUpload"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {previewUrl && (
        <div style={{marginTop:12}}>
          <img
            src={previewUrl}
            alt="Donation slip preview"
            style={{maxWidth:'100%',maxHeight:360,border:'1px solid #ccc',borderRadius:6}}
          />
          <p style={{fontSize:'0.9rem',color:'#333',marginTop:8}}>{info}</p>
          <button type="button" onClick={clearSelection}>Clear Slip</button>
        </div>
      )}
    </div>
  );
}

