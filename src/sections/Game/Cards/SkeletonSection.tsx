"use client";

import * as React from "react";
import GameCardSkeleton from "../../../components/GameCardSkeleton";

import animations from "../../../../utils/animations";
import "animate.css";

export default function SkeletonSection(props: any) {
    return Array(4)
        .fill(0)
        ?.map((el, index) => {
            return (
                <div key={Math.random()} className={`${animations.fadeIn}`}>
                    <GameCardSkeleton />
                </div>
            );
        });
}
