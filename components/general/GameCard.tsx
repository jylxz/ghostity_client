import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LinkTo from "./LinkTo";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Card className="sm:w-52 select-none dark:bg-secondary-dark">
      <LinkTo href={`/browse/games/${encodeURIComponent(game.name)}`} className="dark:bg-secondary-dark">
        <Image src={game.cover_img} width="208" height="280" alt={`${game.name} cover art`} className="dark:bg-secondary-dark" />
      </LinkTo>
      <CardContent className="h-16 pt-2 dark:bg-secondary-dark bg-slate-50">
        <LinkTo href={`/browse/games/${encodeURIComponent(game.name)}`}>
          <Typography className="dark:text-text-primary-dark text-sm font-bold line-clamp-1 cursor-pointer">
            {game.name}
          </Typography>
        </LinkTo>
        <Typography className="text-sm font-medium dark:text-text-secondary-dark text-gray-500">
          {game.viewers} viewers
        </Typography>
      </CardContent>
    </Card>
  );
}
