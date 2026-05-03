import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Beauty Enthusiast',
    rating: 5,
    text: 'Absolutely love the quality of products! My skin has never looked better. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Emily Chen',
    role: 'Makeup Artist',
    rating: 5,
    text: 'As a professional makeup artist, I trust Beauty Flow for the best quality products.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Jessica Williams',
    role: 'Regular Customer',
    rating: 5,
    text: 'Fast shipping and amazing customer service. Will definitely shop again!',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-pink-600 font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <FaQuoteLeft className="text-pink-200 text-3xl mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}