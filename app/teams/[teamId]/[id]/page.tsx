import PlayerDetail from "@/app/ui/playerDetail/playerDetail"

interface DetailProps {
    searchParams: Promise<{query: string}>
}


export default async function Page({ searchParams }: DetailProps) {
    // It follows https://nextjs.org/docs/messages/sync-dynamic-apis
    // Should use "await".
    const { query } = await searchParams
    if(query === 'player'){
        return(<>    
            <PlayerDetail />
        </>)
    }else{
        // TODO: Add Coach Detail
        return(<>Coach</>)
    }
}