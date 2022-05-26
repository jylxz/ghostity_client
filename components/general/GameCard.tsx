import React from 'react'
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import LinkTo from './LinkTo'

export default function GameCard({game}: {game: Game}) {
  return (
    <Card>
      <LinkTo href={`/browse/games/${encodeURIComponent(game.name)}`} >
        <CardMedia
          component="img"
          className="cursor-pointer"
          image={game.cover_img}
        />
      </LinkTo>
      <CardContent className="h-16 mt-0 pt-2">
        <LinkTo href={`/browse/games/${encodeURIComponent(game.name)}`}>
          <Typography className="text-sm font-semibold line-clamp-1 cursor-pointer">
            {game.name}
          </Typography>
        </LinkTo>
        <Typography className="text-sm text-gray-500">
          {game.viewers} viewers
        </Typography>
      </CardContent>
    </Card>
  );
}
