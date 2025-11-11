import LatestFilmSummary from '@/app/ui/dashboard/latest-film-review-summary';
import HighLowFilm from '../../ui/dashboard/high-low-film';
import LikeDislikeFilm from '../../ui/dashboard/like-dislike-film';
import { lusitana } from '@/app/ui/fonts';
import { fetchHighestRatedFilm, fetchLowestRatedFilm, fetchMostLikedFilm, fetchLeastLikedFilm } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
  const highest_film = await fetchHighestRatedFilm();
  const lowest_film = await fetchLowestRatedFilm();
  const most_liked_film = await fetchMostLikedFilm();
  const least_liked_film = await fetchLeastLikedFilm();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Film Discussed
      </h2>
      <LatestFilmSummary />
      <div className="flex w-full grid-cols-4">
        <div>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Highest Rated Film(s)
          </h2>
          <HighLowFilm highLowFilm={highest_film}/>
        </div>
        <div>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Lowest Rated Film(s)
          </h2>
          <HighLowFilm highLowFilm={lowest_film}/>
        </div>
        <div>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Most Liked Film(s)
          </h2>
          <LikeDislikeFilm likeDislikeFilm={most_liked_film}/>
        </div>
        <div>
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Least Liked Film(s)
          </h2>
          <LikeDislikeFilm likeDislikeFilm={least_liked_film}/>
        </div>
      </div>
    </main>
  );
}
