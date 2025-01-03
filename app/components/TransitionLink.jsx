import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { animate } from 'framer-motion';




const TransitionLink = ({ href }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e) => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
    }
}
