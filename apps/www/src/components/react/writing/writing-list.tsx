export default function WritingList({ writing }: any) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between h-28 flex-wrap gap-12">
        <h1 className="font-nord font-bold text-2xl text-foreground">
          Writing
        </h1>
      </div>
      {writing.map((writingItem: any, index: number) => {
        return (
          <a
            href={`/writing/${writingItem.slug}/`}
            key={index}
            className="flex justify-between"
          >
            <p className="">{writingItem.data.title}</p>
            <p className="text-muted-foreground">
              {formatDate(writingItem.data.pubDate)}
            </p>
          </a>
        );
      })}
    </div>
  );
}
