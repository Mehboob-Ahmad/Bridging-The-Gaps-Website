import { useState } from 'react';

export default function DonationUpload(){
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  function onFile(e){
    const f = e.target.files[0];
    if (!f) return; setFile(f); setPreview(URL.createObjectURL(f));
  }

  async function uploadFile(){
    setStatus('Uploading...');
    // try presign first
    try{
      const res = await fetch('/api/uploads/presign', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name: file.name, contentType: file.type }) });
      const data = await res.json();
      if (data.ok && data.url){
        // put the file to the signed URL
        await fetch(data.url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
        return data.publicUrl;
      }
    }catch(e){ console.warn('presign failed', e); }

    // fallback to server upload
    try{
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch('/api/uploads', { method: 'POST', body: fd });
      const d = await r.json();
      if (d.ok) return d.url; throw new Error(d.error || 'upload failed');
    }catch(err){ throw err; }
  }

  async function submit(e){
    e.preventDefault();
    if (!file) return setStatus('Select a file');
    if (!amount) return setStatus('Enter amount');
    try{
      const url = await uploadFile();
      const res = await fetch('/api/donations', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ amount: Number(amount), slip_url: url }) });
      const d = await res.json();
      if (!res.ok) return setStatus(d.error || 'failed');
      setStatus('Donation recorded — thank you');
      setFile(null); setPreview(null); setAmount('');
    }catch(err){ console.error(err); setStatus(err.message || 'Upload failed'); }
  }

  return (
    <div className="donation-slip-upload">
      <h3>Upload donation slip</h3>
      <form onSubmit={submit}>
        <label style={{display:'block'}}>Amount (RS)<br/><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} required /></label>
        <label style={{display:'block', marginTop:8}}>Slip image<br/><input type="file" accept="image/*" onChange={onFile} required /></label>
        {preview && <div style={{marginTop:8}}><img src={preview} alt="preview" style={{maxWidth:200}}/></div>}
        <div style={{marginTop:10}}>
          <button type="submit">Submit donation</button>
        </div>
      </form>
      <div style={{marginTop:8}}>{status}</div>
    </div>
  );
}
