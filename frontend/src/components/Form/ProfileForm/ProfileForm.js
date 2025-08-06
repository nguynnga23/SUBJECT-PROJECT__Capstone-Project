function ProfileForm({ setUserProfile }) {
  return (
    <div className="relative max-w-xl mx-auto bg-white rounded space-y-4">
      <h2 className=" text-2xl font-bold text-gray-800">Your Profile</h2>
      <button
        className="absolute top-[-20px] right-0 text-gray-500 hover:text-black text-xl"
        onClick={() => setUserProfile(null)}
      >
        &times;
      </button>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Your phone number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
      </div>

      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Update Profile
      </button>
    </div>
  );
}

export default ProfileForm;
