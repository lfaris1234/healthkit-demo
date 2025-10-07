export default function Avatar({ src = "/placeholder.jpg", alt = "avatar" }) {
  return <img src={src} alt={alt} className="h-10 w-10 rounded-full object-cover" />;
}
