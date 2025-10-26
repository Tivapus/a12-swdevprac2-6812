"use client";

import styles from "./reservations.module.css"

export default function BookingLayout( {children} : {children:React.ReactNode} ) {
    return (
        <div className={styles.sectionlayout}>
            {children}
        </div>
    );
}
