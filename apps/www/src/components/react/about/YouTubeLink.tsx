export default function YouTubeLink({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="not-prose outline-brand min-h-44 hover:-translate-y-1 transition-all duration-200 justify-between flex gap-6 border flex-1 rounded-2xl min-w-[260px] p-6 bg-red-50 border-red-100 dark:bg-red-950 dark:border-red-900"
    >
      <div className="space-y-2">
        <div className="bg-[#ea3323] border border-[#dc3021] w-10 h-10 p-2 rounded-lg">
          <img src="/about/youtube.svg" />
        </div>
        <div className="w-[106px]">
          <h4 className="text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">youtube.com</p>
        </div>
      </div>
      <div className="min-w-[100px]">
        <img
          src={image}
          alt={`The cover image for the talk Kelsie did for ${title}`}
          className="object-cover aspect-[4/3] rounded-lg"
        />
      </div>
    </a>
  );
}
