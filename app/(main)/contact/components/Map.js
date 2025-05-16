import React from 'react'

export default function Map() {
  return (
    <div className="w-full h-96 mb-14 rounded-xl overflow-hidden shadow-md">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.8830232953055!2d-2.6002052241939535!3d51.441942115484224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718c2afe05c971%3A0x79c9750eb3a36e0e!2s80%20East%20St%2C%20Bedminster%2C%20Bristol%20BS3%204EY%2C%20UK!5e0!3m2!1sen!2scm!4v1746679676700!5m2!1sen!2scm"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    ></iframe>
  </div>
  )
}
