import Link from 'next/link';

const Cta = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        We are trusted by<br /> thousands of users every day
      </h1>
      <div className="flex gap-10 justify-center mb-16">
        {/* 105k */}
        <div className="text-center">
          <p
            className="text-[5rem] md:text-[7rem] font-extrabold bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            105k
          </p>
          <p className="text-xl">Panels created</p>
        </div>
        {/* 84M */}
        <div className="text-center">
          <p
            className="text-[5rem] md:text-[7rem] font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            84M
          </p>
          <p className="text-xl">Orders completed</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/get-started">
          <p className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-medium shadow-lg hover:opacity-90">
            Get started →
          </p>
        </Link>
        <Link
          href="https://t.me/your_telegram_link"
          className="px-6 py-3 flex items-center bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-medium shadow-lg hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our community in Telegram →
        </Link>
      </div>
    </div>
  );
};

export default Cta;
