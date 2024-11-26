import Banner from '@/app/ui/banner/banner';

export default function Home() {
  return (<>
    <div className="team-page-wrapper">
      <Banner title={'Sports League Management'} />      
      <div className="container mx-auto px-4 py-6">
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar - League Schedule */}
          <aside className="col-span-3 border border-indigo-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4 p-4 bg-indigo-800 text-white">Premier League</h2>
            <div className="text-sm space-y-4 p-4">
              <div>
                <p className="text-md text-black font-bold underline">Tuesday 26 November</p>
                <div className="text-black flex justify-between items-center">
                  <span className="font-bold">MCI</span>
                  <span>3 - 3</span>
                  <span className="font-bold">FEY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">SCP</span>
                  <span>1 - 5</span>
                  <span className="font-bold">ARS</span>
                </div>
              </div>
              <div>
                <p className="text-md text-black font-bold underline">Wednesday 27 November</p>
                <div className="text-black flex justify-between items-center">
                  <span className="font-bold">AVL</span>
                  <span>12:00</span>
                  <span className="font-bold">JUV</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">LIV</span>
                  <span>12:00</span>
                  <span className="font-bold">RMD</span>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full text-center bg-indigo-800 hover:bg-indigo-600 text-white py-2 rounded-b-lg font-semibold border-t-2 border-indigo-800">
              View All Fixtures
            </button>
          </aside>

          {/* Center - Headline News */}
          <main className="col-span-6 rounded-lg border-indigo-800 border">
            <h2 className="text-xl font-bold mb-4 p-4 bg-indigo-800 text-white">The stats that show Premier League is as open as it's EVER been</h2>
            <p className="p-4">
              We highlight how closely clubs are clustered in the table, with Man City now nearer to West Ham than
              Liverpool.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 p-4">
              <img src="/headline1.jpg" alt="Headline 1" className="rounded-lg" />
              <img src="/headline2.jpg" alt="Headline 2" className="rounded-lg" />
            </div>
          </main>

          {/* Right Sidebar - News */}
          <aside className="col-span-3 rounded-lg border border-indigo-800">
            <h2 className="text-xl font-bold mb-4 p-4 bg-indigo-800 text-white">Latest Videos</h2>
            <div className="space-y-4 p-4">
              <div className="flex items-center">
                <img
                  src="/video-thumbnail1.jpg"
                  alt="Video Thumbnail"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <p className="text-sm">
                  Masterclass: Palmer and Zola meet for a free-kick challenge
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src="/video-thumbnail2.jpg"
                  alt="Video Thumbnail"
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <p className="text-sm">The best goals of the week!</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </>
  );
}
