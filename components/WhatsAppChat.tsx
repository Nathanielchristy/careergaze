"use client"

export default function WhatsAppChat() {
  return (
    <a
      href="https://wa.me/916282744675?text=Hi%20Careergize,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition"
      aria-label="Chat with us on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp chat"
        className="w-8 h-8"
      />
    </a>
  )
}
