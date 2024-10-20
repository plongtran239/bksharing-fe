import { ACHIEVEMENT_TYPES } from "@/constants/enum";

export const fakeProfile = {
  bio: "Hello, i am Long Tran, i am a developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quos exercitationem aliquid fuga, iusto perferendis aspernatur laudantium rem sunt? In illo velit, laborum atque beatae expedita iste blanditiis quia odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque asperiores nulla voluptate quidem nam atque magnam suscipit saepe, ea molestias quos nostrum voluptatem ipsam repellendus dolores est et doloremque soluta.",
  achievements: [
    {
      organization: "GEEK UP",
      description: "",
      position: "Backend Developer",
      startDate: "1726574400000",
      endDate: "1727265600000",
      type: ACHIEVEMENT_TYPES.EXPERIENCE,
    },
    {
      organization: "BK Sharing",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis.",
      position: "Fullstack Developer",
      startDate: "1726574400000",
      endDate: "1727265600000",
      type: ACHIEVEMENT_TYPES.EXPERIENCE,
    },
    {
      organization: "University of Information Technology (UIT)",
      description: "",
      major: "Software Engineering",
      startDate: "1726574400000",
      endDate: "1727265600000",
      type: ACHIEVEMENT_TYPES.EDUCATION,
    },
    {
      name: "AWS Cloud Certification",
      organization: "Amazon Web Services (AWS)",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestias quas reiciendis, iusto dolor provident blanditiis amet minus suscipit sunt ut exercitationem architecto illo quis totam fugiat facere possimus perspiciatis.",
      startDate: "1726574400000",
      endDate: "1727265600000",
      type: ACHIEVEMENT_TYPES.CERTIFICATION,
    },
  ],
};
