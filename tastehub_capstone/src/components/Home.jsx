import React from 'react';
import Navbar from './Navbar';
import Button from './Button';
import FeatureCard from './FeatureCard';
import TestimonialCard from './TestimonialCard';
import StepCard from './StepCard';
import Footer from './Footer';
import { Search } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: '🔍',
      title: 'Find Recipes',
      description: 'Discover thousands of recipes based on ingredients you have at home.',
    },
    {
      icon: '🍽️',
      title: 'Plan Your Meals',
      description: 'Create weekly meal plans tailored to your dietary preferences.',
    },
    {
      icon: '📍',
      title: 'Explore Restaurants',
      description: 'Find healthy eating options near you with our restaurant finder.',
    },
    {
      icon: '🛒',
      title: 'Manage Grocery List',
      description: 'Generate shopping lists from your selected recipes automatically.',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Enter Ingredients',
      description: 'Tell us what ingredients you have available.',
      icon: '🥕'
    },
    {
      number: 2,
      title: 'Get Recipes',
      description: 'Browse through personalized recipe recommendations.',
      icon: '📖'
    },
    {
      number: 3,
      title: 'Cook & Track',
      description: 'Follow along and track nutritional information.',
      icon: '🍳'
    }
  ];

  const testimonials = [
    {
      quote: "This app completely changed how I approach meal planning. I save time and eat healthier!",
      name: "Sarah Johnson",
      image: "/api/placeholder/50/50"
    },
    {
      quote: "The recipe finder is amazing! I've discovered so many new dishes using ingredients I already had.",
      name: "Michael Chen",
      image: "/api/placeholder/50/50"
    },
    {
      quote: "I love how easy it is to create grocery lists. Shopping has never been this organized.",
      name: "Emma Rodriguez",
      image: "/api/placeholder/50/50"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-400 to-blue-500">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Recipes, Plan Meals, and Track Nutrition – All in One Place
          </h1>
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by ingredients, dish, or location..."
              className="w-full py-3 px-12 rounded-full text-lg shadow-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>
          </div>
          <Button text="Get Started" className="mt-6" />
        </div>
      </div>

      {/* Feature Highlights Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-green-400 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Cooking Experience?</h2>
          <p className="text-xl mb-8">Join thousands of users who have already improved their nutrition and eating habits.</p>
          <Button text="Sign Up Now" variant="white" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;