"use client";

import Image from "next/image";
import styles from "./card.module.css";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

interface CardProps {
    venueName: string;
    imgSrc: string;
    ratingValue?: number;
    onRatingChange?: (venueName: string, newValue: number) => void;
}

export default function Card({
    venueName,
    imgSrc,
    ratingValue = 0,
    onRatingChange = () => {},
}: CardProps) {
    return (
        <InteractiveCard>
            <div className="flex flex-col m-6 w-80 h-auto gap-4 p-3 bg-white border-2 border-[#6d9468] rounded-lg">
                <Image
                    src={imgSrc}
                    className={styles.cardImage}
                    alt="Party Image"
                    width={200}
                    height={200}
                />
                <div className={styles.cardText}>
                    <span>{venueName}</span>
                </div>
                <Rating
                    id={`${venueName} Rating`}
                    name={`${venueName} Rating`}
                    data-testid={`${venueName} Rating`}
                    value={ratingValue}
                    onChange={(_, newValue) => {
                        onRatingChange(venueName, newValue ?? 0);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </div>
        </InteractiveCard>
    );
}