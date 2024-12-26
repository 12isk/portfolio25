'use client';
import React from 'react'
import styles from './style.module.scss';
import { GeistSans } from 'geist/font/sans';


export default function index({index, title, setModal, desc}) {

    return (

        <>
        <div onMouseEnter={() => { setModal({ active: true, index }); } } onMouseLeave={() => { setModal({ active: false, index }); } } className={styles.project}>
            <h2>{title}</h2>
            <p>
                <span className={styles.firstLetter}>{desc.charAt(0)}</span>
                {desc.slice(1)}
            </p>
        
        </div></>
    )
}