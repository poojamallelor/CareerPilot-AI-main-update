import { Building, Mail } from "lucide-react";
import React from "react";

function ContactForm() {
  return (
    <div>
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-xl text-gray-600">
              Have questions about our platform or interested in partnering with
              us?
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-8 md:p-12">
            <div className="md:flex gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="w-6 h-6 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Headquarters</p>
                      <p className="text-gray-600">
                        123 Career Avenue, San Francisco, CA 94107
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href="mailto:hello@careerlaunch.com"
                        className="text-indigo-600 hover:underline"
                      >
                        hello@careerlaunch.com
                      </a>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {/* Social media icons would go here */}
                  <a href="#" className="bg-white p-2 rounded-full shadow-sm">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  </a>
                  <a href="#" className="bg-white p-2 rounded-full shadow-sm">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  </a>
                  <a href="#" className="bg-white p-2 rounded-full shadow-sm">
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  </a>
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-foreground px-6 py-3 rounded-md hover:bg-indigo-700 transition font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
