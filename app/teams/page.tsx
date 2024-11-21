import Card from '@/app/ui/card/card';

export default function Page() {
    return (
      <div className="m-5 font-bold">
        Team
        <div className="flex space-x-6">
          <Card logo={''} tla={'ARS'} name={'Arsenal'} />
          <Card logo={''} tla={'AVL'} name={'Aston Vila'} />
        </div>
      </div>
    );
  }
  