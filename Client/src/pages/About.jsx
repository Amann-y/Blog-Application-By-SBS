import React from 'react';

const About = () => {

  return (
    <div className="min-h-screen  p-6">
      <div className="container mx-auto">
        {/* Introduction Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-8 animate__animated animate__fadeIn animate__faster">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">About Us</h1>
          <p className="text-gray-700 text-lg">
            Welcome to our blog! Our mission is to share insightful articles and
            updates on various topics to keep you informed and engaged. We
            strive to provide high-quality content that adds value to our
            readers' lives.
          </p>
        </section>

        {/* Team Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn animate__faster">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md animate__animated animate__zoomIn animate__delay-1s">
              <img
                src="https://ui-avatars.com/api/?uppercase=false&name=Aman&color=ff0000&bold=true&size=150&background=random&length=1`"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Amann</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md animate__animated animate__zoomIn animate__delay-2s">
              <img
                src="https://ui-avatars.com/api/?uppercase=false&name=Monu&color=ff0000&bold=true&size=150&background=random&length=1"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Monu</h3>
              <p className="text-gray-600">Content Writer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md animate__animated animate__zoomIn animate__delay-3s">
              <img
                src="https://ui-avatars.com/api/?uppercase=false&name=Anha&color=ff0000&bold=true&size=150&background=random&length=1"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Anha</h3>
              <p className="text-gray-600">Designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
