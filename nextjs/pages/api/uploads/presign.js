import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const { name = '', contentType = 'application/octet-stream' } = req.body || {};
  const bucket = process.env.S3_BUCKET;
  if (!bucket) return res.status(400).json({ error: 's3_not_configured' });
  try{
    const region = process.env.S3_REGION || 'us-east-1';
    const client = new S3Client({ region, credentials: process.env.AWS_ACCESS_KEY_ID ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    } : undefined });
    const key = `${Date.now()}-${Math.random().toString(36).slice(2,8)}-${name}`;
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return res.json({ ok: true, url, key, publicUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}` });
  }catch(err){ console.error(err); return res.status(500).json({ error: err.message }); }
}
