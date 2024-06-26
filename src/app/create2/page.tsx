"use client"
import React, { useCallback } from 'react';
// import { writeContract } from 'wagmi/actions';
import { useAccount, useContractWrite } from 'wagmi';
import AimeErc7007Abi from '../mint/aime-erc7007.abi.json';
const MintERC7007Button: React.FC = (props: any) => {
  const { isConnected, address } = useAccount();
//   const { data: hash, writeContract } = useWriteContract();
  const {
        writeAsync, data
  } = useContractWrite({
    address: '0xCE16905BdD7fF8fBEA3695edaC80e1D48E2bE75f',
    abi: AimeErc7007Abi,
    functionName: 'mint',
  })
  const metadataUri = 'https://www.miladymaker.net/milady/json/2';
    // mint(
    //     bytes calldata prompt,
    //         bytes calldata aigcData,
    //         string calldata uri,
    //         bytes calldata proof
    // )
    const mintAime = useCallback(async (uri: string) => {
        if(!isConnected) {
            alert('Please connect your wallet');
            return;
        }
        await writeAsync({
            args: ['0x00', '0x00', uri, '0x00'],
        });
    }, [isConnected, writeAsync]);

    return (
        <>
        <button 
            className='bg-blue-500 hover:bg-blue-700 px-8 py-3 rounded-md hover:bg-accent-dark hover:text-white transition duration-300'
            onClick={() => mintAime(metadataUri)}
        >
            Mint Aime
        </button>
        <p>Hash: {data ? data.hash : '(no hash)'}</p>
        </>
    );
};

export default MintERC7007Button;