import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const file = files.file || files.upload;
    if (!file) return res.status(400).json({ error: 'no file' });

    const buffer = fs.readFileSync(file.filepath || file.path);
    const ext = path.extname(file.originalFilename || file.name || '');
    const name = Date.now() + '-' + Math.random().toString(36).slice(2,8) + ext;

    // If S3 is configured, upload there. Otherwise save locally to public/uploads
    const S3_BUCKET = process.env.S3_BUCKET;
    if (S3_BUCKET) {
      try{
        const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
        const region = process.env.S3_REGION || 'us-east-1';
        const client = new S3Client({ region, credentials: process.env.AWS_ACCESS_KEY_ID ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        } : undefined });
        const key = name;
        await client.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, Body: buffer, ContentType: file.mimetype }));
        const url = `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${key}`;
        return res.json({ ok: true, url });
      }catch(e){ console.error('S3 upload failed', e); return res.status(500).json({ error: 's3 upload failed' }); }
    }

    const outPath = path.join(process.cwd(), 'public', 'uploads', name);
    try{
      fs.writeFileSync(outPath, buffer);
      return res.json({ ok: true, url: '/uploads/' + name });
    }catch(e){ console.error(e); return res.status(500).json({ error: 'write failed' }); }
  });
}
