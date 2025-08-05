import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

const ContactInfo = ({ info }) => {
  return (
    <div className="bg-blue-50 text-sm text-gray-800 py-4 px-6 border-t border-blue-100">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Văn phòng */}
        <div className="flex items-start gap-2 w-full md:w-1/4">
          <FaMapMarkerAlt className="text-blue-600 mt-1" />
          <div>
            <p className="text-blue-700 font-semibold">Văn phòng:</p>
            <p>{info?.location}</p>
          </div>
        </div>

        {/* Điện thoại */}
        <div className="flex items-start gap-2 w-full md:w-1/4">
          <FaPhoneAlt className="text-blue-600 mt-1" />
          <div>
            <p className="text-blue-700 font-semibold">Điện thoại:</p>
            <p>
              <a href="tel:02838940390" className="text-blue-700 underline">
                {info?.number}
              </a>
            </p>
          </div>
        </div>

        {/* Website + Email */}
        <div className="flex items-start gap-2 w-full md:w-1/4">
          <FaGlobe className="text-blue-600 mt-1" />
          <div>
            <p className="text-blue-700 font-semibold">Website:</p>
            <p>
              <a
                href={`https://${info?.website}`}
                className="text-blue-700 underline"
              >
                {info?.website}
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 w-full md:w-1/4">
          <FaEnvelope className="text-blue-600 mt-1" />
          <div>
            <p className="text-blue-700 font-semibold">Email:</p>
            <p>
              <a
                href="mailto:ketnoi.fit@iuh.edu.vn"
                className="text-blue-700 underline"
              >
                {info?.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
