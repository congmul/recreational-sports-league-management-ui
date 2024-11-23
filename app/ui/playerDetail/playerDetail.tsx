'use client';

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { playerService } from '@/app/lib/api-services';

function PlayerDetail() {    
    const router = useRouter()
    const param = useParams();
    const { id: playerId } = param;
    useEffect(() => {
      if(typeof playerId === 'string'){
        playerService.getPlayerById(playerId)
        .then(res => {console.log(res)});
      }
    }, [playerId])
    return(<>
      <button        
        onClick={() => {
          router.back()
        }}
      >
        Back
      </button>
      <div>
      Form for Player or Coach
      and need to update and delete
      </div>
    </>)
}

export default PlayerDetail;