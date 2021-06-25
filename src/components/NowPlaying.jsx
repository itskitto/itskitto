import React from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

export default function NowPlaying() {
  const { data } = useSWR('https://spotify-api-mauve.vercel.app/api/now-playing', fetcher);

  return (
    <>
      {data && data.isPlaying
      ? `${data.title} - ${data.artist}`
      : 'Not Listening'}
    </>
  )
}