import supplyimage from '../../../assets/supply.jpg';
import packingimage from '../../../assets/ordermanagement.jpg';
import cuttingmanagemt from '../../../assets/cuting service.jpg';
import { useEffect } from 'react';

const servicesData = [
  {
    title: "নিজস্ব ডেলিভারি সিস্টেম",
    image: supplyimage,
    description:
      "ফ্রেশ কাট-এ আমরা হালাল ও তাজা প্রসেস করা চিকেন সরাসরি আপনার দোরগোড়ায় পৌঁছে দিই। আমাদের নিজস্ব ডেলিভারি সিস্টেমের মাধ্যমে আমরা দ্রুত, পরিষ্কার ও নির্ভরযোগ্য সেবা নিশ্চিত করি—ব্যক্তিগত ক্রেতা হোক বা ব্যবসায়িক প্রতিষ্ঠান। প্রতিটি অর্ডার অত্যাধুনিক প্রসেসিং পদ্ধতিতে প্রস্তুত করা হয়, যাতে গুণগত মান, সতেজতা ও নিরাপত্তা বজায় থাকে।"
  },
  {
    title: "প্যাকিং ব্যবস্থাপনা",
    image: packingimage,
    description:
      "আমরা আমাদের প্যাকিং প্রক্রিয়ায় সম্পূর্ণ পরিষ্কার-পরিচ্ছন্নতা ও গুণগত মান বজায় রাখি যাতে করে পণ্যটি সর্বদা তাজা ও নিরাপদ থাকে। প্রতিটি চিকেন অর্ডার ভালোভাবে পরিষ্কার করে, নির্দিষ্ট পরিমাণে ভাগ করে, ফুড-গ্রেড ভ্যাকুয়াম প্যাকেটের মাধ্যমে প্যাক করা হয়। আমাদের দক্ষ প্যাকিং সিস্টেম নিশ্চিত করে যে আপনার দোরগোড়ায় পৌঁছানোর আগ পর্যন্ত পণ্যের সতেজতা অটুট থাকে।"
  },
  {
    title: "সেরা কাটিং সার্ভিস",
    image: cuttingmanagemt,
    description:
      "আমরা গ্রাহকের চাহিদা অনুযায়ী মাংস কাটার সেবা দিয়ে থাকি। আমাদের অভিজ্ঞ কাটিং মাস্টাররা প্রতিটি অর্ডার দক্ষভাবে এবং পরিষ্কারভাবে প্রসেস করেন, যাতে আপনি পান নিখুঁতভাবে কাটা ও প্রস্তুতকৃত হালাল মাংস। চাহিদা অনুযায়ী বিভিন্ন ধরনের কাটিং যেমন: কারি কাট, লেগ পিস, বোনলেস ইত্যাদি সঠিকভাবে করা হয়।"
  }
];

const Service = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-base">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
