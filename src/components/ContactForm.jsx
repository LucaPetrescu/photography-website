function ContactForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-6">You can contact me here:</h2>

        {/* Contact Information */}
        <div className="text-left">
          <p className="text-lg mb-4">
            <span className="font-bold">Email: </span>
            your-email@example.com
          </p>

          <p className="text-lg mb-4">
            <span className="font-bold">Phone Number: </span>
            +1 (123) 456-7890
          </p>

          <p className="text-lg mb-4">
            <span className="font-bold">Instagram: </span>
            <a
              href="https://www.instagram.com/lucahaznikon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @lucahaznikon
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
