import PlayerDetail from "@/app/ui/playerDetail/playerDetail"


interface PlayerDetailProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: PlayerDetailProps) {
    const { id } = await params;
    return(<>    
        <PlayerDetail id={id} />
    </>)
}