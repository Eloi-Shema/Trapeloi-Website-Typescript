interface AvatarProps {
  userName: string;
}

const Avatar: React.FC<AvatarProps> = ({ userName }) => {
  // Generate a color based on username
  const colors = [
    "bg-gradient-to-r from-rose-600 to-fuchsia-600",
    "bg-gradient-to-r from-green-400 to-teal-600",
    "bg-gradient-to-r from-indigo-600 to-sky-600",
    "bg-gradient-to-t from-lime-400 to-emerald-600",
    "bg-gradient-to-r from-violet-600 to-cyan-600",
    "bg-gradient-to-r from-blue-600 to-purple-600",
    "bg-gradient-to-r from-purple-600 to-fuchsia-600",
    "bg-gradient-to-r from-teal-600 to-cyan-600",
    "bg-gradient-to-r from-emerald-600 to-lime-600",
    "bg-gradient-to-r from-sky-600 to-blue-600",
    "bg-gradient-to-r from-violet-600 to-indigo-600",
  ];
  const colorIndex = userName.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white`}
    >
      <p>{userName.charAt(0).toUpperCase()}</p>
    </div>
  );
};

export default Avatar;
