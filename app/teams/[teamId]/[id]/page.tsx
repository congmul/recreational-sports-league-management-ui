import PlayerDetail from "@/app/ui/playerDetail/playerDetail"

interface DetailProps {
    params: Promise<{ id: string }>
    searchParams: any
}


export default async function Page({ params, searchParams }: DetailProps) {
    // It follows https://nextjs.org/docs/messages/sync-dynamic-apis
    // Should use "await".
    const { query } = await searchParams
    if(query === 'player'){
        return(<>    
            <PlayerDetail />
        </>)
    }else{
        return(<>Coach</>)
    }
}