import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

interface ISidebar {
  id: number;
  href: string;
  text: string;
  icon: IconType;
}

export const Sidebar: ISidebar[] = [
  {
    id: 1,
    href: "/organizer/",
    text: "Dashboard",
    icon: RxDashboard,
  },
  {
    id: 2,
    href: "/organizer/event",
    text: "Event",
    icon: IoTicketOutline,
  },
  {
    id: 3,
    href: "/organizer/transaction",
    text: "Transaction",
    icon: GrTransaction,
  },
  {
    id: 4,
    href: "/organizer/attendee",
    text: "Attedee List",
    icon: MdChecklist,
  },
  {
    id: 5,
    href: "/organizer/profile/ijsamika",
    text: "My Profile",
    icon: CiUser,
  },
];
