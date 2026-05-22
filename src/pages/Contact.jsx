export default function Contact() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        

    <div className="bg-white shadow-md rounded-lg p-6">
      
      <div className="bg-[#16234d] text-white text-center py-3 font-semibold text-lg rounded-t-md">
        Get In Touch With Us Now!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        
        {/* Phone */}
        <div className="text-center border-r md:border-r border-gray-200">
          <div className="text-2xl">📞</div>
          <h3 className="font-bold text-xl mt-2">Phone Number</h3>
          <p className="text-gray-600">+94701628966</p>
          <p className="text-gray-600">+9411748754</p>
        </div>

        {/* Email */}
        <div className="text-center">
          <div className="text-2xl">📧</div>
          <h3 className="font-bold text-xl mt-2">Email</h3>
          <p className="text-gray-600">info@beautyflow.com</p>
         </div>

        {/* Location */}
        <div className="text-center border-t pt-4 border-gray-200">
          <div className="text-2xl">📍</div>
          <h3 className="font-bold text-xl mt-2">Location</h3>
          <p className="text-gray-600 text-sm">
           45 keselwathth street, Colombo 03, Sri Lanka
          </p>
        </div>

        {/* Working Hours */}
        <div className="text-center border-t pt-4 border-gray-200">
          <div className="text-2xl">⏰</div>
          <h3 className="font-bold text-xl mt-2">Working Hours</h3>
          <p className="text-gray-600 text-sm">
           24 Hours<br />
           
          </p>
        </div>

      </div>
    </div>
  <div className="bg-[#16234d] text-white text-center py-3 font-semibold text-lg rounded-t-md">Contact Us
          </div>
          <form className="p-6 space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-3 rounded w-full" placeholder="First Name *" />
          <input className="border p-3 rounded w-full" placeholder="Last Name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-3 rounded w-full" placeholder="Mobile No *" />
          <input className="border p-3 rounded w-full" placeholder="Email ID *" />
        </div>

        <textarea
          className="border p-3 rounded w-full h-32"
          placeholder="Message"
        ></textarea>

        {/* Captcha placeholder */}
        <div>
          <p className="text-sm mb-2">Please type the characters *</p>
          <input className="border p-3 rounded w-full" />
          <div className="mt-2 text-sm bg-gray-200 inline-block px-3 py-1">
            p s t 5 s
          </div>
        </div>

        <button className="bg-[#16234d] text-white px-6 py-3 rounded mt-4 flex items-center gap-2">
          Submit 🚀
        </button>


      </form>
      </div>
    </div>
  )
}