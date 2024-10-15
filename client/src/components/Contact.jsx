import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Github, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="max-w-6xl mt-16 mx-auto p-6">
      <h1 className="text-4xl font-bold text-center">Get in Touch</h1>
      
      {/* <div className="grid bg-slate-50 rounded-lg p-4 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-600" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              <span>123 Main St, Anytown, USA 12345</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Connect With Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="What's this about?"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full p-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your message here..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>
      </div> */}
      <div class="container flex flex-wrap  px-5 py-16 mx-auto">
      <div className='mb-4 flex flex-col '>
          <div className="space-y-4">
            <div className="flex text-xl items-center">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              <span>contact@bustify.in</span>
            </div>
            <div className="flex text-xl items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-600" />
              <span>7417582399, </span>
              <span className='ml-3'>7668301226</span>
            </div>
            <div className="flex text-xl items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              <span>Near GLA University Mathura, 281406</span>
            </div>
          </div>
        </div>
        <div class=" bg-white shadow-2xl p-12 rounded-xl lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm  ">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
      {submitSuccess && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
    </div>
  );
};

export default Contact;