import ContactForm from "../form/ContactForm";
import ReviewForm from "../form/ReviewForm";

export default function ContactReviewSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your feedback and are here to help with any questions you might have.
            Reach out to us or share your experience with a review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactForm />
          <ReviewForm />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Your Feedback Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">Share Your Experience</h3>
              <p className="text-gray-600">Help others make informed decisions by sharing your experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold mb-2">Rate Our Service</h3>
              <p className="text-gray-600">Let us know how we're doing and where we can improve.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Help Us Improve</h3>
              <p className="text-gray-600">Your feedback directly influences our product development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}