import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="container mx-auto">
        {/* Introduction Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-8 animate__animated animate__fadeIn animate__faster">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
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
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Amann</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md animate__animated animate__zoomIn animate__delay-2s">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Monu</h3>
              <p className="text-gray-600">Content Writer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md animate__animated animate__zoomIn animate__delay-3s">
              <img
                src="https://cdn.vectorstock.com/i/500p/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg"
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
