const ListLoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 p-3 rounded-lg gap-7 dark:bg-platinum/5 bg-platinum/30">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 mr-2 rounded-sm bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>

        <div className="w-12 h-12 rounded-lg bg-black/15 dark:bg-platinum/10 animate-pulse"></div>

        <div className="w-20 h-4 rounded-sm bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
      </div>
      <div className="w-24 h-4 ml-10 bg-black/15 rounded-2xl justify-self-center dark:bg-platinum/10 animate-pulse"></div>
      <div className="w-32 h-10 rounded-lg bg-black/15 justify-self-center dark:bg-platinum/10 animate-pulse"></div>
    </div>
  );
};

export default ListLoadingSkeleton;
