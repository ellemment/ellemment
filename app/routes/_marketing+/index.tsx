// #app/routes/_marketing+/index.tsx

import { SmoothScrollHero } from '#app/interface/portfolio/landing';
import { Showcase } from '#app/interface/portfolio/showcase';
import { Stack } from '#app/interface/portfolio/stack';


export default function IndexRoute() {

  return (
    <>
      <SmoothScrollHero />
      <Showcase />
      <Stack />

    </>
  );
}
