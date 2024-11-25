import Banner from '@/app/ui/banner/banner';

export default async function Page() {
    return (<>
      <div className="coaches-page-wrapper">
        <Banner title={'Coaches'} />
        <div className="mt-4 relative">
            Create a new Coach
        </div>
      </div>
    </>
    );
  }
  