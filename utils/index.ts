import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon } from 'wagmi/chains';
import { toast } from 'sonner';
import { http, createConfig } from '@wagmi/core'

export function toSentenceCase(str: string) {
    const words = str.match(/[A-Za-z][a-z]*/g) || [];
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export const CopyToClipboard = (address: string) => {
    const copied = address

    if (copied !== null) {
        navigator.clipboard.writeText(copied)
        toast.info("Address Copied")
    }
}

export const wagmiConfig = getDefaultConfig({
    appName: 'Any Polygon Faucet',
    projectId: 'YOUR_PROJECT_ID',
    chains: [polygon],
    ssr: true,
});



export const ethersConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
})