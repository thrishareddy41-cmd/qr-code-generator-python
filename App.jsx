import { useState } from 'react'
import * as QRCodeModule from 'react-qr-code'

const QRCode = QRCodeModule.default || QRCodeModule.QRCode

export default function App() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('https://github.com/')

  const generateQR = () => {
    if (text.trim()) {
      setQrValue(text.trim())
    }
  }

  const downloadQR = () => {
    const svg = document.getElementById('qr-code')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    canvas.width = 512
    canvas.height = 512

    img.onload = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 512, 512)
      ctx.drawImage(img, 0, 0, 512, 512)

      const pngFile = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'qr-code.png'
      link.href = pngFile
      link.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          textAlign: 'center',
          width: '360px',
        }}
      >
        <h1 style={{ margin: '0 0 8px' }}>QR Code Generator</h1>
        <p style={{ margin: '0 0 20px', color: '#555' }}>Enter text or URL</p>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
          }}
        />

        <button
          onClick={generateQR}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '22px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            background: '#4f46e5',
            color: 'white',
            fontSize: '15px',
          }}
        >
          Generate QR
        </button>

        <div style={{ marginBottom: '20px' }}>
          <QRCode id="qr-code" value={qrValue} size={200} />
        </div>

        <button
          onClick={downloadQR}
          style={{
            width: '100%',
            padding: '12px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '1px solid #4f46e5',
            background: 'white',
            color: '#4f46e5',
            fontSize: '15px',
          }}
        >
          Download PNG
        </button>
      </div>
    </div>
  )
}
