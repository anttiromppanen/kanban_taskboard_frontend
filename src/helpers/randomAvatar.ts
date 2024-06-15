import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";
import avatar4 from "../assets/images/avatar4.png";
import avatar5 from "../assets/images/avatar5.png";
import avatar6 from "../assets/images/avatar6.png";
import avatar7 from "../assets/images/avatar7.png";
import avatar8 from "../assets/images/avatar8.png";
import avatar9 from "../assets/images/avatar9.png";
import avatar10 from "../assets/images/avatar10.png";
import avatar11 from "../assets/images/avatar11.png";
import avatar12 from "../assets/images/avatar12.png";

const avatarsArray = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
];

const randomAvatar = () =>
  avatarsArray[Math.floor(Math.random() * avatarsArray.length)];

export default randomAvatar;
