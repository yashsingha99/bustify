import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import bus3 from "../../images/bus3.jpeg"
import Cookies from 'js-cookie';
export default function Services() {
  
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
      title: "Easy Booking",
      description: "Book your journey in minutes with our simple online system",
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      title: "Multiple Routes",
      description: "Extensive network covering all major cities and destinations",
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "24/7 Service",
      description: "Round-the-clock customer support for your convenience",
    },
  ];

  return (
    <section className="w-full mt-16 bg-gradient-to-br overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide">
                Premium Bus Services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Travel in Comfort <br />
                <span className="text-indigo-600">and Style</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Experience premium bus travel with state-of-the-art facilities, professional drivers, and unmatched comfort on every journey.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/booking'}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              >
                Book Your Journey
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/contact'}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[250px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={bus3}
                alt="Luxury Bus Service"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-indigo-600 font-semibold">Next Available</p>
                    <p className="text-xl font-bold text-gray-900">Premium Express</p>
                  </div>
                  <button
                    onClick={() => window.location.href = '/routes'}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Schedule
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
