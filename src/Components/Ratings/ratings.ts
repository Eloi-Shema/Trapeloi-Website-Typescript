import five_stars from "../../assets/icons/5-star-rating.png";
import feelz from "../../assets/feelz.png";
import dany from "../../assets/dany.png";
import brooke from "../../assets/brooke.png";
import jack from "../../assets/jack.png";
import gerard from "../../assets/gerard.png";
import cameron from "../../assets/cameron.png";
import simon from "../../assets/simon.png";
import megan from "../../assets/megan.png";
import tom from "../../assets/tom.png";

interface RatingTypes {
  stars: string;
  comment: string;
  profile: string;
  name: string;
  artist: string;
}

export const ratings: RatingTypes[] = [
  {
    stars: five_stars,
    comment: "The quality of beats is unmatched and so inspiring!",
    profile: feelz,
    name: "Lil Feelz",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "The beats I purchased elevated my tracks to new heights!",
    profile: dany,
    name: "Dan Pop",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "Working with MontBitz was a game changer for me!",
    profile: brooke,
    name: "Brooke Bang",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "I loved the lifetime access on a MontBitz beat🤍",
    profile: cameron,
    name: "Cam Keyz",
    artist: "Pop Artist",
  },

  {
    stars: five_stars,
    comment: "Really loved the service",
    profile: tom,
    name: "Tom band",
    artist: "An artist",
  },

  {
    stars: five_stars,
    comment:
      "I loved the groove and the buying services, MontBitz does not lease unlike other beat store. Once you buy The beat is yours",
    profile: megan,
    name: "Megan Not Stallion",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "MontBitz Beats Hits! Yeaaah",
    profile: simon,
    name: "Simon The rapper",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "The beats go with RnB/Pop genre as well. Wow🔥",
    profile: gerard,
    name: "Gerd Piper",
    artist: "Pop Artist",
  },

  {
    stars: five_stars,
    comment:
      "I bought a beat and used it in my break-up song on which you cry and move. MontBitz beats alone tell stories. Recomend!",
    profile: jack,
    name: "Simon The rapper",
    artist: "Pop Artist",
  },

  {
    stars: five_stars,
    comment: "You're my go to, when I need to music puff🚬",
    profile: feelz,
    name: "Wayans Smoke",
    artist: "HipHop Artist",
  },

  {
    stars: five_stars,
    comment: "I accidentally landed on this Store. I'm glad that I did😁",
    profile: cameron,
    name: "Saxxy blondie",
    artist: "RnB Artist",
  },

  {
    stars: five_stars,
    comment: "I made a hit with your beats. Appreciate man!",
    profile: brooke,
    name: "White Monkey",
    artist: "HipHop Artist",
  },
];
