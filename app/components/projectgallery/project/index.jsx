
'use client';
import React from 'react'
import styles from './style.module.css';
import { GeistSans } from 'geist/font/sans';


export default function index({index, title, setModal, desc}) {

    return (

        <>
        <div onMouseEnter={() => { setModal({ active: true, index }); } } onMouseLeave={() => { setModal({ active: false, index }); } } className={styles.project}>
            <h2>{title}</h2>
            <p>{desc}</p>
        
        </div></>
    )
}