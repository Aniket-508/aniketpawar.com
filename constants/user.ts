import { EXPERIENCES } from "@/constants/experiences";
import { LINK } from "@/constants/links";
import { getBaseUrl } from "@/constants/url";

const [currentExperience] = EXPERIENCES;

export const USER = {
  address: {
    country: "India",
    locality: "Mumbai",
  },
  avatar:
    "https://ik.imagekit.io/2oajjadqkz/profile.jpg?updatedAt=1770631384305",
  company: currentExperience.experienceOrg.name,
  email: LINK.EMAIL.replace("mailto:", ""),
  firstName: "Aniket",
  jobTitle: currentExperience.experienceTitle,
  lastName: "Pawar",
  username: "aniket-pawar",
  website: getBaseUrl(),
} as const;

export const NAME = `${USER.firstName  } ${  USER.lastName}`;
