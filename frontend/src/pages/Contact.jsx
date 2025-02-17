// import React from "react";

// const Contact = () => {
//   return (
//     <div className="bg-gray-100 py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Contact Header */}
//         <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
//           Contact With Us
//         </h2>

//         {/* Main Contact Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Google Map */}
//           <div className="rounded-lg overflow-hidden shadow-md">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.762185682023!2d88.36389391496092!3d22.57264618518062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770000000001%3A0x8f8e4a34de2ac43a!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1698869933324!5m2!1sen!2sbd"
//               width="100%"
//               height="700"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Google Map - Kolkata"
//             ></iframe>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//               If you have any questions, please feel free to contact us.
//             </h3>
//             <form>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-gray-700 font-medium"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     placeholder="Your Name"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-gray-700 font-medium"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Your Email"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-gray-700 font-medium"
//                 >
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   placeholder="Your Phone"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* Subject */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="subject"
//                   className="block text-gray-700 font-medium"
//                 >
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   placeholder="Subject"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* Message */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="message"
//                   className="block text-gray-700 font-medium"
//                 >
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="4"
//                   placeholder="Your Message"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
//                 ></textarea>
//               </div>

//               {/* Newsletter */}
//               <div className="mt-4 flex items-center">
//                 <input
//                   type="checkbox"
//                   id="newsletter"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="newsletter"
//                   className="ml-2 text-gray-700 text-sm font-medium"
//                 >
//                   Do you want to subscribe to our Newsletter?
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="mt-6 w-full bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Footer Contact Details */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-center">
//           {/* Phone */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="text-blue-500 text-2xl font-semibold">📞</div>
//             <p className="text-gray-900 font-medium mt-2">+ (000) 1234 56789</p>
//             <p className="text-gray-600">info@company.com</p>
//           </div>

//           {/* Address */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="text-blue-500 text-2xl font-semibold">📍</div>
//             <p className="text-gray-900 font-medium mt-2">
//               Salt Lake City, Sector V
//             </p>
//             <p className="text-gray-600">Kolkata, West Bengal, India</p>
//           </div>

//           {/* Working Hours */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="text-blue-500 text-2xl font-semibold">⏰</div>
//             <p className="text-gray-900 font-medium mt-2">
//               Mon - Sat: 8am - 5pm
//             </p>
//             <p className="text-gray-600">Sunday Closed</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React from "react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Header */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Contact Us
        </h2>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Google Map */}
          <div className="rounded-lg overflow-hidden shadow-md ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.762185682023!2d88.36389391496092!3d22.57264618518062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770000000001%3A0x8f8e4a34de2ac43a!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1698869933324!5m2!1sen!2sbd"
              width="100%"
              height="700px"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map - Kolkata"
              className="w-full h-full"
            />
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Have questions? We're here to help!
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  placeholder="1234567890"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="mt-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Message */}
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Your message..."
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Newsletter */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="newsletter"
                  className="ml-2 text-gray-700 text-sm font-medium"
                >
                  Subscribe to our newsletter?
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-center">
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-500 text-2xl mb-2">📞</div>
            <p className="text-gray-900 font-medium">
              <a href="tel:+000123456789" className="hover:text-blue-600">
                + (000) 1234 56789
              </a>
            </p>
            <p className="text-gray-600">
              <a href="mailto:info@company.com" className="hover:text-blue-600">
                info@company.com
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-500 text-2xl mb-2">📍</div>
            <p className="text-gray-900 font-medium">
              Salt Lake City, Sector V
            </p>
            <p className="text-gray-600">Kolkata, West Bengal, India</p>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-500 text-2xl mb-2">⏰</div>
            <p className="text-gray-900 font-medium">Mon - Sat: 8am - 5pm</p>
            <p className="text-gray-600">Sunday Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
