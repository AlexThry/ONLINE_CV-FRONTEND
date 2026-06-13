import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

/* Signature eases used across the site */
CustomEase.create("expoOut", "0.16, 1, 0.3, 1");
CustomEase.create("powerReveal", "0.77, 0, 0.18, 1");

/* A slightly snappier global default */
gsap.defaults({ ease: "expoOut", duration: 1 });

export { gsap, ScrollTrigger, SplitText, CustomEase };
