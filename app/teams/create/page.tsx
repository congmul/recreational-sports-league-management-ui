import Banner from '@/app/ui/banner/banner';

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Teams'} />
        <div className="mt-4 relative">
            Create a new team
        </div>
      </div>
    </>
    );
  }
  