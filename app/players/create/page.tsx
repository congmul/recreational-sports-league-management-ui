import Banner from '@/app/ui/banner/banner';

export default async function Page() {
    return (<>
      <div className="player-page-wrapper">
        <Banner title={'Players'} />
        <div className="mt-4 relative">
            Create a new player
        </div>
      </div>
    </>
    );
  }
  