import React from 'react';
import {
  FaGlobeAmericas,
  FaAward,
  FaUsers,
  FaHeart,
  FaLeaf,
  FaShieldAlt,
  FaHandshake,
  FaLightbulb,
} from 'react-icons/fa';

const AboutUs = () => {
  const stats = [
    { icon: FaGlobeAmericas, number: '50+', label: 'Destinations Worldwide' },
    { FaUsers, number: '25K+', label: 'Happy Travelers' },
    { icon: FaAward, number: '12+', label: 'Years of Excellence' },
    { icon: FaHeart, number: '99%', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      icon: FaLeaf,
      title: 'Sustainable Travel',
      description:
        'We implement eco-friendly practices, support local conservation efforts, and promote responsible tourism that respects both nature and local cultures.',
    },
    {
      icon: FaShieldAlt,
      title: 'Safety & Security',
      description:
        'Your wellbeing is our priority. We maintain rigorous safety standards and provide comprehensive support throughout your journey.',
    },
    {
      icon: FaHandshake,
      title: 'Authentic Experiences',
      description:
        'We create meaningful connections with local communities, offering genuine cultural immersion rather than just tourist activities.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Crafting
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Extraordinary Journeys
            </span>{' '}
           
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We transform wanderlust into unforgettable experiences, creating
            travel moments that inspire, connect, and leave positive impacts on
            both travelers and destinations.
          </p>
        </div>

        <div className="grid grid-cols- lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Mission & Vision */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaLightbulb className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600">
                To revolutionize travel by creating immersive, responsible
                experiences that bridge cultures, support local communities, and
                foster genuine connections between people and the places they
                visit. We believe travel should be transformative, sustainable,
                and accessible.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <FaGlobeAmericas className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To become the world's most trusted sustainable travel partner,
                setting new standards for ethical tourism while inspiring a
                global community of conscious travelers who explore with
                purpose, respect, and a commitment to preserving our planet's
                beauty and diversity.
              </p>
            </div>
          </div>

          {/* <div className="relative">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl h-80 w-full flex items-center justify-center p-8">
              <div className="text-center text-white">
                <FaLeaf className="text-6xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Green Commitment</h3>
                <p className="text-lg">
                  Leading the way in sustainable tourism with carbon-neutral operations, 
                  wildlife protection initiatives, and community-based tourism projects.
                </p>
              </div>
            </div>
            

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 w-3/4">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaLeaf className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Carbon Neutral Since 2020</p>
                  <p className="text-sm text-gray-600">100% carbon offset operations</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 w-2/3">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaUsers className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Local Community Support</p>
                  <p className="text-sm text-gray-600">30+ community projects funded</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* <stat.icon className="text-4xl text-blue-600 mx-auto mb-4" /> */}
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Travel Philosophy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="text-2xl text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Commitment */}
        <div className="bg-green-50 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Sustainability Promise
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to protecting the beautiful destinations we share
              with you. Our sustainability initiatives ensure that future
              generations can enjoy the same wonders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">♻️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Plastic-Free Tours
              </h4>
              <p className="text-sm text-gray-600">
                Eliminating single-use plastics from all our operations
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">🌱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Wildlife Protection
              </h4>
              <p className="text-sm text-gray-600">
                Supporting conservation projects in all our destinations
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">🏘️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Local Empowerment
              </h4>
              <p className="text-sm text-gray-600">
                80% of our team and partners are local residents
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">🌍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Carbon Neutral
              </h4>
              <p className="text-sm text-gray-600">
                All trips are 100% carbon offset through verified projects
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Join Us in Responsible Travel
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the world differently - where your journey leaves
            positive footprints and creates lasting impacts.
          </p>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore Sustainable Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
