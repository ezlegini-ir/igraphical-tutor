import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  MessageCircleQuestion,
} from "lucide-react";

const sideBarMenuItems = [
  {
    groupName: "Student Managment",
    subMenuItems: [
      {
        tabName: "Q & A",
        tabHref: "/qa",
        tabIcon: MessageCircleQuestion,
        subMenuItems: [],
      },
    ],
  },

  {
    groupName: "Financial",
    subMenuItems: [
      // {
      //   tabName: "Revenues",
      //   tabHref: "/revenues",
      //   tabIcon: BanknoteArrowUp,
      //   subMenuItems: [],
      // },
      {
        tabName: "Settlements",
        tabHref: "/settlements",
        tabIcon: BanknoteArrowDown,
        subMenuItems: [],
      },
    ],
  },
];

export default sideBarMenuItems;
