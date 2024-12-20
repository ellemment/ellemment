// #app/routes/_marketing+/index.tsx

import { Career } from '#app/interface/portfolio/career';
import Hero from '#app/interface/portfolio/hero';
import { Skills } from '#app/interface/portfolio/skills';
import { Stack } from '#app/interface/portfolio/stack';

export default function IndexRoute() {
  return (
    <>
      <Hero />
      <Career />
      <Skills />
      <Stack />
    </>
  );
}