"use client";

import styles from "./GameCardSkeleton.module.css";
import Skeleton from "@mui/material/Skeleton";

export default function GameCardSkeleton(props: any) {
    return <Skeleton animation="wave" variant="rectangular" width={300} height={400} className={styles?.gameCardSkeleton} />;
}
